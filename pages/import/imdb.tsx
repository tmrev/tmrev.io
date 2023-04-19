import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useCallback, useEffect, useState } from 'react';

import DropZone from '@/components/common/inputs/dropZone';
import HeaderText from '@/components/common/typography/headerText';
import { useAppDispatch } from '@/hooks';
import { BatchMoviesResponse } from '@/models/tmrev/movie';
import { WatchedPayload } from '@/models/tmrev/watched';
import { useAuth } from '@/provider/authUserContext';
import {
  tmrevAPI,
  useCreateWatchedMutation,
  useCreateWatchListMutation,
} from '@/redux/api';
import { setOpenToast, setToastContent } from '@/redux/slice/toastSlice';
import importIMDB, { IMDBImport } from '@/utils/importIMDB';

type IMDBMovies = {
  [x: string]: Data[];
};

type Data = {
  imdb: IMDBImport;
  movieList: string[];
};

type ParsedData = {
  res: PromiseSettledResult<AxiosResponse<BatchMoviesResponse, any>>;
  name: string;
  id: string;
};

const batchLookUp = async (imdbMovies: IMDBMovies): Promise<ParsedData[]> => {
  const batchRequests = Object.values(imdbMovies).map(
    (movies) => axios({
      data: {
        movieId: movies[0].movieList,
      },
      method: 'POST',
      url: `${tmrevAPI}/import/imdb`,
    }) as AxiosPromise<BatchMoviesResponse>,
  );

  const res = await Promise.allSettled(batchRequests);

  const parsedData = res.map((value, i) => {
    let returnData: any = {};
    Object.keys(imdbMovies).forEach((key, index) => {
      if (index === i) {
        returnData = {
          id: imdbMovies[key][index].imdb.const,
          name: key,
          res: value,
        };
      }
    });
    return returnData;
  });

  return parsedData;
};

const ImportIMDB: NextPage = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [imdbMovies, setImdbMovies] = useState<IMDBMovies>();
  const [importSelect, setImportSelect] = useState<string>('watchlist');
  const [batchRequest, setBatchRequest] = useState<ParsedData[]>();
  const [addWatchList] = useCreateWatchListMutation();
  const [addWatched] = useCreateWatchedMutation();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const beginImport = useCallback(async () => {
    if (!files) return;

    Object.values(files).forEach((file) => {
      importIMDB(file).then((data) => {
        const tempArray: Data[] = [];
        data.forEach((element) => {
          if (element.const) {
            tempArray.push({
              imdb: element,
              movieList: data.map((v) => v.const),
            });
          }
        });
        setImdbMovies((prevState) => ({
          ...prevState,
          [file.name.split('.')[0]]: tempArray,
        }));
      });
    });
  }, [files]);

  const handleBatch = useCallback(async () => {
    if (!imdbMovies) return;

    const data = await batchLookUp(imdbMovies);

    setBatchRequest(data);
  }, [imdbMovies]);

  useEffect(() => {
    handleBatch();
  }, [handleBatch, imdbMovies]);

  const cleanUp = () => {
    setFiles(null);
    setImdbMovies(undefined);
    setBatchRequest(undefined);
  };

  const uploadWatchList = async () => {
    if (!batchRequest || !user || !files || importSelect === 'rating') return;

    const token = await user.getIdToken();

    batchRequest.forEach((parsedData) => {
      if (parsedData.res.status === 'fulfilled') {
        const payload = {
          description: 'Imported from imdb',
          movies: Object.values(parsedData.res.value.data.body).map(
            (v) => v.id,
          ),
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
            setImdbMovies(undefined);
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
    if (
      !batchRequest
      || !user
      || !files
      || importSelect !== 'ratings'
      || !imdbMovies
    ) return;

    const token = await user.getIdToken();
    const payload: WatchedPayload[] = [];

    batchRequest.forEach((parsedData) => {
      Object.keys(imdbMovies).forEach((key) => {
        if (parsedData.res.status !== 'fulfilled') return;

        imdbMovies[key].forEach((d) => {
          if (parsedData.res.status !== 'fulfilled') return;
          if (
            typeof parsedData.res.value.data.body[d.imdb.const] !== 'undefined'
          ) {
            const { title, poster_path, id } = parsedData.res.value.data.body[d.imdb.const];

            payload.push({
              authToken: token,
              liked: Number(d.imdb.yourRating) > 7,
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

  useEffect(() => {
    uploadWatchList();
    uploadRatings();
  }, [batchRequest, user]);

  useEffect(() => {
    beginImport();
  }, [files, beginImport]);

  return (
    <>
      <Head>
        <title>Import IMDB data</title>
        <meta
          content="Easily upload all of your list, ratings and watchlist from imdb"
          name="description"
        />
      </Head>
      <div className="lg:h-full h-screen text-center w-full flex justify-center items-center">
        <div className=" bg-tmrev-gray-dark p-4 rounded flex flex-col md:min-w-[500px] space-y-4">
          <HeaderText>IMDB Import</HeaderText>
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
            {imdbMovies
              && Object.keys(imdbMovies).map((v) => <p key={v}>{v}</p>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImportIMDB;
