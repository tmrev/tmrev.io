import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

import { useAppDispatch } from '../../hooks';
import { useAuth } from '../../provider/authUserContext';
import { Content, setModalContent, setOpenModal } from '../../redux/slice/modalSlice';
import Button from '../common/Button';
import LoginPanel from '../login';

const CreateReviewButton:FunctionComponent = () => {
  const router = useRouter();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const handleMovieReview = () => {
    if (user) {
      router.push(`${router.asPath}/review`);
    } else {
      const content:Content = {
        children: <LoginPanel isModal redirectPath={`${router.asPath}/review`} />,
        closeFunc: () => dispatch(setOpenModal(false)),
        description: 'enorder to review a movie on trmev you need to login',
        outsideClick: true,
        title: 'Please Login to review',
      };

      dispatch(setOpenModal(true));
      dispatch(setModalContent(content));
    }
  };

  return <Button className="mt-4" variant="primary" onClick={handleMovieReview}>Review Movie</Button>;
};

export default CreateReviewButton;
