import React from 'react';

import Spinner from './common/spinner';

export default function Loading() {
  return (
    <div className="text-black h-full w-full flex items-center justify-center">
      <Spinner />
    </div>

  );
}
