import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {
  FunctionComponent, useEffect, useMemo, useRef, useState,
} from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { NavItem } from '../../models/web/navigation';
import { useAuth } from '../../provider/authUserContext';
import { setOpenNavigation } from '../../redux/slice/navigationSlice';
import Button from '../common/Button';
import Typography from '../common/typography';
import NavigationItem from './navItem';
import Profile from './profile';
import tmrevIco from '../../public/android-chrome-192x192.png';

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

  if (isIncluded) return null;

  const renderSideBar = () => (
    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          animate={{ x: 0 }}
          className="fixed shadow rounded bg-white dark:bg-black z-30 left-0 top-0 bottom-0 w-3/4"
          exit={{ x: -500 }}
          initial={{ x: -100 }}
          transition={{ x: { type: 'tween' } }}
        >
          <div className="p-4">
            <div className="flex items-center">
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
    <nav className="bg-black">

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
          <div
            ref={ref}
            className="lg:hidden flex justify-between bg-black fixed z-40 w-full p-1">
            <Link href="/">
              <Image
                src={tmrevIco}
                width="50px"
                height="25px"
              />
            </Link>
            <Button
              className=""
              variant="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="material-icons">
                {mobileOpen ? "close" : "menu"}
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
              if (link.mobileOnly || !link.title) return null;

              return (
                <NavigationItem
                  key={link.icon}
                  isNavigationOpen={isNavigationOpen}
                  item={link}
                />
              );
            })}
          </ul>
          <Profile />
        </motion.nav>
      </AnimatePresence>
    </nav>

  );
};

export default Navigation;