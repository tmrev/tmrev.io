import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

// const config = {
//   apiKey: process.env.NEXT_PUBLIC_API_KEY,
//   appId: process.env.NEXT_PUBLIC_APP_ID,
//   authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//   measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//   projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
// };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// const analytics = getAnalytics(app);
// logEvent(analytics, 'notification_received');
const db = getFirestore(app);

export default db;
