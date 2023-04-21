import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import Typography from '@/components/common/typography'
import { PersonQuery } from '@/models/tmdb/person'
import { useGetPersonQuery } from '@/redux/api/tmdb/peopleAPI'
import imageUrl from '@/utils/imageUrl'


const PeopleHeader = () => {
  const router = useRouter()
  const { id } = router.query

  const payload: PersonQuery = useMemo(() => ({  
    personId: Number(id)
  }), [id])

  const {data} = useGetPersonQuery({...payload}, {skip: !id})


  if(!data) return null


  return (
    <div className='rounded bg-black w-full flex text-white max-h-32 lg:max-h-60 h-full'>
      <div className='w-32 lg:w-44 shrink-0'>
        <div className='w-full h-full relative'>
          <Image
            priority
            className='rounded-l'
            layout='fill'
            objectFit='cover'
            src={imageUrl(data.profile_path || '')}
          />
        </div>
      </div>
      <div className='p-3 space-y-0 lg:space-y-3'>
        <h1 className='font-semibold text-2xl lg:text-4xl'>{data.name}</h1>
        <div className='line-clamp-3 lg:line-clamp-6'>
          <Typography variant='body' >{data.biography}</Typography>
        </div>
      </div>
    </div>
  )
}


export default PeopleHeader