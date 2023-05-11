import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useAuth } from '@/provider/authUserContext'


const Logout = () => {
  const router = useRouter()
  const {user, signOut} = useAuth()

  const handleLogout = async () => {
    if(!user) router.push('/')

    await signOut()

    router.push('/')
  }


  useEffect(() => {
    handleLogout()
  }, [user])

  return (
    <h1>Logging out</h1>
  )

}

export default Logout