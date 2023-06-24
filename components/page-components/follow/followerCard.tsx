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
    <Link className='py-3 flex items-center space-x-3' href={`/user/${user.uuid}/preview`}>
      <Avatar user={user} />
      <span>{name}</span>
    </Link>
  )
}



export default FollowerCard