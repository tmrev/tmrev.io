import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent,
  memo,
  useEffect, 
  useRef, 
  useState,
} from 'react';
import ReactMarkdown from 'react-markdown';
import OutsideClickHandler from 'react-outside-click-handler';
import remarkGfm from 'remark-gfm';

import Chip from '@/components/chip';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Profile } from '@/models/tmrev/movie';
import { useAuth } from '@/provider/authUserContext';
import { useAddCommentMutation, useVoteTmrevReviewMutation } from '@/redux/api';

import { TmrevReview } from '../../../../models/tmrev';
import { capitalize, extractNameFromEmail, renderImageSrc } from '../../../../utils/common';

interface Props {
  review: TmrevReview | null
  compact?: boolean
}

const ReviewItem:FunctionComponent<Props> = ({ review, compact }:Props) => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [viewReplies, setViewReplies] = useState<boolean>(false)
  const [openDropDown, setOpenDropDown] = useState<boolean>(false)
  const [reply, setReply] = useState<boolean>(false)

  const { user } = useAuth()


  const [commentText, setCommentText] = useState<string>('')

  const [addComment] = useAddCommentMutation()
  const [addVote] = useVoteTmrevReviewMutation()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    if(!commentText || !review || !user) return

    const token = await user.getIdToken()

    await addComment({comment: commentText, id: review._id, token})
    
    setReply(false)
    setViewReplies(true)
    setCommentText('')
  }

  const handleVote = async (vote: boolean) => {

    if(!review || !user) return

    const token = await user.getIdToken()

    await addVote({reviewId: review._id, token, vote})
  }

  useEffect(() => {
    if(!reply || !inputRef.current) return

    inputRef.current.focus()

  }, [reply, inputRef])

  if (!review) return null;
  const {
    userId, _id, notes, averagedAdvancedScore, profile,
  } = review;



  const renderUserName = (userProfile:Profile) => {
    if (!userProfile) return 'Error';
    if (!userProfile.firstName || !userProfile.lastName) {
      return (
        <Link passHref href={`/user/${userId}/preview`}>
          <a>{extractNameFromEmail(userProfile.email)}</a>
        </Link>
      );
    }

    return (
      <Link passHref href={`/user/${userId}/preview`}>
        <a>{`${userProfile.firstName} ${userProfile.lastName}`}</a>
      </Link>
    );
  };



  if(compact) {
    return (
      <div className='flex items-center space-x-3'>
        <div className="h-8 w-8 bg-white rounded-full flex-none relative">
          <Image
            alt={`${profile.firstName} ${profile.lastName}`}
            className="rounded-full"
            layout="fill"
            src={profile.photoUrl || `https://avatars.dicebear.com/api/identicon/${userId}.svg`}
          />
        </div>
        {review.notes ? (
          <div>
            <p className='line-clamp-1'>{review.notes}</p>
          </div>
        ): (
          <div className="flex items-center divide-x">
            <p className="font-semibold pr-1">
              {renderUserName(profile)}
            </p>
            <p className="opacity-75 pl-1">
          User Rating
              {' '}
              {averagedAdvancedScore}
            </p>
          </div>
        )}

      </div>
    )
  }

  return (
    <div key={_id} className="flex items-start space-x-3">
      <div className="h-8 w-8 bg-white rounded-full flex-none relative">
        <Image
          alt={`${profile.firstName} ${profile.lastName}`}
          className="rounded-full"
          layout="fill"
          src={profile.photoUrl || `https://avatars.dicebear.com/api/identicon/${userId}.svg`}
        />
      </div>
      <div
        className="w-full"
      >
        <div className="flex items-center ">
          <div className='divide-x flex items-center flex-grow'>
            <p className="font-semibold pr-1">
              {renderUserName(profile)}
            </p>
            <p className="opacity-75 pl-1">
              User Rating
              {' '}
              {averagedAdvancedScore}
            </p>            
          </div>
          <div className=' relative'>
            <Button variant='icon' onClick={() => setOpenDropDown(true)}>
              <span className="material-icons-outlined">
              more_vert
              </span>
            </Button>
            <OutsideClickHandler onOutsideClick={() => setOpenDropDown(false)}>
              {openDropDown && (
                <div className="bg-tmrev-gray-dark text-white p-2 absolute rounded right-0 flex-col w-max">
                  <Button onClick={() => {
                    setViewMore(!viewMore)
                    setOpenDropDown(false)
                  }}>
                    {`${viewMore ? 'Hide' : 'View'} User Score`}
                  </Button>
                </div>
              )}
            </OutsideClickHandler>
          </div>
        </div>
        <div className="max-h-60 overflow-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {notes}
          </ReactMarkdown>
        </div>
        <div className='mt-3 -m-1 flex items-center flex-wrap'>
          <div className='flex items-center space-x-1 md:space-x-3 m-1' >
            <div className='flex items-center space-x-1'>
              <Button type='button' variant='icon' onClick={() => handleVote(true)}>
                <span className="material-icons-outlined">
                  thumb_up
                </span>
              </Button>
              {!!review.votes.upVote.length && (
                <span>
                  {review.votes.upVote.length}
                </span>
              )}
            </div>
            <div className='flex items-center space-x-1 m-2'>
              <Button type='button' variant='icon' onClick={() => handleVote(false)}>
                <span className="material-icons-outlined">
                  thumb_down
                </span>
              </Button>
              {!!review.votes.downVote.length && (
                <span>
                  {review.votes.downVote.length}
                </span>
              )}
            </div>
          </div>
          <Chip className='m-1' role='button' tabIndex={0} onClick={() => setReply(true)}>Reply</Chip>
          {!!review.comments?.length && (
            <Chip className='space-x-1 flex items-center m-1' role='button' tabIndex={0} onClick={() => setViewReplies(!viewReplies)} >
              <span className="material-icons-outlined">
                {viewReplies ? 'expand_less' : 'expand_more'}
              </span>
              <div className='space-x-3'>
                <span>Replies</span>
                <span>{review.comments.length}</span>
              </div>
            </Chip>
          )}
        </div>
        {reply && (
          <div className='space-y-3 mt-3 mb-8'>
            <form className='flex flex-col space-y-3 items-end p-2 rounded' onSubmit={(ev) => handleSubmit(ev)}>
              <Input ref={inputRef} className=' bg-tmrev-gray-dark' placeholder='Add Reply...' variant='textarea' onChange={(e) => setCommentText(e.target.value)}/>
              <div className='space-x-3'>
                <button
                  className='hover:bg-tmrev-gray-dark rounded-full px-3 py-1' type='button' onClick={() => setReply(false)}>
                  Cancel
                </button>
                <button 
                  className={
                    clsx('rounded-full px-3 py-1  font-semibold',
                      "disabled:bg-tmrev-gray-dark disabled:text-blacker",
                      "hover:bg-tmrev-alt-yellow hover:text-blacker"
                    )
                  }
                  disabled={!commentText} 
                  type='submit' >
                  Reply
                </button>
              </div>
            </form>
          </div>
        )}
        {viewReplies && (
          <div className='space-y-3 mt-8 mb-8'>
            {review.comments?.map((comment) => (
              <div key={comment._id} className='flex items-center space-x-3'>
                <div className=' flex-shrink-0'>
                  <Image className='rounded-full bg-white' height={32} layout='fixed' src={renderImageSrc(comment.profile[0])} width={32}/>
                </div>
               
                <div className='flex flex-col'>
                  <span className='font-semibold'>{renderUserName(comment.profile[0])}</span>
                  {comment.comment}
                </div>
              </div>
            ))}
          </div>
        )}
        {viewMore && review.advancedScore && (
          <div className='space-y-3 mt-3 mb-8'>
            <h4 className='font-semibold' >User Score</h4>
            <div className='pl-3'>
              <ul>
                {Object.keys(review.advancedScore).map((key: string) => {
                  if (!review.advancedScore) return null;

                  return <li key={key}>{`${capitalize(key)}: ${(review.advancedScore as any)[key]}`}</li>;
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ReviewItem.defaultProps = {
  compact: false
}

export default memo(ReviewItem);
