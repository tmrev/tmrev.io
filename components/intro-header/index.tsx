import Image from 'next/image'
import React, { FC, useMemo } from 'react'

import { SortBy } from '@/models/tmdb/movie/movieDiscover'
import { useGetMovieDiscoverQuery } from '@/redux/api/tmdb/movieAPI'
import getThursdayAndNextSunday from '@/utils/date/weekendReleaseDays'
import imageUrl from '@/utils/imageUrl'

interface Props {}

const IntroHeader: FC<Props> = () => {
  // const {data: popularMovies} = useGetPopularMoviesQuery({params: {page: 1}});
  // const { windowWidth } = useWindowWidth()
  const dates = getThursdayAndNextSunday()

  const {data: popularMovies} = useGetMovieDiscoverQuery({params: {
    include_adult: false,
    language: 'en-US',
    page: 1,
    region: 'US',
    "release_date.gte": dates.thursday,
    "release_date.lte": dates.sunday,
    sort_by: SortBy.MOST_POPULAR,
    with_release_type: '3|2'
  }})



  const firstMovie = useMemo(() => {
    if(!popularMovies) return null

    return popularMovies.results[0]
  }, [popularMovies])

  // const {data: movieVideos } = useGetMovieVideosQuery(
  //   {movie_id: firstMovie?.id ?? 0, params: {}}, 
  //   {skip: !firstMovie?.id}
  // )

  // const trailers = useMemo(() => {
  //   if(!movieVideos) return null

  //   const filteredTrailers = movieVideos.results.filter((value) => value.type === MovieVideoType.TRAILER);

  //   if(filteredTrailers.length) {
  //     return filteredTrailers[0]
  //   }

  //   return null

  // }, [movieVideos])


  // const handleOnReady = (event: YouTubeEvent<any>) => {
  //   event.target.playVideo()
  // }

  // const opts: YouTubeProps['opts'] = {
  //   height: '100px',
  //   playerVars: {
    
  //     autoplay: 1,
  //     // https://developers.google.com/youtube/player_parameters
  //     enablejsapi: 1,
  //     loop: 0,
  //     modestbranding: 1
  //   },
  //   width: '100px',
  // };

  if(!firstMovie) return null

  // if(windowWidth > 765) {
  //   return (
  //     <motion.div 
  //       animate={{ aspectRatio: "16 / 9", height: '600px' }}
  //       className={clsx("w-full relative bg-tmrev-gray-dark ")}
  //       initial={{ height: '500px' }}
  //       transition={{ delay: 0.75, duration: 0.75 }} // Fade out after 1 second
  //     >
  //       <motion.div
  //         animate={{ opacity: 0 }}
  //         initial={{ opacity: 1 }}
  //         transition={{ delay: 1, duration: 1 }} // Fade out after 1 second
  //       >
  //         <Image
  //           alt={`${firstMovie.title} backdrop`}
  //           className="opacity-30"
  //           layout="fill"
  //           objectFit="cover"
  //           src={imageUrl(firstMovie.backdrop_path || NoImage)}
  //         />
  //       </motion.div>
  //       <motion.div
  //         animate={{ opacity: 1 }}
  //         className='h-full w-full relative max-h-[600px]'
  //         initial={{ opacity: 0 }}
  //         transition={{ delay: 1.5, duration: 1.25 }} // Fade in after 1 second
  //       >
  //         {trailers && (
  //           <Youtube 
  //             className='relative aspect-video h-full max-h-[600px] w-full' 
  //             iframeClassName=' absolute top-0 left-0 w-full h-full' 
  //             opts={opts} 
  //             videoId={trailers.key}
  //             onReady={handleOnReady}
  //           /> 
    
  //         )}
  //       </motion.div>
  //       <div className="absolute top-0 pointer-events-none left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-blacker h-[101%] w-full" />
  //     </motion.div>
  //   )
  // }

  return (
    <div className="w-full relative bg-tmrev-gray-dark h-[400px] md:h-[500px]">
      <Image
        fill
        priority
        alt={`${firstMovie.title} backdrop`}
        className="opacity-30 object-cover"
        src={imageUrl(firstMovie.backdrop_path || 'generic alt')}
      />
      <div className="absolute top-0 pointer-events-none left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-blacker h-[101%] w-full" />
    </div>

  )
}


export default IntroHeader