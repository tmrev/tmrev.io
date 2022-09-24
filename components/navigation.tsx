import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent, useEffect, useMemo, useRef, useState,
} from 'react';

import { useAppDispatch, useAppSelector } from '../hooks';
import { useAuth } from '../provider/authUserContext';
import { setOpenNavigation } from '../redux/slice/navigationSlice';
import Button from './common/Button';
import Typography from './common/typography';
import Profile from './navigation/profile';

const hiddenRoutes = ['login', 'register'];

interface Props {
  children: React.ReactNode
}

const Navigation:FunctionComponent<Props> = ({ children }:Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
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
        url: '/',
      },
      {
        auth: true,
        icon: 'list',
        mobileOnly: false,
        title: 'Watch List',
        url: `/user/${user?.uid}/watch-list`,
      },
      {
        auth: true,
        icon: 'account_circle',
        mobileOnly: true,
        title: 'Profile',
        url: `/user/${user?.uid}/preview`,
      },
      // {
      //   auth: false,
      //   icon: 'how_to_vote',
      //   title: 'Create Poll',
      //   url: '/poll',
      // },
    ]
  ), [user]);

  const isNavigationOpen = useAppSelector((state) => state.navigation.navigationOpen);
  const dispatch = useAppDispatch();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [router]);

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
                <span className="material-icons">
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
    <div className="flex bg-black overflow-hidden">
      <AnimatePresence>
        <motion.nav
          animate={{ y: 0 }}
          className={clsx(
            'relative',
            'dark:text-white lg:h-screen  lg:relative transition-all duration-300',
            isNavigationOpen ? 'lg:w-80 lg:p-8' : 'lg:w-16 lg:p-2 lg:flex lg:flex-col lg:items-center',
          )}
          exit={{ y: -500 }}
          initial={{ y: -100 }}
          transition={{ y: { type: 'tween' } }}
        >
          {renderSideBar()}
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex bg-black fixed z-40 w-full p-2">
            <Button
              className=""
              variant="icon"
              onClick={() => setMobileOpen(true)}
            >
              <span className="material-icons">
                menu
              </span>
            </Button>
          </div>
          {/* Mobile Expand Button */}
          <Button
            className="hidden lg:flex mb-8 fixed"
            title={isNavigationOpen ? 'See Less' : 'See More'}
            variant="icon"
            onClick={() => dispatch(setOpenNavigation(!isNavigationOpen))}
          >
            <span className="material-icons -rotate-90">
              {isNavigationOpen ? 'expand_less' : 'expand_more'}
            </span>
          </Button>
          <ul className={clsx(
            'hidden lg:block space-y-4 fixed',
            isNavigationOpen ? 'top-36' : 'top-16',
          )}
          >
            {urlLinks.map((link) => {
              if ((link.auth && !user) || link.mobileOnly) return null;

              return (
                <li key={link.url}>
                  <Link passHref href={link.url}>
                    <a className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-tmrev-gray-dark items-center space-x-4 select-none" title={link.title}>
                      <span className="material-icons">
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
              );
            })}
          </ul>
          <Profile />
        </motion.nav>
      </AnimatePresence>
      <div className="w-full overflow-y-auto">
        {children}
      </div>
    </div>

  );
};

export default Navigation;
