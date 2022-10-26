import type { User } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { extractNameFromEmail, renderImageSrc } from '../../../utils/common';

interface Props {
  user: User | null
  open: boolean
}

export default function NavProfile({ user, open }:Props) {
  if (!user) {
    return (
      <Link href="/login">
        <span className="material-icons">
          account_circle
        </span>
      </Link>
    );
  }

  return (
    <Link className="flex items-center space-x-3" href={`/user/${user.uid}/preview`}>
      <Image
        alt="user"
        className="rounded-full"
        height={45}
        src={renderImageSrc(user)}
        width={45}
      />
      {open && (
        <p className="text-lg font-semibold">
          {user.displayName || extractNameFromEmail(user.email)}
        </p>
      )}
    </Link>
  );
}
