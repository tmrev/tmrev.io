'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { useAuth } from '../../../provider/authUserContext';

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  mobile: boolean
}

export default function NavItems({ open, setOpen, mobile }: Props) {
  const { user } = useAuth();

  const urlLinks = useMemo(() => (
    [
      {
        auth: false,
        icon: 'search',
        mobileOnly: false,
        title: 'Search',
        url: '/search',
      },
      {
        auth: false,
        icon: 'movie',
        mobileOnly: false,
        title: 'Movies',
        url: '/movies',
      },
      // {
      //   auth: false,
      //   icon: 'tv',
      //   title: 'TV shows',
      //   url: '/tv',
      // },
      // {
      //   auth: false,
      //   icon: 'person',
      //   title: 'People',
      //   url: '/people',
      // },
      {
        auth: false,
        icon: 'trending_up',
        mobileOnly: false,
        title: 'Trending',
        url: '/trending',
      },
      {
        auth: false,
        icon: 'list',
        mobileOnly: false,
        title: 'Watch List',
        url: user ? `/user/${user.uid}/watch-list` : '/login',
      },
      {
        auth: false,
        icon: 'publish',
        mobileOnly: false,
        title: 'Import',
        url: user ? '/import' : '/login',
      },
      {
        auth: false,
        icon: 'account_circle',
        mobileOnly: true,
        title: 'Profile',
        url: user ? `/user/${user.uid}/preview` : '/login',
      },
      // {
      //   auth: false,
      //   icon: 'how_to_vote',
      //   title: 'Create Poll',
      //   url: '/poll',
      // },
    ]
  ), [user]);

  return (
    <>
      <button
        className="lg:hidden flex items-center justify-start"
        type="button"
        onClick={() => setOpen(false)}
      >
        <span className="material-icons">
          close
        </span>
      </button>
      {urlLinks.map((item) => {
        if (item.mobileOnly && !mobile) return null;

        return (
          <li
            key={item.title}
            className={
              clsx(
                'flex items-center hover:bg-tmrev-gray-dark space-x-3 rounded p-1',
                !open && 'justify-center',
              )
            }
          >
            <span className="material-icons">
              {item.icon}
            </span>
            {open && (
              <Link
                href={item.url}
              >
                <p className="text-lg font-semibold">
                  {item.title}
                </p>
              </Link>
            )}
          </li>
        );
      })}
    </>
  );
}
