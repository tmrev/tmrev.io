import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, {
  FunctionComponent, useEffect, useRef, useState,
} from 'react';

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

interface Props {
  children: React.ReactNode
}

const Navigation:FunctionComponent<Props> = ({ children }:Props) => {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            desktopOpen ? 'lg:w-80 lg:p-8' : 'lg:w-16 lg:p-2 lg:flex lg:flex-col lg:items-center',
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
            title={desktopOpen ? 'See Less' : 'See More'}
            variant="icon"
            onClick={() => setDesktopOpen(!desktopOpen)}
          >
            <span className="material-symbols-outlined -rotate-90">
              {desktopOpen ? 'expand_less' : 'expand_more'}
            </span>
          </Button>
          <ul className={clsx(
            'hidden lg:block space-y-4 fixed',
            desktopOpen ? 'top-36' : 'top-16',
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
                        desktopOpen ? 'opacity-100 block' : 'opacity-0 hidden',
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
            desktopOpen ? 'bottom-4 left-8' : 'bottom-4 left-2',
          )}
          >
            <Image className="rounded-full dark:bg-white" height={45} src="https://avatars.dicebear.com/api/identicon/kegen.svg" width={45} />
            {desktopOpen && <Typography variant="h6">Kegen Guyll</Typography>}
          </div>
        </motion.nav>
      </AnimatePresence>
      {children}
    </div>

  );
};

export default Navigation;
