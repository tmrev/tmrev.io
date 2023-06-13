import Link from "next/link"
import React, { FC } from 'react'

import Avatar from "@/components/avatar"
import { TmrevUser } from "@/models/tmrev/user"

interface Props {
  user: TmrevUser
}

const FollowerCard: FC<Props> = ({user}: Props) => {

  const name = `${user.firstName} ${user.lastName}`

  return (
    <Link  href={`/user/${user.uuid}/preview`}>
      <a className='py-3 flex items-center space-x-3'>
        <Avatar user={user} />
        <span>{name}</span>
      </a>
    </Link>
  )
}



export default FollowerCard