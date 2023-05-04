import React, { FunctionComponent } from 'react'

import { NewsResults } from '@/models/tmrev/news'

interface Props {
  news: NewsResults
}

const NewsCard: FunctionComponent<Props> = ({news}: Props) => {


  if(!news.url) return null


  return (
    <a className='w-80 border rounded m-3 bg-tmrev-gray-dark text-white h-max' href={news.url} rel="noreferrer" target='_blank'>
      <div className='flex flex-col'>
        {news.img && (
          <img 
            alt={news.title || ''} 
            className=' aspect-square h-36 object-cover' 
            src={news.img}
          />
        )}
        <div className='p-3 '>
          <h3 className=' text-lg font-semibold'>{news.title}</h3>
          <p className=' line-clamp-3' >{news.snippet}</p>
        </div>
      </div> 
    </a>
  )
}


export default NewsCard