import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {array, number, object,string} from 'yup';

import OutlineButton from "@/components/button/outline";
import MetaTags from "@/components/common/MetaTag";
import GenreFilter from "@/components/page-components/discover/filters/genres";
import PeopleFilter from "@/components/page-components/discover/filters/people";
import ProviderFilter from "@/components/page-components/discover/filters/providers";
import MoviePoster, { LocationPath } from "@/components/poster";
import ISO3166_1 from "@/models/tmdb/ISO3166-1";
import { IMovieDiscoverQuery } from "@/models/tmdb/movie/movieDiscover";
import { MovieGeneral } from "@/models/tmdb/movie/tmdbMovie";
import { useGetMovieDiscoverQuery } from "@/redux/api/tmdb/movieAPI";
import { uniqueArray } from "@/utils/common";

const schema = object().shape({
  "genres": array(number()).optional().nullable(),
  "people": array(number()).optional().nullable(),
  "release_date.gte": string().optional().nullable(),
  "release_date.lte": string().optional().nullable(),
  "watch_providers": array(number()).optional().nullable()
});

interface DefaultValues {
  release_date: {
    gte: string | null,
    lte: string | null
  },
  watch_providers: number[] | null
  genres: number[] | null
  people: number[] | null
}

const defaultValues: DefaultValues = {
  genres: null,
  people: null,
  release_date: {
    gte: null,
    lte: null
  },
  watch_providers: null
}

export type Selected = Record<number, string>

const Discover: NextPage = () => {
  const { 
    register,
    handleSubmit,
    setValue
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })
  const [results, setResults] = useState<MovieGeneral[]>([])
  const [payload, setPayload] = useState<IMovieDiscoverQuery>()
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>()
  const [totalResults, setTotalResults] = useState<number>()


  const [selectedProviders, setSelectedProviders] = useState<Selected>()
  const [selectedGenres, setSelectedGenres] = useState<Selected>()
  const [selectedPeople, setSelectedPeople] = useState<Selected>()

  const { data: discoverData } = useGetMovieDiscoverQuery({params: {...payload?.params, page}}, {skip: !payload})

  useEffect(() => {
    if(discoverData) {
      setResults((prevState) => uniqueArray([...prevState, ...discoverData.results], 'id'))
    }
  }, [discoverData])

  useEffect(() => {
    setTotalPages(discoverData?.total_pages)
    setTotalResults(discoverData?.total_results)
  }, [discoverData])

  const handleApplyFilters = (data: DefaultValues) => {
    setResults([])
    const newPayload: IMovieDiscoverQuery = {
      params: {
        page: 1,
        'primary_release_date.gte': data.release_date.gte ?? undefined,
        "primary_release_date.lte": data.release_date.lte ?? undefined,
        "release_date.gte": data.release_date.gte ?? undefined,
        "release_date.lte": data.release_date.lte ?? undefined,
        watch_region: data.watch_providers ? ISO3166_1.UNITED_STATES : undefined,
        with_genres: data.genres?.join(',') ?? undefined,
        with_people: data.people?.join(',') ?? undefined,
        with_watch_providers: data.watch_providers?.join('|') ?? undefined
      }
    }

    setPage(1)
    setPayload(newPayload)
  }

  useEffect(() => {
    if(selectedProviders) {
      const newArray = Object.keys(selectedProviders).map((v) => +v)
      setValue('watch_providers', newArray)
    } else {
      setValue('watch_providers', null)
    }
  }, [selectedProviders])

  useEffect(() => {
    if(selectedGenres){
      const newArray = Object.keys(selectedGenres).map((v) => +v)
      setValue('genres', newArray)
    } else {
      setValue('genres', null)
    }
  }, [selectedGenres])

  useEffect(() => {
    if(selectedPeople) {
      const newArray = Object.keys(selectedPeople).map((v) => +v)
      setValue('people', newArray)
    } else {
      setValue('people', null)
    }
  }, [selectedPeople])




  return (
    <div className="p-2 lg:p-4 space-y-3">
      <MetaTags
        description="Use detailed filter to find your perfect movie."
        title="Discover Movies"
        url="https://tmrev.io/discover"
      />
      <h1 className="text-white text-4xl font-semibold" >Discover</h1>
      <form 
        className="flex flex-col space-y-3" 
        onSubmit={handleSubmit(handleApplyFilters)}
      >
        <label className="text-white" htmlFor="release-date">Release Dates</label>
        <div className="flex space-x-3" id="release-date">
          <input className="w-full p-2 rounded bg-black text-white"  placeholder="Greater than" type="date" {...register('release_date.gte')} />
          <input className="w-full p-2 rounded bg-black text-white" placeholder="Less than" type="date" {...register('release_date.lte')} />
        </div>

        <PeopleFilter selectedPeople={selectedPeople} setSelectedPeople={setSelectedPeople} />
        <ProviderFilter selectedProviders={selectedProviders} setSelectedProviders={setSelectedProviders} />
        <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />

        <div className="my-3 flex w-full justify-center">
          <OutlineButton className="max-w-4xl" type="submit" >apply</OutlineButton>
        </div>
      </form>
      {results.length ? (
        <div className="space-y-3" >
          <span className="text-white" >Viewing {results.length} out of {totalResults} results</span>
          <div className="flex justify-center flex-wrap -m-1">
            {results.map((movie) => (
              <MoviePoster
                key={movie.id}
                className="m-1"
                imgUrl={movie.poster_path}
                location={LocationPath.MOVIE}
                movieId={movie.id}
                name={movie.title}
                title={movie.title}
              
              />
            ))}
            {page < totalPages! && (
              <OutlineButton className="max-w-4xl my-3" onClick={() => setPage(page + 1)} >View More</OutlineButton>
            )}
          </div>
        </div>
      ): (
        <div className="text-white text-lg py-3 text-center" >
          <span>No Results 😔</span>
        </div>
      )}
    </div>
  )
}


export default Discover