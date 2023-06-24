import Link from 'next/link';
import React, { useState } from 'react'

import Avatar from '@/components/avatar';
import Button from '@/components/common/Button';
import HeaderText from '@/components/common/typography/headerText';
import MoviePoster, { LocationPath } from '@/components/poster';
import Skeleton from '@/components/skeleton';
import HorizontalSkeleton from '@/components/skeleton/horizontalSkeleton';
import { ReviewFeed } from '@/models/tmrev/follow';
import { useAuth } from '@/provider/authUserContext';
import { useRetrieveFollowerFeedQuery, useVoteTmrevReviewMutation } from '@/redux/api'
import { useGetMovieDetailsQuery } from '@/redux/api/tmdb/movieAPI';
import { roundWithMaxPrecision } from '@/utils/common';

interface Props {
  accountId: string
}

interface FeedCardProps {
  reviewFeed: ReviewFeed
}

const FeedCard: React.FC<FeedCardProps> = ({reviewFeed}: FeedCardProps) => {
  const [liked, setLiked] = useState<boolean | undefined>()
  const { user } = useAuth()

  const [addVote] = useVoteTmrevReviewMutation()

  const { data, isFetching } = useGetMovieDetailsQuery({movie_id: reviewFeed.reviewData.tmdbID, params: {}})

  const handleLike = async (isLike: boolean) => {
    if(!user) return

    if(liked === isLike) {
      setLiked(undefined)
    } else {
      setLiked(isLike)
      const token = await user.getIdToken()

      addVote({
        reviewId: reviewFeed.reviewData._id,
        token,
        vote: isLike
      })
    }
  }


  if(!data || isFetching) {
    return (
      <Skeleton className='aspect-moviePoster' height={173} />
    )
  }

  return (
    <div className='flex border rounded space-x-3 text-white border-black w-full mb-3' >
      <MoviePoster 
        imgUrl={data.poster_path} 
        location={LocationPath.MOVIE} 
        movieId={reviewFeed.reviewData.tmdbID}  
        name={reviewFeed.reviewData.title}
      />
      <div className='p-3 space-y-3 w-64'>
        <div>
          <Link passHref href={`/user/${reviewFeed.author.uuid}/preview`}>
            <a className='flex items-center space-x-3'>
              <Avatar className='flex-grow' user={reviewFeed.author} />
              <span className='font-semibold md:font-bold md:text-lg' >
                {`${reviewFeed.author.firstName} ${reviewFeed.author.lastName}`}
              </span>
            </a>
          </Link>
        </div>
        {reviewFeed.reviewData.averagedAdvancedScore && (
          <div className='bg-black rounded p-1 flex items-center space-x-3 w-full'>
            <span className='text-3xl' >⭐️</span>
            <div className='space-x-1'>
              <span className='font-bold text-2xl' >
                {roundWithMaxPrecision((reviewFeed.reviewData.advancedScore as any).personalScore, 1)}
              </span> 
              <span className='font-light text-sm' >/</span>
              <span className='font-light text-sm'>10</span>
            </div>
          </div>
        )}
        <div>
          <span className='line-clamp-4'>
            {reviewFeed.reviewData.notes}
          </span>
        </div>
        <div className='flex'>
          <Button variant='icon' onClick={() => handleLike(true)} >
            <span className={liked ? "material-icons" : 'material-icons-outlined'}>
              thumb_up
            </span>
          </Button>
          <Button variant='icon' onClick={() => handleLike(false)} >
            <span className={liked === false ? "material-icons" : 'material-icons-outlined'}>
              thumb_down
            </span>
          </Button>
        </div>
      </div>
    </div>
  )

}

const Feed: React.FC<Props> = ({accountId}: Props) => {


  const { data, isFetching } = useRetrieveFollowerFeedQuery(accountId, {skip: !accountId});

  if(!data || !data.body.reviews.length) return null

  return (
    <section className='space-y-8'>
      <HeaderText>Feed</HeaderText>
      <div className='flex overflow-auto space-x-3 w-full'>
        {!data || !data.body.reviews.length || !isFetching ? (
          data.body.reviews.map((review) => (
            <FeedCard key={review.reviewData._id} reviewFeed={review} />
          ))
        ) : (
          <HorizontalSkeleton skeletonHeight={350} skeletonWidth={500}/>
        )}
      </div>
    </section>
  )

}

export default Feed