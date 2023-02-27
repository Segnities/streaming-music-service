import { useContext } from 'react';
import { useNavigate } from 'react-router';

import {
 getAuth,
 UserCredential,
 GoogleAuthProvider,
 signInWithPopup,
 setPersistence,
 browserLocalPersistence,
} from 'firebase/auth';

import { addDoc, collection } from 'firebase/firestore';
import { firebaseApp, firebaseDatabase } from '../firebase/firebaseConfig';

import { AuthContext, AuthType } from '../context';

import { getUsers } from './getUsers';

export const signInWithGoogleProvider = async () => {
 const auth = getAuth(firebaseApp);
 const collectionRef = collection(firebaseDatabase, 'users');
 const googleProvider = new GoogleAuthProvider();
 const authContext: AuthType | null = useContext(AuthContext);
 const navigate = useNavigate();

 const users = await getUsers();
 signInWithPopup(auth, googleProvider)
  .then((res: UserCredential) => {
   authContext?.setIsAuth(true);
   authContext?.setUser(res?.user);

   if (users.find((usr) => usr.data.email === res.user.email) === undefined) {
    addDoc(collectionRef, {
     email: res?.user.email,
     username: res?.user.email,
    });
   }
   authContext?.setUser(res?.user);
   setPersistence(auth, browserLocalPersistence);
   navigate('/');
  })
  .catch((err) => alert(err.code + ':' + err.message));
};
