import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent, useEffect, useMemo, useRef, useState,
} from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { setOpenNavigation } from '../redux/slice/navigationSlice';
import Button from './common/Button';
import Typography from './common/typography';

const urlLinks = [
  {
    auth: false,
    icon: 'movie',
    title: 'Movies',
    url: '/movies',
  },
  {
    auth: false,
    icon: 'tv',
    title: 'TV shows',
    url: '/tv',
  },
  {
    auth: false,
    icon: 'person',
    title: 'People',
    url: '/people',
  },
  {
    auth: false,
    icon: 'trending_up',
    title: 'Trending',
    url: '/trending',
  },
  {
    auth: true,
    icon: 'list',
    title: 'Watch List',
    url: '/watch-list',
  },
  {
    auth: false,
    icon: 'how_to_vote',
    title: 'Create Poll',
    url: '/poll',
  },
];

const hiddenRoutes = ['login', 'register'];

interface Props {
  children: React.ReactNode
}

const Navigation:FunctionComponent<Props> = ({ children }:Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const isNavigationOpen = useAppSelector((state) => state.navigation.navigationOpen);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as any)) {
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

  if (isIncluded) return children as any;

  const renderSideBar = () => (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          ref={ref}
          animate={{ x: 0 }}
          className="fixed shadow rounded bg-white dark:bg-black z-50 left-0 top-0 bottom-0 w-3/4"
          exit={{ x: -500 }}
          initial={{ x: -100 }}
          transition={{ x: { type: 'tween' } }}
        >
          <div className="p-4">
            <div className="flex items-center">
              <Button
                variant="icon"
                onClick={() => setMobileOpen(false)}
              >
                <span className="material-symbols-outlined">
                  close
                </span>
              </Button>
            </div>
            <ul className="mt-8 space-y-4">
              {urlLinks.map((link) => (
                <li key={link.url}>
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
                      <span className="material-symbols-outlined">
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
    <div className="flex bg-white dark:bg-black">
      <AnimatePresence>
        <motion.nav
          animate={{ y: 0 }}
          className={clsx(
            'fixed z-50 top-0 bottom-0 p-2 left-0 right-0 w-full',
            ' dark:text-white lg:h-screen  lg:relative transition-all duration-300',
            isNavigationOpen ? 'lg:w-80 lg:p-8' : 'lg:w-16 lg:p-2 lg:flex lg:flex-col lg:items-center',
          )}
          exit={{ y: -500 }}
          initial={{ y: -100 }}
          transition={{ y: { type: 'tween' } }}
        >
          {renderSideBar()}
          {/* Mobile Menu Button */}
          <Button
            className="lg:hidden flex"
            variant="icon"
            onClick={() => setMobileOpen(true)}
          >
            <span className="material-symbols-outlined">
              menu
            </span>
          </Button>
          {/* Mobile Expand Button */}
          <Button
            className="hidden lg:flex mb-8 fixed"
            title={isNavigationOpen ? 'See Less' : 'See More'}
            variant="icon"
            onClick={() => dispatch(setOpenNavigation(!isNavigationOpen))}
          >
            <span className="material-symbols-outlined -rotate-90">
              {isNavigationOpen ? 'expand_less' : 'expand_more'}
            </span>
          </Button>
          <ul className={clsx(
            'hidden lg:block space-y-4 fixed',
            isNavigationOpen ? 'top-36' : 'top-16',
          )}
          >
            {urlLinks.map((link) => (
              <li key={link.url}>
                <Link passHref href={link.url}>
                  <a className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-tmrev-gray-dark items-center space-x-4 select-none" title={link.title}>
                    <span className="material-symbols-outlined">
                      {link.icon}
                    </span>
                    <Typography
                      className={clsx(
                        isNavigationOpen ? 'opacity-100 block' : 'opacity-0 hidden',
                        'transition-all duration-300',
                      )}
                      variant="h5"
                    >
                      {link.title}
                    </Typography>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <div className={clsx(
            'hidden lg:flex fixed items-center space-x-4 transition-all duration-300',
            isNavigationOpen ? 'bottom-4 left-8' : 'bottom-4 left-2',
          )}
          >
            <Image className="rounded-full dark:bg-white" height={45} src="https://avatars.dicebear.com/api/identicon/kegen.svg" width={45} />
            {isNavigationOpen && <Typography variant="h6">Kegen Guyll</Typography>}
          </div>
        </motion.nav>
      </AnimatePresence>
      {children}
    </div>

  );
};

export default Navigation;
