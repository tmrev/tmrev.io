/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { FC } from 'react'

import { NewsResults, TrendingResults } from '@/models/tmrev/news'

interface Props {
  news: NewsResults | TrendingResults
}
 
const NewsCard: FC<Props> = ({ news }: Props) => {
  const {img, title, snippet, url} = news

  if(!url || !title || !img) return null

  return (
    <Link passHref href={url}>
      <div className='bg-tmrev-gray-dark  relative rounded flex w-[325px] text-white h-full'>
        <div className="absolute inset-0 rounded">
          <img alt={title} className="w-full h-full object-cover rounded" src={img}/>
          <div className="absolute inset-0 bg-black opacity-90" />
        </div>
        <div className='p-2 space-y-3 relative'>
          <h1 className=' font-bold text-lg' >{title}</h1>
          <p className=' line-clamp-2 max-w-sm text-lg font-semibold' >{snippet}</p>
        </div>  
      </div>
    </Link>

  )
}

export default NewsCard;