import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  databaseURL: process.env.FB_DATABASE_URL,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGE_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID
});

export const Db = firebase.firestore();
export const Auth = firebase.auth();
export const getTimestamp = () => firebase.firestore.FieldValue.serverTimestamp();