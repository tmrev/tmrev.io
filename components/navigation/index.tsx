import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent, useEffect, useMemo, useRef, useState,
} from 'react';

import tmrevIco from '@/public/tmrlogo.svg';

import { NavItem } from '../../models/web/navigation';
import { useAuth } from '../../provider/authUserContext';
import Button from '../common/Button';
import Typography from '../common/typography';
import Profile from './profile';
import NavSearch from './search';

const hiddenRoutes = ['login', 'register'];

interface Props {

}

const Navigation: FunctionComponent<Props> = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const urlLinks: NavItem[] = useMemo(() => (
    [
      {
        auth: false,
        icon: 'newspaper',
        mobileOnly: false,
        title: 'News',
        url: '/news',
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
        url: user ? `/user/${user.uid}/list` : '/login',
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
      {
        auth: true,
        icon: 'logout',
        mobileOnly: false,
        title: "Logout",
        url: '/logout'
      }
      // {
      //   auth: false,
      //   icon: 'how_to_vote',
      //   title: 'Create Poll',
      //   url: '/poll',
      // },
    ]
  ), [user]);

  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [router]);

  const handleClickOutside = (e: MouseEvent) => {
    if (mobileRef.current && !mobileRef.current.contains(e.target as any)) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const isIncluded = useMemo(() => (
    hiddenRoutes.some((value) => router.pathname.includes(value))
  ), [router.pathname]);


  if (isIncluded) return null;

  const renderSideBar = () => (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          animate={{ x: 0 }}
          className="fixed shadow rounded bg-black z-40 right-0 top-0 bottom-0 w-1/2 text-white"
          exit={{ x: 500 }}
          initial={{ x: 100 }}
          transition={{ x: { type: 'tween' } }}
        >
          <div ref={mobileRef} className="p-4">
            <div className="flex items-center float-right">
              <Button
                variant="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span className="material-icons">
                                    close
                </span>
              </Button>
            </div>
            <ul className="mt-8 space-y-4">
              {urlLinks.map((link, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={i}>
                  <Link passHref href={link.url}>
                    <a
                      className={
                        clsx(
                          'flex p-2 rounded hover:bg-gray-100 items-center space-x-4 select-none',
                          'dark:hover:bg-tmrev-gray-dark',
                        )
                      }
                      title={link.title}
                    >
                      <span className="material-icons">
                        {link.icon}
                      </span>
                      <Typography variant="h5">{link.title}</Typography>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <AnimatePresence>
      <motion.nav
        animate={{ y: 0 }}
        exit={{ y: -500 }}
        initial={{ y: -100 }}
        transition={{ y: { type: 'tween' } }}
      >
        {/* Mobile Menu Button */}
        {renderSideBar()}
        <div
          className="flex items-center justify-between bg-black shadow w-full p-2 md:px-4  xl:px-6">
          <Link passHref href="/">
            <a className='flex items-center justify-center flex-shrink-0'>
              <Image
                height="25px"
                src={tmrevIco}
                width="50px"
              />
            </a>
          </Link>
          <NavSearch/>
          <ul className='flex items-center space-x-2'>
            <li>
              <Button
                variant="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <span className="material-icons">
                  menu
                </span>
              </Button>
            </li>
            <li className=' flex-shrink-0'>
              <Profile />
            </li>
          </ul>

        </div>
        <div className={`${mobileOpen ? "absolute min-w-full min-h-screen backdrop-blur-md z-10" : "hidden"}`} />
      </motion.nav>
    </AnimatePresence>

  );
};

export default Navigation;