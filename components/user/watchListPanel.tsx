import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { WatchList } from '../../models/tmrev';

interface Props {
  watchlist: WatchList
}

const WatchListPanel: FunctionComponent<Props> = ({ watchlist }:Props) => (
  <Link passHref href={`/user/${watchlist.userId}/watch-list/${watchlist._id}`}>
    <a>
      <div className="flex flex-col items-center justify-center bg-black hover:bg-tmrev-gray-dark p-4 rounded">
        <div className="aspect-[2/3] h-[200px] w-[150px] relative rounded">
          <Image
            alt={`${watchlist.title} watchlist`}
            className="rounded"
            layout="fill"
            objectFit="contain"
            src={`https://avatars.dicebear.com/api/identicon/${watchlist._id}.svg`}
          />

        </div>
        <h3
          className="w-max font-semibold text-lg text-white p-1 whitespace-pre-wrap rounded"
        >
          {watchlist.title}
        </h3>
      </div>
    </a>
  </Link>

);

export default WatchListPanel;
