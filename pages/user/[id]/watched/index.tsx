import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import Spinner from '../../../../components/common/spinner';
import QuickProfile from '../../../../components/page-components/user/quickProfile';
import useProfile from '../../../../hooks/userProfile';
import { useGetWatchedQuery } from '../../../../redux/api';
import imageUrl from '../../../../utils/imageUrl';
import { createMediaUrl } from '../../../../utils/mediaID';

const Watched:FunctionComponent = () => {
  const { userId } = useProfile();
  const { data } = useGetWatchedQuery(userId, { skip: !userId });

  return (
    <div className="my-16 px-0 lg:my-0 text-white">
      <QuickProfile />
      {!data
        ? (
          <div className="flex w-full justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {
              data.body.map((value) => (
                <Link key={value._id} passHref href={`/movie/${createMediaUrl(value.tmdbID, value.title)}`}>
                  <a className="flex justify-center items-center">
                    <div className={clsx(
                      'bg-white relative aspect-[2/3] w-[250px] h-[400px]  rounded',
                      'lg:w-[300px] lg:h-[500px]',
                    )}
                    >
                      <Image
                        className="rounded"
                        layout="fill"
                        objectFit="cover"
                        src={imageUrl(value.posterPath || '', 500)}
                      />
                    </div>
                  </a>
                </Link>
              ))
            }
          </div>

        )}
    </div>
  );
};

export default Watched;
