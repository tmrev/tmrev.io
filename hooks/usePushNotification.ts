import { getMessaging, isSupported, MessagePayload, Messaging, onMessage } from 'firebase/messaging'
import { useCallback, useEffect, useState } from 'react'

import { app } from '@/config/firebaseInit'
import { useAuth } from '@/provider/authUserContext'


const usePushNotification = () => {
  const [messaging, setMessaging] = useState<Messaging>()
  const { deviceToken } = useAuth()

  // const workerMessage = (event: MessageEvent<any>) => {
  //   // eslint-disable-next-line no-console
  //   console.log('event for the worker', event)
  // }

  const messageReceived = (message: MessagePayload) => {
    // eslint-disable-next-line no-console
    console.log('received message', message)
  }

  const handleSetMessaging = useCallback(async () => {
    const isSupportedBrowser = await isSupported();

    if (isSupportedBrowser) {
      setMessaging(getMessaging(app))
    }
  }, [app])

  // useEffect(() => {
  //   if (!deviceToken) return () => { }

  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker.addEventListener('message', workerMessage)
  //     // onMessage(m, messageReceived)
  //   }

  //   return () => {
  //     navigator.serviceWorker.removeEventListener('message', workerMessage)
  //   }
  // }, [deviceToken])

  useEffect(() => {
    handleSetMessaging()
  }, [])

  useEffect(() => {
    if (!messaging) return () => { }

    onMessage(messaging, messageReceived)

    return () => onMessage(messaging, messageReceived)
  }, [messaging])


  return {
    deviceToken,
    messaging
  }
}


export default usePushNotification