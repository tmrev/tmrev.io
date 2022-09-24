import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';

import { useAppSelector } from '../../hooks';
import { useAuth } from '../../provider/authUserContext';
import { extractNameFromEmail, renderImageSrc } from '../../utils/common';
import Typography from '../common/typography';

const Profile: FunctionComponent = () => {
  const { user } = useAuth();
  const isNavigationOpen = useAppSelector((state) => state.navigation.navigationOpen);

  if (!user) return null;

  return (
    <Link passHref href={`/user/${user.uid}/preview`}>
      <a>
        <div className={clsx(
          'hidden lg:flex fixed items-center space-x-4 transition-all duration-300',
          isNavigationOpen ? 'bottom-4 left-8' : 'bottom-4 left-2',
        )}
        >
          <Image className="rounded-full dark:bg-white" height={45} src={renderImageSrc(user)} width={45} />
          {isNavigationOpen && <Typography variant="h6">{user.displayName || extractNameFromEmail(user.email)}</Typography>}
        </div>

      </a>
    </Link>

  );
};

export default Profile;
