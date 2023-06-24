import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';

import { useAuth } from '../../provider/authUserContext';
import { renderImageSrc } from '../../utils/common';
import Button from '../common/Button';

const Profile: FunctionComponent = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div>
        <Button title="login" variant="icon" onClick={() => router.push('/login')}>
          <span className="material-icons-outlined">
            account_circle
          </span>
        </Button>
      </div>
    );
  }

  return (
    <Link passHref className='flex-none' href={`/user/${user.uid}/preview`}>
      <Image alt="User" className="rounded-full dark:bg-white" height={40} src={renderImageSrc(user)} width={40} />
    </Link>
  );
};

export default Profile;
