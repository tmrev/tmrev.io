import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import HeaderText from '@/components/common/typography/headerText';

const Import: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/import/imdb');
  }, []);

  return (
    <>
      <Head>
        <title>Import Movie Data</title>
        <meta
          content="Easily upload all of your list, ratings and watchlist from your favorite movie sites."
          name="description"
        />
      </Head>
      <div className="lg:h-full h-screen text-center w-full flex justify-center items-center">
        <Link passHref href="/import/imdb">
          <a className="bg-tmrev-gray-dark p-4 rounded w-1/2 h-1/2 flex flex-col space-y-6 items-center justify-center">
            <HeaderText>import imdb files</HeaderText>
            <div className="relative h-16 w-16 md:w-32">
              <Image
                alt="IMDB"
                layout="fill"
                objectFit="contain"
                src="/images/icons/imdb/imdb-icon.svg"
              />
            </div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Import;
