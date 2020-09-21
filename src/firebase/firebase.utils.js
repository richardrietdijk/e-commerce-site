import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCcjE8s0kbetK6XabzMNQSrqT1AIjHm1Ek',
  authDomain: 'crwn-db-f8c91.firebaseapp.com',
  databaseURL: 'https://crwn-db-f8c91.firebaseio.com',
  projectId: 'crwn-db-f8c91',
  storageBucket: 'crwn-db-f8c91.appspot.com',
  messagingSenderId: '414656233638',
  appId: '1:414656233638:web:a3f914cfcba2495e87b467',
  measurementId: 'G-4V3YW2ZNRF',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
