import * as firebaseAdmin from 'firebase-admin';

const { privateKey } = JSON.parse(process.env.NEXT_PUBLIC_PRIVATE_KEY as string)

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      privateKey,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
  });
}

export { firebaseAdmin };
