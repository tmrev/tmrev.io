import { NextPage } from 'next'
import React, { useState } from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

const DeleteAccount: NextPage = () => {
  const [email, setEmail] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // open user email client
    window.open(
      `mailto:tmrevcontact007@gmail.com?subject=Delete Account Request&body=Please delete my account. ${email}`
    )
  }

  return (
    <div className="text-white max-w-lg p-12 space-y-12">
      <h1 className="text-xl">Delete Account</h1>
      <div className="space-y-4">
        <form onSubmit={onSubmit}>
          <Input
            label="Email"
            placeholder="Enter Account Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <Button type="submit" variant="primary">
            Submit Request
          </Button>
        </form>
      </div>
    </div>
  )
}

export default DeleteAccount
