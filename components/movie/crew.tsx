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
    <div className="flex items-center space-x-3 py-2">
      <p>{`${title}: `}</p>
      {cast.map((castMember) => (
        <Link key={castMember.id} passHref href="/">
          <a className="text-white hover:underline">{castMember.original_name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Crew;
