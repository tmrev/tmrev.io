import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import HeaderText from '../components/common/typography/headerText';
import InformationCard from '../components/page-components/home/informationCard';
import homepageData from '../data/homepageData.json';
import imageUrl from '../utils/imageUrl';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/register');
  }, []);

  return (
    <div className="px-4 lg:px-10 py-6">
      <div className="w-full relative bg-tmrev-gray-dark h-96 rounded">
        <Image
          className="rounded z-10"
          layout="fill"
          objectFit="cover"
          src={imageUrl(homepageData.backdrop_path)}
        />
        <div className=" absolute text-white z-20 w-full bottom-0 left-0 right-0 m-auto flex flex-col items-center justify-center space-y-2">
          <h1 className="font-bold text-3xl lg:text-6xl text-center">“ EVERYONE&apos;S A CRITIC ”</h1>
          <p className="font-light">- TheMovieReview</p>
        </div>
      </div>

      <div className="">
        <div className="flex items-center justify-center w-full mt-8">
          <Link passHref href="/register">
            <a className="bg-tmrev-alt-yellow uppercase py-2 px-10 rounded hover:bg-opacity-90">
              <p className=" font-semibold text-lg ">Get Started</p>
            </a>
          </Link>
        </div>
        <div className="mt-36">
          <HeaderText>What we do</HeaderText>
          <div className="grid grid-cols-1  md:grid-cols-2 gap-4 mt-8">
            <InformationCard
              description="In a world driven by data,
            it seems like movie reviews have been left behind..."
              href="/welcome#review"
              icon="reviews"
              title="Unique Review System"
            />
            <InformationCard
              description="View in depth movie data on beautiful charts and graphs."
              href="/welcome#data-visualization"
              icon="analytics"
              title="Data Visualization"

            />
            <InformationCard
              description="Create your own personal list and share it with your friends."
              href="/welcome#list"
              icon="list"
              title="Lists"
            />
            <InformationCard
              description="Keep a list of every movie you&lsquo;ve seen to date."
              href="/welcome#watched"
              icon="visibility"
              title="Watched"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
