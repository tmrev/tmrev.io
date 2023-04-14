import { yupResolver } from '@hookform/resolvers/yup';
import { Reorder } from 'framer-motion';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../../../../components/common/Button';
import Input from '../../../../components/common/Input';
import SearchableInput from '../../../../components/common/inputs/searchable';
import MovieItem from '../../../../components/common/movie/MovieItem';
import TagList from '../../../../components/common/movie/tags/TagList';
import HeaderText from '../../../../components/common/typography/headerText';
import { firebaseAdmin } from '../../../../config/firebaseAdmin';
import { Movie } from '../../../../models/tmdb';
import { useAuth } from '../../../../provider/authUserContext';
import { apiKey, tmdbAPI, useCreateWatchListMutation } from '../../../../redux/api';
import { capitalize, uniqueArray } from '../../../../utils/common';

export type ReactSelect = {
  label: string
  value: number
  movie: Movie
}

const fetchMovieDetails = async (
  movieId: string,
  setMovies: React.Dispatch<React.SetStateAction<ReactSelect[]>>,
) => {
  const res = await fetch(`${tmdbAPI}/movie/${movieId}?api_key=${apiKey}`);
  const data = await res.json();

  if (data) {
    setMovies((prevState) => [...prevState, {
      label: data.title,
      movie: data,
      value: data.id,
    }]);
  }
};

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

const CreateList:NextPage = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    register, handleSubmit, formState: { errors }, setValue, getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [tagInput, setTagInput] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [movies, setMovies] = useState<ReactSelect[]>([]);

  const [addWatchList] = useCreateWatchListMutation();

  const onSubmit = async (data: typeof defaultValues) => {
    if (!user) return;

    const token = await user.getIdToken();

    addWatchList({
      ...data,
      token,
    }).unwrap().then((v) => {
      router.push(`/user/${user.uid}/list/${v._id}`);
    });
  };

  useEffect(() => {
    const formattedArray: number[] = [];

    movies.forEach((v) => {
      formattedArray.push(v.value);
    });

    setValue('movies', formattedArray);
  }, [movies]);

  useEffect(() => {
    setValue('tags', tags);
  }, [tags]);

  const handleTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!tagInput) return;

    setTags((prevState) => [...prevState, capitalize(tagInput).trim()]);
    setTagInput('');
  };

  useEffect(() => {
    if (typeof router.query.with === 'string') {
      fetchMovieDetails(router.query.with, setMovies);
    }
  }, [router.query]);

  const handleMovieRemove = (index: number) => {
    const newArray = [...movies];
    newArray.splice(index, 1);
    setMovies(newArray);
  };

  return (
    <div className="flex h-full w-full justify-center items-center px-2 md:px-4 text-white">
      <div className="p-4 w-full lg:w-1/2 divide-y space-y-4 bg-tmrev-gray-dark h-max rounded mt-16">
        <HeaderText>{getValues('title')}</HeaderText>
        <form className="py-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            error={errors.title}
            {...register('title')}
            label="Name of List"
          />
          <Input
            label="Tags"
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
            <SearchableInput setData={setMovies} />
            {errors.movies && (
              <p className="text-red-500 mt-1">{errors.movies.message}</p>
            )}
          </div>
          <Button className="w-full" type="submit" variant="primary">Create List</Button>
          <div className="text-white py-2">
            <Reorder.Group as="ol" axis="y" className="space-y-4" values={movies} onReorder={setMovies}>
              {uniqueArray(movies, 'value').map((v, i) => (
                <Reorder.Item key={v.value} value={v}>
                  <MovieItem
                    handleMovieRemove={handleMovieRemove}
                    index={i}
                    movie={v.movie}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = nookies.get(context);
  try {
    await firebaseAdmin.auth().verifyIdToken(token);

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

export default CreateList;
