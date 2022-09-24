import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useEffect, useMemo } from 'react';

const paths = [
  {
    disabled: false,
    name: 'preview',
    path: 'preview',
  },
  {
    disabled: true,
    name: 'watched',
    path: 'watched',
  },
  {
    disabled: false,
    name: 'Reviews',
    path: 'reviews',
  },
  // {
  //   disabled: true,
  //   name: 'Likes',
  //   path: 'likes',
  // },
  {
    disabled: true,
    name: 'WatchList',
    path: 'watch-list',
  },
];

const headerLink = (text: string, active: boolean, disabled: boolean) => (

  <p className={
    clsx(
      'text-tmrev-alt-yellow opacity-50 font-bold tracking-widest text-xl md:text-2xl uppercase',
      'hover:opacity-100',
      active && '!opacity-100',
      disabled && 'cursor-not-allowed pointer-events-none',
    )
  }
  >
    {text}
  </p>

);

const UserNavigation:FunctionComponent = () => {
  const router = useRouter();

  const id = useMemo(() => {
    if (router.query.id && typeof router.query.id === 'string') return router.query.id;

    return null;
  }, [router.query]);

  useEffect(() => {
    paths.forEach((value) => {
      router.prefetch(`/user/${id}/${value.path}`);
    });
  }, []);

  return (
    <div className={clsx(
      'flex flex-col w-full justify-start px-8 py-8 space-y-4',
      'lg:space-y-0 lg:flex-row lg:py-16 lg:space-x-10 xl:space-x-16',
    )}
    >
      {
        paths.map((path) => (
          <Link key={path.path} passHref href={`/user/${id}/${path.path}`}>
            <a>
              {headerLink(path.name, router.asPath.includes(path.path), path.disabled)}
            </a>
          </Link>
        ))
      }
    </div>
  );
};

export default UserNavigation;
