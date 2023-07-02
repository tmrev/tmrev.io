import clsx from 'clsx'
import React from 'react'

import Chip from '@/components/chip'
import { useGetMovieGenreListQuery } from '@/redux/api/tmdb/movieAPI'

interface Props {
  selectedGenres: Record<number, string> | undefined
  setSelectedGenres: React.Dispatch<React.SetStateAction<Record<number, string> | undefined>>
}

const GenreFilter: React.FC<Props> = ({
  selectedGenres,
  setSelectedGenres
}: Props) => {
  const { data: genreData } = useGetMovieGenreListQuery({})

  const handleAddGenre = (name: string, id: number) => {
    const newGenres = {
      ...selectedGenres,
      [id]: name
    }

    setSelectedGenres(newGenres)
  } 

  const handleRemoveGenre = (id: number) => {
    const newGenres = {
      ...selectedGenres,
    }

    delete newGenres[id]

    setSelectedGenres(newGenres)
  }

  const handleGenre = (name: string, id: number) => {
    if(selectedGenres && selectedGenres[id]) {
      handleRemoveGenre(id)
    } else {
      handleAddGenre(name, id)
    }
  }


  return (
    <div className="space-y-3">
      <label className="text-white" htmlFor="watch-providers">Genres</label>
      <div className="flex flex-wrap -m-1 text-white" id="watch-providers">
        {genreData?.genres.map(({id, name}) => (
          <Chip
            key={id} 
            className={
              clsx(
                'm-1',  
                selectedGenres && selectedGenres[id] && 'bg-tmrev-alt-yellow text-black')
            }
            onClick={() => handleGenre(name, id)} 
          >
            {name}
          </Chip>
        ))}
      </div>
    </div>
  )
}

export default GenreFilter