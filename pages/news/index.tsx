/* eslint-disable react/jsx-no-useless-fragment */
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import NewsPanel from '@/components/page-components/news/newsPanel'
import NewsPanelCard from '@/components/page-components/news/newsPanelCard'
import useScroll from '@/hooks/useScroll'
import { DiscoverMovieResult } from '@/models/tmdb'
import { useGetDiscoverMovieQuery } from '@/redux/api'
import { useSearchNewsQuery } from '@/redux/api/news'
import { debounce, uniqueArray } from '@/utils/common'


const News: NextPage = () => {

  const router = useRouter()

  const { q } = router.query

  const [search, setSearch] = useState<string>(q as string || '')
  const [page, setPage] = useState<number>(1)
  const [results, setResults] = useState<DiscoverMovieResult[]>([])

  const {data: discoverData} = useGetDiscoverMovieQuery({page})
  const {data: searchData} = useSearchNewsQuery({q: search}, {skip: !search})

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const debouncedSearch = useCallback(debounce(handleSearch, 300), [])

  const { isBottom } = useScroll()

  useEffect(() => {
    setPage(page + 1)
  }, [isBottom])

  useEffect(() => {
    if(!discoverData) return 


    setResults((prevState) => {
      const newArr = uniqueArray([...prevState, ...discoverData.results], 'id')

      return newArr
    })

  }, [discoverData])

  const renderDiscover = () => {
    if(search || !discoverData) return null

    return (
      <>
        {results.map((movie) => (
          <NewsPanel key={movie.id} movieTitle={movie.title} />
        ))}
      </>
    )
  }

  const renderSearch = () => {
    if(!search) return null

    return (
      <>
        {searchData?.body.results.map((searchResult) => (
          <NewsPanelCard key={searchResult._id} {...searchResult} />
        ))}
      </>
    )
  }

  return (
    <div className='p-3 space-y-3'>
      <div className='text-white'>
        <h1 className='text-2xl font-semibold' >Discover</h1>
        <p className='text-sm font-light' >Movie news from around the county</p>
      </div>
      <div className='w-full relative text-white flex items-center p-2 rounded bg-black space-x-3'>
        <span className="material-icons">
          search
        </span>
        <input 
          className={
            twMerge('bg-transparent text-white',
              'focus:outline-white focus:outline-0',
              "focus:ring-0",
              'w-full h-full'
            )
          }
          placeholder='Search'
          onChange={debouncedSearch}
        />
      </div>
      <div className='space-y-3'>
        {renderDiscover()}
        {renderSearch()}
      </div>
    </div>
  )

}


export default News