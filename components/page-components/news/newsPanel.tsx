/* eslint-disable @next/next/no-img-element */
import React, { FunctionComponent } from 'react'

import { useSearchNewsQuery } from '@/redux/api/news'

import NewsPanelCard from './newsPanelCard'

interface Props {
  movieTitle?: string
}

const NewsPanel: FunctionComponent<Props> = ({movieTitle}: Props) => {
  const {data: newsData} = useSearchNewsQuery({limit: 5, q: movieTitle || ''}, {skip: !movieTitle})

  if(!newsData?.body.results.length) return null

  return (
    <>
      { newsData.body.results.map((news) => {
        
        if(!news.img || !news.url) return null

        return <NewsPanelCard key={news._id} {...news} />
      })}
    </>
  )
}

NewsPanel.defaultProps = {
  movieTitle: undefined
}

export default NewsPanel