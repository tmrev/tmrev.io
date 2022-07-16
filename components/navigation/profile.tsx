import clsx from 'clsx';
import Image from 'next/image';
import React, { FunctionComponent } from 'react';

import { useAppSelector } from '../../hooks';
import { useAuth } from '../../provider/authUserContext';
import { extractNameFromEmail } from '../../utils/common';
import Typography from '../common/typography';

const Profile: FunctionComponent = () => {
  const { user } = useAuth();
  const isNavigationOpen = useAppSelector((state) => state.navigation.navigationOpen);

  const renderImageSrc = () => {
    if (user?.photoURL) return user.photoURL;

    if (user?.displayName) return `https://avatars.dicebear.com/api/identicon/${user.displayName}.svg`;

    if (user?.email) return `https://avatars.dicebear.com/api/identicon/${extractNameFromEmail(user.email)}.svg`;

    return 'https://avatars.dicebear.com/api/identicon/foobar.svg';
  };

  if (!user) return null;

  return (
    <div className={clsx(
      'hidden lg:flex fixed items-center space-x-4 transition-all duration-300',
      isNavigationOpen ? 'bottom-4 left-8' : 'bottom-4 left-2',
    )}
    >
      <Image className="rounded-full dark:bg-white" height={45} src={renderImageSrc()} width={45} />
      {isNavigationOpen && <Typography variant="h6">{user.displayName || extractNameFromEmail(user.email)}</Typography>}
    </div>
  );
};

export default Profile;
