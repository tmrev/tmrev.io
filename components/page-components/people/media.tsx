import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import HeaderText from '@/components/common/typography/headerText'
import { PersonQuery } from '@/models/tmdb/person'
import { useGetPersonImagesQuery } from '@/redux/api/tmdb/peopleAPI'
import imageUrl from '@/utils/imageUrl'
import { parseMediaId } from '@/utils/mediaID'


const PersonMedia = () => {
  const router = useRouter()
  const { id } = router.query

  const payload: PersonQuery = useMemo(() => ({  
    personId: parseMediaId(id as string)
  }), [id])

  const { data } = useGetPersonImagesQuery(payload)
  
  if(!data || !data.profiles.length) return null

  return (
    <section className='space-y-3'>
      <HeaderText>Media</HeaderText>
      <div className="grid grid-rows-1 grid-flow-col gap-3 overflow-x-auto pb-3">
        {data.profiles.map((image) => (
          <div key={image.file_path} className="aspect-[2/3] w-[150px] lg:w-[185px] relative rounded">
            <Image
              priority
              alt={`${image.file_path} poster`}
              className="rounded"
              layout="fill"
              objectFit="contain"
              src={imageUrl(image.file_path || '', 300, true)}
            />
          </div>
        ))}
      </div>
      <button 
        className='w-full border border-tmrev-alt-yellow text-tmrev-alt-yellow p-2 rounded uppercase' 
        type='button'>Photos
      </button>
    </section>
  )
}


export default PersonMedia