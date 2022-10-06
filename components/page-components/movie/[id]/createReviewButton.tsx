import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

import { useAppDispatch } from '../../../../hooks';
import { useAuth } from '../../../../provider/authUserContext';
import { Content, setModalContent, setOpenModal } from '../../../../redux/slice/modalSlice';
import Button from '../../../common/Button';
import LoginPanel from '../../../login';

interface Props {
  hasReviewed?: string
}

const CreateReviewButton:FunctionComponent<Props> = ({ hasReviewed }) => {
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
        description: 'in order to review a movie on trmev you need to login',
        outsideClick: true,
        title: 'Please Login to review',
      };

      dispatch(setOpenModal(true));
      dispatch(setModalContent(content));
    }
  };

  if (hasReviewed) {
    return (
      <Button
        className="mt-4 w-full"
        variant="primary"
        onClick={() => router.push(`${router.asPath}/update/${hasReviewed}`)}
      >
        Update Review
      </Button>
    );
  }

  return (
    <Button
      className="mt-4 w-full"
      variant="primary"
      onClick={handleMovieReview}
    >
      Review Movie
    </Button>
  );
};

export default CreateReviewButton;

CreateReviewButton.defaultProps = {
  hasReviewed: '',
};
