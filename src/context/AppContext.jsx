import { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/firebase.init';

export const Context = createContext(null);

export default function AppContext({ children }) {
  const [user, setUser] = useState('');
  const [userPhoto, setUserPhoto] = useState('');

  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user.displayName);
        setUserPhoto(user.photoURL);
      } else {
        console.log('User is signed out');
      }
    });
  }, []);
  return <Context.Provider value={{ user, userPhoto, setUser, setUserPhoto }}>{children}</Context.Provider>;
}

// export default AppContext;
