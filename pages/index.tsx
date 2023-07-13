import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import MetaTags from '@/components/common/MetaTag';
import IntroHeader from '@/components/intro-header';
import WelcomeSection from '@/components/page-components/home/welcome';
import HorizontalSkeleton from '@/components/skeleton/horizontalSkeleton';
import { useAuth } from '@/provider/authUserContext';


const JustReviewedMovies = dynamic(() => import("@/components/page-components/home/justReviewed"), {
  loading: () => (
    <HorizontalSkeleton skeletonHeight={115} skeletonWidth={173}/>
  )
})

const MostReviewedMovies = dynamic(() => import("@/components/page-components/home/mostReviewed"), {
  loading: () => (
    <HorizontalSkeleton skeletonHeight={115} skeletonWidth={173}/>
  )
})

const WeekendReleases = dynamic(() => import("@/components/page-components/home/weekReleases"), {
  loading: () => (
    <HorizontalSkeleton skeletonHeight={115} skeletonWidth={173}/>
  )
})


const Home: NextPage = () => {
  const router = useRouter();
  const { user, tmrevUser } = useAuth()

  const Feed = dynamic(() => import("@/components/page-components/home/feed"))



  useEffect(() => {
    router.prefetch('/register');

  }, []);

  return (
    <div className="pb-6">
      <MetaTags
        description="An in-depth analysis of the latest movies, movies you would like to see, or movies that simply blew you away."
        title="The Movie Review"
      />
      <div className='flex flex-col'>
        <IntroHeader/>
        {!user ? (
          <div className="flex items-center justify-center w-full mt-5 ">
            <Link passHref className="bg-tmrev-alt-yellow uppercase py-2 px-10 rounded" href="/register">
              <p className=" font-semibold text-lg ">Start Reviewing</p>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-5 relative ">
            <Link passHref className="bg-tmrev-alt-yellow uppercase py-2 px-10 rounded" href="/discover">
              <p className=" font-semibold text-lg ">Find something new</p>
            </Link>
            <div className=' p-1 absolute -top-2 right-8 bg-tmrev-alt-red rounded text-white font-bold'>
              NEW
            </div>
          </div>
        )}
      </div>
      <div className="space-y-24 mt-16 px-4">
        {user && tmrevUser && (
          <Feed accountId={tmrevUser._id} />
        )}
        <WeekendReleases/>
        <MostReviewedMovies/>
        <JustReviewedMovies/>
        <WelcomeSection/>
      </div>
    </div>
  );
};
export default Home;