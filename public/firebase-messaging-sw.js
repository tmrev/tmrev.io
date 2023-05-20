/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// It's a static script file, so it won't be covered by a module bundling system
// hence, it uses "importScripts" function to load the other libs
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Replace the values with yours
const firebaseConfig = {
  apiKey: 'AIzaSyByeQUu5jOWSqab39JhLxO-gfl-KDaiuDE',
  appId: '1:637447196415:web:5316274f0af72d784806ca',
  authDomain: 'movie-tracker-a3544.firebaseapp.com',
  messagingSenderId: '637447196415',
  projectId: 'movie-tracker-a3544',
  storageBucket: 'movie-tracker-a3544.appspot.com'
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Not necessary, but if you want to handle clicks on notifications
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const pathname = event.notification?.data?.FCM_MSG?.notification?.data?.link
  if (!pathname) return
  const url = new URL(pathname, self.location.origin).href

  event.waitUntil(
    self.clients
      .matchAll({ includeUncontrolled: true, type: 'window' })
      .then((clientsArr) => {
        const hadWindowToFocus = clientsArr.some((windowClient) =>
          windowClient.url === url ? (windowClient.focus(), true) : false
        )

        if (!hadWindowToFocus)
          self.clients
            .openWindow(url)
            .then((windowClient) =>
              windowClient ? windowClient.focus() : null
            )
      })
  )
})