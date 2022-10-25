import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';

import DropZone from '../../components/common/inputs/dropZone';
import HeaderText from '../../components/common/typography/headerText';
import { useAppDispatch } from '../../hooks';
import { UpdateWatchList } from '../../models/tmrev';
import { IMDBBatchMoviesResponse, LetterBoxdBatchMovieResponse } from '../../models/tmrev/movie';
import { WatchedPayload } from '../../models/tmrev/watched';
import { useAuth } from '../../provider/authUserContext';
import { tmrevAPI, useCreateWatchedMutation, useCreateWatchListMutation } from '../../redux/api';
import { setOpenToast, setToastContent } from '../../redux/slice/toastSlice';
import importLetterboxd, { LetterboxdImport } from '../../utils/importLetterboxd';

type LetterboxdMovies = {
  [x: string]: Data[]
}

type Data = {
  letterboxd: LetterboxdImport,
  searchCrit: {
    title: string,
    year: string
  }
}

type ParsedData = {
  res: PromiseSettledResult<AxiosResponse<LetterBoxdBatchMovieResponse, any>>,
  name: string
  title: string
  year: string
  id: string[]
}

// left off

// completed api route /import/letterboxd

// update types

// make work

const batchLookUp = async (movies: LetterboxdMovies): Promise<ParsedData[]> => {
  const batchRequest = Object.values(movies).map((v) => axios({
    data: {
      searchCrit: v.map((d) => d.searchCrit),
    },
    method: 'POST',
    url: `${tmrevAPI}/import/letterboxd`,
  }) as AxiosPromise<LetterBoxdBatchMovieResponse>);

  const res = await Promise.allSettled(batchRequest);

  const imdbData: ParsedData[] = res.map((value, i) => {
    let returnData:any = {};
    Object.keys(movies).forEach((key, index) => {
      if (index === i && value.status === 'fulfilled') {
        returnData = {
          id: Object.keys(value.value.data.body).map((v) => v),
          name: key,
          res: value,
          title: movies[key][index].letterboxd.name,
          year: movies[key][index].letterboxd.year,
        };
      }
    });
    return returnData;
  });

  const batchIMDBRequest = imdbData.map((p) => axios({
    data: {
      movieId: p.id,
    },
    method: 'POST',
    url: `${tmrevAPI}/import/imdb`,
  }) as AxiosPromise<IMDBBatchMoviesResponse>);

  const imdbRes = await Promise.allSettled(batchIMDBRequest);

  console.log(imdbRes);

  // const parsedData = res.map((value, i) => {
  //   let returnData:any = {};
  //   Object.keys(imdbMovies).forEach((key, index) => {
  //     if (index === i) {
  //       returnData = {
  //         id: imdbMovies[key][index].imdb.const,
  //         name: key,
  //         res: value,
  //       };
  //     }
  //   });
  //   return returnData;
  // });

  console.log(imdbData);

  return imdbData;
};

