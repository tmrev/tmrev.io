import 'server-only';

const deleteReview = async (id: string, token: string): Promise<void> => {
  const res = await fetch(`${process.env.TMREV_API}/movie/review/${id}`, {
    headers: {
      authorization: token,
    },
    method: 'DELETE',
  });

  return res.json();
};

export default deleteReview;
