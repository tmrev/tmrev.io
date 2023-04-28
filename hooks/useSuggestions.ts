import { useEffect, useState } from "react";

import { Topic } from "@/constants/search";
import { MovieGeneral } from "@/models/tmdb/movie/tmdbMovie";
import { PeopleGeneral } from "@/models/tmdb/person";
import { useFindMoviesQuery, useFindPeopleQuery } from "@/redux/api/tmdb/searchAPI";

const years: string[] = Array.from({ length: 124 }, (_, i) => (1900 + i).toString());

function findClosestYears(searchStr: string): string[] {

  const sortedYears = years.filter((year) => year.includes(searchStr))
  const closestYears = sortedYears.reverse().slice(0, 5);
  return closestYears;
}


function useSuggestion(value: string, topic?: Topic) {
  const [suggestYears, setSuggestYears] = useState<string[]>([])
  const [suggestMovies, setSuggestMovies] = useState<MovieGeneral[]>([])
  const [suggestPeople, setSuggestPeople] = useState<PeopleGeneral[]>([])

  const { data: peopleData }
    = useFindPeopleQuery({ query: value }, { skip: !value || topic !== Topic.PEOPLE })
  const { data: movieData }
    = useFindMoviesQuery({ query: value }, { skip: !value || topic !== Topic.MOVIE })


  useEffect(() => {
    if (topic !== Topic.YEAR) return

    const numbers = findClosestYears(value)

    if (numbers) {
      setSuggestYears(numbers)
    }

  }, [topic, value])

  useEffect(() => {
    if (!movieData || topic !== Topic.MOVIE) return

    setSuggestMovies(movieData.results)
  }, [topic, value])

  useEffect(() => {
    if (!peopleData || topic !== Topic.PEOPLE) return

    setSuggestPeople(peopleData.results)
  }, [topic, value])


  return {
    suggestMovies,
    suggestPeople,
    suggestYears
  }

}

export default useSuggestion