const ImportLetterboxd: NextPage = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [letterBoxdMovies, setLetterBoxdMovies] = useState<LetterboxdMovies>();
  const [importSelect, setImportSelect] = useState<string>('watchlist');
  const [batchRequest, setBatchRequest] = useState<ParsedData[]>();
  const [addWatchList] = useCreateWatchListMutation();
  const [addWatched] = useCreateWatchedMutation();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const beginImport = useCallback(async () => {
    if (!files) return;

    Object.values(files).forEach((file) => {
      importLetterboxd(file).then((data) => {
        const tempArray:Data[] = [];
        data.forEach((element) => {
          if (element.name && element.year) {
            tempArray.push({
              letterboxd: element,
              searchCrit: {
                title: element.name,
                year: element.year,
              },
            });
          }
        });
        setLetterBoxdMovies((prevState) => ({ ...prevState, [file.name.split('.')[0]]: tempArray }));
      });
    });
  }, [files]);

  const handleBatch = useCallback(async () => {
    if (!letterBoxdMovies) return;

    const data = await batchLookUp(letterBoxdMovies);

    setBatchRequest(data);
  }, [letterBoxdMovies]);

  useEffect(() => {
    handleBatch();
  }, [handleBatch, letterBoxdMovies]);

  const cleanUp = () => {
    setFiles(null);
    setLetterBoxdMovies(undefined);
    setBatchRequest(undefined);
  };

  const uploadWatchList = async () => {
    if (!batchRequest || !user || !files || importSelect === 'rating') return;

    const token = await user.getIdToken();

    batchRequest.forEach((parsedData) => {
      if (parsedData.res.status === 'fulfilled') {
        const payload: UpdateWatchList = {
          description: 'Imported from imdb',
          movies: Object.values(parsedData.res.value.data.body).map((v) => v.id),
          public: true,
          tags: [],
          title: parsedData.name,
          token,
          userId: user.uid,
        };

        addWatchList(payload)
          .unwrap()
          .then(() => {
            setFiles(null);
            setLetterBoxdMovies(undefined);
            setBatchRequest(undefined);
            dispatch(setToastContent(`Successfully added ${importSelect}`));
            dispatch(setOpenToast(true));
          })
          .catch(() => {
            dispatch(setToastContent('Something bad happened'));
            dispatch(setOpenToast(true));
          })
          .finally(() => {
            cleanUp();
          });
      }
    });
  };

  const uploadRatings = async () => {
    if (!batchRequest || !user || !files || importSelect !== 'ratings' || !letterBoxdMovies) return;

    const token = await user.getIdToken();
    const payload: WatchedPayload[] = [];

    batchRequest.forEach((parsedData) => {
      Object.keys(letterBoxdMovies).forEach((key) => {
        if (parsedData.res.status !== 'fulfilled') return;

        letterBoxdMovies[key].forEach((d) => {
          if (parsedData.res.status !== 'fulfilled') return;
          if (typeof parsedData.res.value.data.body[d.letterboxd.const] !== 'undefined') {
            const { title, poster_path, id } = parsedData.res.value.data.body[d.letterboxd.const];

            payload.push({
              authToken: token,
              liked: Number(d.letterboxd.yourRating) > 7,
              posterPath: poster_path || '',
              title,
              tmdbID: id,
            });
          }
        });
      });
    });

    payload.forEach((p) => {
      addWatched(p)
        .unwrap()
        .then(() => {
          dispatch(setToastContent(`Successfully added ${importSelect}`));
          dispatch(setOpenToast(true));
        })
        .catch(() => {
          dispatch(setToastContent('Something bad happened'));
          dispatch(setOpenToast(true));
        })
        .finally(() => {
          cleanUp();
        });
    });
  };

  //   useEffect(() => {
  //     uploadWatchList();
  //     uploadRatings();
  //   }, [batchRequest, user]);

  useEffect(() => {
    beginImport();
  }, [files, beginImport]);

  return (
    <>
      <Head>
        <title>Import Letterboxd data</title>
        <meta
          content="Easily upload all of your list, ratings and watchlist from letterboxd"
          name="description"
        />
      </Head>
      <div className="lg:h-full h-screen text-center w-full flex justify-center items-center">
        <div className=" bg-tmrev-gray-dark p-4 rounded flex flex-col md:min-w-[500px] space-y-4">
          <HeaderText>
            Letterboxd Import
          </HeaderText>
          <select
            className="p-2 rounded bg-black text-white"
            defaultValue={importSelect}
            onChange={(e) => setImportSelect(e.target.value)}
          >
            <option value="watchList">WatchList</option>
            <option value="list">List</option>
            <option value="ratings">Ratings</option>
          </select>
          <DropZone
            multiple
            accept=".csv"
            onChange={(e) => {
              if (e.target.files) {
                setFiles(e.target.files);
              }
            }}
          />
          <div className="text-white">
            {letterBoxdMovies && Object.keys(letterBoxdMovies).map((v) => (
              <p key={v}>{v}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportLetterboxd;
