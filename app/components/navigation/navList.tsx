'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { useAuth } from '../../../provider/authUserContext';
import NavItems from './navItems';
import NavProfile from './profile';

const hiddenRoutes = ['login', 'register'];

export default function NavMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  const isIncluded = useMemo(() => (
    hiddenRoutes.some((value) => pathname.includes(value))
  ), [pathname]);

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

  if (isIncluded) return null;

  return (
    <div
      className={
        clsx(
          'bg-black p-4  lg:h-full flex flex-col lg:space-y-10',
          !open && 'w-full',
        )
      }
    >
      {/* Desktop Navigation */}
      <div className="hidden lg:block space-y-8">
        <button
          className="text-left"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="material-icons -rotate-90">
            {open ? 'expand_less' : 'expand_more'}
          </span>
        </button>
        {open && (
          <div className="relative flex items-center justify-center">
            <Image
              alt="tmrev"
              height={150}
              src="/images/icons/tmrev/tmrev-icon.svg"
              width={150}
            />
          </div>
        )}
        <ul className="space-y-3 w-full relative h-full">
          <NavItems
            mobile={false}
            open={open}
            setOpen={setOpen}
          />
        </ul>
        <div className="absolute bottom-4 left-2">
          <NavProfile open={open} user={user} />
        </div>
      </div>
      {/* Mobile Navigation Closed */}
      <div className="flex lg:hidden">
        <button
          className="flex items-center justify-center"
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-icons">
            menu
          </span>
        </button>
      </div>
      <div className="lg:hidden block">
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={ref}
              animate={{ x: 0 }}
              className={
                clsx(
                  'bg-black fixed z-50 top-0 bottom-0 left-0 w-1/2',
                  'p-4',
                )
              }
              exit={{ x: -500 }}
              initial={{ x: -100 }}
              transition={{ x: { duration: 0.3 } }}
            >
              <ul className="space-y-5">
                <NavItems
                  mobile
                  open={mobileOpen}
                  setOpen={setMobileOpen}
                />
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
