import { NextPage } from "next";
import { useRouter } from "next/router";
import React, {FC, useCallback, useEffect, useState} from "react";

import Avatar from "@/components/avatar";
import Spinner from "@/components/common/spinner";
import HeaderText from "@/components/common/typography/headerText";
import { NotificationResult, NotificationTypes } from "@/models/tmrev/notifications";
import { useAuth } from "@/provider/authUserContext";
import { useReadNotificationMutation, useRetrieveNotificationsQuery } from "@/redux/api";
import { createMediaUrl } from "@/utils/mediaID";

interface NotificationCardProps {
  data: NotificationResult
}

interface NotificationLoadingProps {
  isLoading: boolean
  hasData: boolean
}

const NotificationLoading: FC<NotificationLoadingProps> = ({hasData, isLoading}: NotificationLoadingProps) => {

  if(isLoading) {
    return (
      <div className="w-full flex items-center justify-center h-full">
        <Spinner/>
      </div>
    )
  }

  if(hasData) {
    return (
      <div>
        <span>No Notifications 😔</span>
      </div>
    )
  }


  return null
}

const createNotificationMessage = (notification: NotificationResult) => {

  const senderName = `${notification.sender.firstName} ${notification.sender.lastName}`


  if(notification.type === NotificationTypes.DOWN_VOTE) {
    const titleName = `${notification.review.title}`
    return (
      <span>
        <span className="font-bold" >{senderName}</span>
        <span>{`has disliked your ${titleName} review.`}</span>
      </span>
    )
  }

  if(notification.type === NotificationTypes.UP_VOTE) {
    const titleName = `${notification.review.title}`
    return ( 
      <span>
        <span className="font-bold" >{senderName}</span>
        <span>{` has liked your review on ${titleName}.`}</span>
      </span>
    )
  }

  if(notification.type === NotificationTypes.REPLY) {
    const titleName = `${notification.review.title}`
    return (
      <span>
        <span className="font-bold" >{senderName}</span>
        <span>{` has left a reply on your ${titleName} review. `}</span>
        <span className="line-clamp-3">{`"${notification.message}"`}</span>
      </span>
    )
  }

  if(notification.type === NotificationTypes.FOLLOW) {
    return (
      <span>
        <span className="font-bold" >{senderName}</span>
        <span>{` has followed you.`}</span>
      </span>
    )
  }

  if(notification.type === NotificationTypes.UN_FOLLOW) {
    return (
      <span>
        <span className="font-bold" >{senderName}</span>
        <span>{` has unfollowed you.`}</span>
      </span>
    )
  }

  return null
}


const NotificationCard: FC<NotificationCardProps> = ({data}: NotificationCardProps) => {
  const router = useRouter()
  const { user } = useAuth()
  const [ readNotification ] = useReadNotificationMutation()

  const { sender, _id, type } = data;

  const message = createNotificationMessage(data)
  const link = useCallback(() => {

    if(type === NotificationTypes.FOLLOW || type === NotificationTypes.UN_FOLLOW) {
      return `/user/${sender.uuid}/preview`
    }

    if(type === NotificationTypes.REPLY) {
      const { review } = data
      return `/movie/${createMediaUrl(review.tmdbID, review.title)}`
    }

    if(type === NotificationTypes.UP_VOTE || type === NotificationTypes.DOWN_VOTE) {
      const { review } = data
      return `/movie/${createMediaUrl(review.tmdbID, review.title)}`
    }

    return ''

  }, [type])

  const handleNotification = async () => {
    if(!user) return;

    const token = await user.getIdToken()

    await readNotification({authToken: token, notificationId: _id})

    router.push(link())
  }

  return (
    <button className="text-left" type="button" onClick={handleNotification}>
      <div className=" flex text-white space-x-3 items-center">
        <div className="flex-shrink-0">
          <Avatar  user={sender} />
        </div>
        {message && (
          <span>{message}</span>
        )}
      </div>
    </button>
  )
}



const Notifications: NextPage = () => {
  const { user } = useAuth()
  const { notification } = useAuth()
  const [token, setToken] = useState<string>('')

  const [ readNotification ] = useReadNotificationMutation()

  const { data: readNotifications } = useRetrieveNotificationsQuery(
    {
      authToken: token, 
      params: {
        read: true
      }
    },
    {skip: !token}
  )

  const readAll = useCallback(async () => {
    if(!notification.data || !token) return

    const maps = notification.data.body.map((n) => readNotification({authToken: token, notificationId: n._id}))

    await Promise.allSettled(maps)
  }, [notification, token])

  const handleOldNotifications = useCallback( async () => {
    if(!user) return

    const freshToken = await user.getIdToken()

    setToken(freshToken)

  }, [user])

  useEffect(() => {
    handleOldNotifications()
  }, [handleOldNotifications])
  
  return (
    <div className="p-2 text-white space-y-3">
      <div className="flex items-center">
        <HeaderText className="flex-grow" >Notifications</HeaderText>
        {notification.data && !!notification.data.body.length && (
          <button type="button" onClick={readAll} >Mark all as read</button>
        )}
      </div>
      <div className="space-y-2 flex flex-col">
        {notification.data && notification.data.body.map((result) => (
          <NotificationCard key={result._id} data={result} />
        ))}
      </div>
      <h2>Past Notifications</h2>
      <div className="space-y-2 flex flex-col">
        {readNotifications && readNotifications.body.map((result) => (
          <NotificationCard key={result._id} data={result} />
        ))}
      </div>
      <NotificationLoading 
        hasData={!notification.data}
        isLoading={notification.isLoading}
      />
    </div>
  )
}

export default Notifications