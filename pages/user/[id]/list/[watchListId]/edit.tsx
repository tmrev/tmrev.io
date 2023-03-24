/* eslint-disable jsx-a11y/label-has-associated-control */
import { yupResolver } from '@hookform/resolvers/yup';
import { Reorder } from 'framer-motion';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../../../../../components/common/Button';
import Input from '../../../../../components/common/Input';
import SearchableInput from '../../../../../components/common/inputs/searchable';
import MovieItem from '../../../../../components/common/movie/MovieItem';
import TagList from '../../../../../components/common/movie/tags/TagList';
import HeaderText from '../../../../../components/common/typography/headerText';
import { useAppDispatch } from '../../../../../hooks';
import { Movie } from '../../../../../models/tmdb';
import { UpdateWatchList } from '../../../../../models/tmrev';
import { GetListPayload } from '../../../../../models/tmrev/watchList';
import { useAuth } from '../../../../../provider/authUserContext';
import {
  useDeleteWatchListMutation, useGetListQuery, useUpdateWatchListMutation,
} from '../../../../../redux/api';
import {
  Content, setClearModal, setModalContent, setOpenModal,
} from '../../../../../redux/slice/modalSlice';
import { capitalize } from '../../../../../utils/common';
import { ReactSelect } from '../create';

const schema = yup.object().shape({
  description: yup.string().optional(),
  movies: yup.array().min(1, 'You must have at least one movie').required('You must select a movie to create a list'),
  public: yup.boolean(),
  tags: yup.array().optional(),
  title: yup.string().required('Name of List is required'),
});

const defaultValues = {
  description: '',
  movies: [] as number[],
  public: true,
  tags: [] as string[],
  title: 'New List',
};

const WatchListEdit: NextPage = () => {
  const router = useRouter();

  const [authToken, setAuthToken] = useState<string>('');
  const { user } = useAuth();
  const [searchedMovies, setSearchedMovies] = useState<ReactSelect[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [updateList] = useUpdateWatchListMutation();
  const [deleteList] = useDeleteWatchListMutation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const dispatch = useAppDispatch();
  const {
    register, handleSubmit, formState: { errors }, setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const createToken = useCallback(async () => {
    if (!user) return;

    const token = await user.getIdToken();

    setAuthToken(token);
  }, [user]);

  useEffect(() => {
    createToken();
  }, [createToken]);

  const payload: GetListPayload | undefined = useMemo(() => {
    if (typeof router.query.watchListId !== 'string' || !authToken) return undefined;

    return {
      authToken,
      id: router.query.watchListId,
    };
  }, [router.query, authToken]);

  const { data } = useGetListQuery(payload!, { skip: !payload });

  useEffect(() => {
    if (!data) return;

    const newArray = [...data.movieData];

    newArray.sort((a, b) => data.movies.indexOf(a.id) - data.movies.indexOf(b.id));

    setMovies(newArray);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    setValue('title', data.title);
    setValue('movies', data.movies);
    setValue('public', data.public);
    setValue('tags', data.tags);
    setValue('description', data.description);
    setTags(data.tags);
  }, [data]);

  useEffect(() => {
    const formattedArray: number[] = [];

    movies.forEach((v) => {
      formattedArray.push(v.id);
    });

    setValue('movies', formattedArray);
  }, [movies]);

  useEffect(() => {
    setValue('tags', tags);
  }, [tags]);

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!tagInput) return;

    setTags((prevState) => [capitalize(tagInput).trim(), ...prevState]);
    setTagInput('');
  };

  const handleMovieRemove = (index: number) => {
    const newArray = [...movies];
    newArray.splice(index, 1);
    setMovies(newArray);
  };

  const onSubmitUpdate = async (formData: typeof defaultValues) => {
    if (!data || !movies || !user) return;
    try {
      const token = await user.getIdToken();

      const updatePayload: UpdateWatchList = {
        description: formData.description,
        movies: [...new Set(formData.movies)],
        public: formData.public,
        tags: formData.tags,
        title: formData.title,
        token,
        watchListId: data._id,
      };

      updateList(updatePayload).unwrap().then(() => {
        router.push(`/user/${user.uid}/list/${data._id}`);
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const formatSearchData = (reactSelectData: ReactSelect[]): Movie[] => {
    const newSearchedMovies: Movie[] = [];

    reactSelectData.forEach((d) => {
      newSearchedMovies.push(d.movie);
    });

    return newSearchedMovies;
  };

  useEffect(() => {
    const formattedData = formatSearchData(searchedMovies);

    setMovies((prevState) => [...prevState, ...formattedData]);
  }, [searchedMovies]);

  const handleDelete = async () => {
    if (!user || !data) return;

    const token = await user.getIdToken();

    deleteList({
      authToken: token,
      id: data._id,
    }).unwrap().then(() => {
      dispatch(setOpenModal(false));
      dispatch(setClearModal());

      router.push(`/user/${user.uid}/list`);
    });
  };

  const handleConfirmDelete = () => {
    const content:Content = {
      buttons: [
        {
          onClick: () => dispatch(setOpenModal(false)),
          title: 'Cancel',
          variant: 'secondary',
        },
        {
          onClick: () => handleDelete(),
          title: 'Delete',
          variant: 'danger',
        },
      ],
      closeFunc: () => dispatch(setOpenModal(false)),
      description: 'This action can not be undone',
      outsideClick: true,
      title: 'Please confirm you want to delete this list',
    };

    dispatch(setModalContent(content));
    dispatch(setOpenModal(true));
  };

  return (
    <div className="flex h-full w-full justify-center items-center px-2 md:px-4 text-white">
      <div className="text-white mt-16 w-full space-y-4 bg-tmrev-gray-dark h-max rounded p-4">
        <HeaderText>Update List</HeaderText>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmitUpdate)}>
          <Input
            error={errors.title}
            placeholder="Give your list a creative name 🖌️"
            {...register('title')}
            label="Name of List"
          />
          <Input
            label="Tags"
            placeholder="Press enter to complete tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTags(e);
              }
            }}
          />
          <TagList setTags={setTags} tags={tags} />
          <Input
            error={errors.description}
            placeholder="Give your list a fancy description 🕺"
            {...register('description')}
            label="Description"
            variant="textarea"
          />
          <div>
            <p className="font-semibold pb-1 text-md">Public List</p>
            <input
              {...register('public')}
              className="p-2 h-5 w-5 rounded bg-black focus:ring-0"
              type="checkbox"
            />
          </div>
          <div className="w-full relative">
            <p className="font-semibold pb-1 text-md">Add Movie To List</p>
            <SearchableInput
              setData={setSearchedMovies}
            />
          </div>
          <div className="flex space-x-2">
            <Button className="w-full" variant="danger" onClick={() => handleConfirmDelete()}>Delete List</Button>
            <Button className="w-full" type="submit" variant="primary">Save List</Button>
          </div>
          <Reorder.Group className="space-y-4" values={movies} onReorder={setMovies}>
            {movies.map((movie, i) => (
              <Reorder.Item key={movie.id} value={movie}>
                <MovieItem
                  handleMovieRemove={handleMovieRemove}
                  index={i}
                  movie={movie}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </form>
      </div>
    </div>

  );
};

export default WatchListEdit;
