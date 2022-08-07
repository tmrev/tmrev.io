import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Movie } from '../../models/tmdb';
import { useAuth } from '../../provider/authUserContext';
import { useAddMovieToWatchListMutation, useGetUserWatchListsQuery } from '../../redux/api';
import { Content, setModalContent, setOpenModal } from '../../redux/slice/modalSlice';
import Button from '../common/Button';

interface Props {
  movie: Movie
}

const AddToWatchList:FunctionComponent<Props> = ({ movie }:Props) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { title } = movie;
  const [token, setToken] = useState<string>('');

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

  const renderWatchLists = () => {
    if (!data) return null;

    return (
      <div className="divide-y mt-6 flex flex-col">
        {
          data.map((watchList) => (
            <button
              key={watchList._id}
              className="py-2 hover:bg-black w-full"
              type="button"
              onClick={() => handleAddToWatchList(watchList._id)}
            >
              <div>
                {watchList.title}
              </div>
            </button>
          ))
        }
      </div>
    );
  };

  const addToList = () => {
    const content:Content = {
      children: renderWatchLists(),
      closeFunc: () => dispatch(setOpenModal(false)),
      description: `Please select a watchList to add ${movie.title} too`,
      outsideClick: true,
      renderWithDefaultBody: true,
      title: `Add ${title} to your watchList`,
    };

    dispatch(setOpenModal(true));
    dispatch(setModalContent(content));
  };

  return <Button className="mt-4 w-full" variant="secondary" onClick={addToList}>Add To WatchList</Button>;
};

export default AddToWatchList;
