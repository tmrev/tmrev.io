import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import OutlineButton from '@/components/button/outline';
import { MovieGeneral } from '@/models/tmdb/movie/tmdbMovie';

import { useAuth } from '../../../../provider/authUserContext';
import { useAddMovieToWatchListMutation, useGetUserWatchListsQuery } from '../../../../redux/api';
import {
  Content, setClearModal, setModalContent, setOpenModal,
} from '../../../../redux/slice/modalSlice';
import { parseMediaId } from '../../../../utils/mediaID';
import Button from '../../../common/Button';

interface Props {
  movie: MovieGeneral
}

const AddToWatchList:FunctionComponent<Props> = ({ movie }:Props) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { title } = movie;
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchToken = async () => {
      const authToken = await user.getIdToken();
      setToken(authToken);
    };

    fetchToken();
  }, []);

  const { data } = useGetUserWatchListsQuery(token, { skip: !token });
  const [addToWatchList] = useAddMovieToWatchListMutation();

  const handleAddToWatchList = (listId: string) => {
    addToWatchList({ data: { id: movie.id }, listId, token });
    dispatch(setOpenModal(false));
  };

  const handleCreateNewList = () => {
    if (!user) return;

    dispatch(setOpenModal(false));
    dispatch(setClearModal());
    router.push(`/user/${user.uid}/list/create?with=${parseMediaId(router.query.id as string)}`);
  };

  const renderWatchLists = () => {
    if (!data || !user) return null;

    return (
      <div className="divide-y mt-6 flex flex-col space-y-4 ">
        <Button className="sticky" variant="primary" onClick={handleCreateNewList}>
          Create New List
        </Button>
        <div className="h-96 overflow-auto">
          {
            data.map((list) => (
              <button
                key={list._id}
                className="py-2 hover:bg-black w-full"
                type="button"
                onClick={() => handleAddToWatchList(list._id)}
              >
                <div>
                  {list.title}
                </div>
              </button>
            ))
          }
        </div>

      </div>
    );
  };

  const addToList = () => {
    if (!user) router.push('/login');

    const content:Content = {
      children: renderWatchLists(),
      closeFunc: () => dispatch(setOpenModal(false)),
      description: `Please select a list to add ${movie.title} too`,
      outsideClick: true,
      renderWithDefaultBody: true,
      title: `Add ${title} to your list`,
    };

    dispatch(setOpenModal(true));
    dispatch(setModalContent(content));
  };

  return <OutlineButton className="mt-4 w-full" onClick={addToList}>Add To list</OutlineButton>;
};

export default AddToWatchList;
