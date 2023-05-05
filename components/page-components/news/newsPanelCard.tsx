import React, { FunctionComponent } from 'react'

import { NewsResults } from '@/models/tmrev/news'

interface Props extends NewsResults  {}

const NewsPanelCard: FunctionComponent<Props> = ({...news}: Props) => {

  if(!news.url || !news.img) return null


  return (
    <div key={news._id} >
      <a  className='flex items-center space-x-3' href={news.url}>
        <img
          alt={news.title || ''}
          className='rounded object-cover'
          height={128}
          src={news.img}
          width={128}
        />
        <div className='text-white'>
          <span className='text-sm font-bold' >{news.title}</span>
          <div className='text-xs space-x-3 divide-x'>
            <span>{news.source}</span>
            <span className='pl-3' >{news.author}</span>
          </div>
        </div>
      </a> 
    </div>
  )

}

export default NewsPanelCard