import clsx from 'clsx';
import Link from 'next/link';
import React, { memo } from 'react';

import { NavItem } from '../../models/web/navigation';
import Typography from '../common/typography';

interface Props {
  item: NavItem;
  isNavigationOpen: boolean;
}

const NavigationItem = memo(({ item, isNavigationOpen }: Props) => (
  <li key={item.url}>
    <Link passHref href={item.url}>
      <a
        className='flex p-2 rounded hover:bg-gray-100 dark:hover:bg-tmrev-gray-dark items-center space-x-4 select-none'
        title={item.title}
      >
        <span className='material-icons'>{item.icon}</span>
        <Typography
          className={clsx(
            isNavigationOpen ? 'opacity-100 block' : 'opacity-0 hidden',
            'transition-all duration-300'
          )}
          variant='h5'
        >
          {item.title}
        </Typography>
      </a>
    </Link>
  </li>
));

export default NavigationItem;
