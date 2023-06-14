import { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import FilledButton from '@/components/button/filled'
import HeaderText from '@/components/common/typography/headerText'
import FollowerCard from '@/components/page-components/follow/followerCard'
import Skeleton from '@/components/skeleton'
import useProfile from '@/hooks/userProfile'
import useScroll from '@/hooks/useScroll'
import { RetrieveFollowingResult } from '@/models/tmrev/follow'
import { useRetrieveFollowingQuery } from '@/redux/api'
import { uniqueArray } from '@/utils/common'


const Following: NextPage = () => {
  const { data: userData } = useProfile()
  const { isBottom } = useScroll()
  const accountId = useMemo(() => {
    if(!userData) return ''

    return userData._id
  }, [userData]);
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<RetrieveFollowingResult>()

  const {data: fetchedData, isFetching} = useRetrieveFollowingQuery({accountId, page, pageSize: 10}, {skip: !accountId})

  const handleNextPage = useCallback(() => {
    setPage(page + 1)
  }, [page])

  useEffect(() => {
    if(!fetchedData) return

    setData((prevState) => {
      if(!prevState) {
        return fetchedData.body
      }

      const uniqueFollowing = uniqueArray(
        [
          ...prevState.following,
          ...fetchedData.body.following
        ],
        '_id')

      return {
        ...fetchedData.body,
        following: uniqueFollowing
      }
    })
  }, [fetchedData])

  useEffect(() => {
    if(!fetchedData || !data) return

    if(isBottom && fetchedData.body.total > data.following.length) {
      handleNextPage()
    }
  }, [fetchedData, isBottom, handleNextPage])

  return (
    <div className='text-white p-4'>
      <div>
        <HeaderText className='font-bold text-2xl'>Following</HeaderText>
        {isFetching || !data || !fetchedData ? (
          <Skeleton width={80}/>
        ) : (
          <span className=' opacity-70' >{`following ${fetchedData.body.total} user(s)`}</span>
        )}
      </div>
      <div className='flex flex-col mt-3 divide-y divide-black'>
        {isFetching || !data ? (
          <Skeleton count={3} height={73}  />
        ) : data.following.map((user) => (
          <FollowerCard key={user._id}  user={user}/>
        ))}
      </div>
      {fetchedData && data && (fetchedData.body.total > data.following.length) && (
        <FilledButton onClick={handleNextPage}>Load More</FilledButton>
      )}
    </div>
  )
}

export default Following