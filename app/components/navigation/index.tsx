import React from 'react';

import NavMenu from './navList';

export default function Navigation({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row h-full w-full">
      <NavMenu />
      <div className="p-4 lg:p-8 w-full h-full">
        {children}
      </div>
    </div>
  );
}
