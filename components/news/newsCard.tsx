import dayjs from 'dayjs'
import React, { FunctionComponent } from 'react'

import { NewsResults } from '@/models/tmrev/news'

interface Props {
  news: NewsResults
}

const NewsCard: FunctionComponent<Props> = ({news}: Props) => {


  if(!news.url) return null


  return (
    <a className='w-full rounded m-3 bg-tmrev-gray-dark text-white h-max' href={news.url} rel="noreferrer" target='_blank'>
      <div className='flex flex-row'>
        {news.img && (
          <img 
            alt={news.title || ''} 
            className=' aspect-square w-24 object-cover rounded-l' 
            src={news.img}
          />
        )}
        <div className='p-3 '>
          <div className='space-x-2 text-xs'>
            <span>{`${dayjs().diff(news.publishedDate, 'days')} days ago`}</span>
            <span>{news.source}</span>
          </div>
          <h3 className='font-semibold'>{news.title}</h3>
        </div>
      </div> 
    </a>
  )
}


export default NewsCard