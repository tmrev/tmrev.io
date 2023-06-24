import Link from 'next/link';
import React, { memo } from 'react';

import { NavItem } from '../../models/web/navigation';

interface Props {
  item: NavItem;
}

const NavigationItem = memo(({ item }: Props) => (
  <li key={item.url}>
    <Link
      passHref
      className="flex p-2 rounded hover:bg-tmrev-gray-dark items-center select-none"
      href={item.url} title={item.title}>
      <span className="material-icons">{item.icon}</span>
    </Link>
  </li>
));

export default NavigationItem;
