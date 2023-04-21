import { NextPage } from 'next'
import React from 'react'

import PeopleHeader from '@/components/page-components/people/header'
import PersonMedia from '@/components/page-components/people/media'
import PopularMovies from '@/components/page-components/people/popularMovies'

const PeopleDetail: NextPage = () => (
  <div className='mt-16 lg:mt-0 p-4 w-full space-y-10'>
    <PeopleHeader/>
    <PopularMovies/>
    <PersonMedia/>
  </div> 
)

export default PeopleDetail