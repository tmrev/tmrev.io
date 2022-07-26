import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { Cast } from '../../models/tmdb';

interface Props {
  title: string
  cast: Cast[]
}

const Crew:FunctionComponent<Props> = ({ title, cast }: Props) => {
  if (!cast.length) return null;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-3 py-2 ml-3">
      <span className="w-max">{`${title}: `}</span>
      <div className="flex flex-col md:flex-row">
        {cast.map((castMember) => (
          <Link key={castMember.id} passHref href="/">
            <a className="text-white hover:underline mr-3">{castMember.original_name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Crew;
