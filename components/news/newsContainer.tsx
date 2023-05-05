import { useRouter } from 'next/router'
import React, { FunctionComponent } from 'react'

import { useSearchNewsQuery } from '@/redux/api/news'

import OutlineButton from '../button/outline'
import HeaderText from '../common/typography/headerText'
import NewsCard from './newsCard'

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  movieTitle?: string
}

const NewsContainer: FunctionComponent<Props> = ({movieTitle}: Props) => {
  const router = useRouter()
  const {data: newsData} = useSearchNewsQuery({limit: 2, q: movieTitle || ''}, {skip: !movieTitle})

  const handleClick = () => {
    router.push(`/news?q=${movieTitle}`)
  }

  if(!newsData?.body.results.length) return null

  return (
    <div className='w-full space-y-3'>
      <HeaderText>Related News</HeaderText>
      <div className="flex flex-wrap w-full justify-center space-y-3">
        {newsData?.body.results.map((news) => (
          <NewsCard key={news._id} news={news}/>
        ))}
      </div>
      <OutlineButton onClick={handleClick}> See All News</OutlineButton>
    </div>
    
  )

}

NewsContainer.defaultProps = {
  movieTitle: undefined
}


export default NewsContainer
