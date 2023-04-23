import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {users} from './firestore';
// import {UserSchema} from '../schema';

const User = createContext({});
const useUser: Function = () => useContext(User);

const UserProvider = ({ children }: { children: any }) => {
  let [user, setUser] = useState({});
  let [id, setId] = useState({
    id: '',
    token: 'amRhbGk3NjE2dnRsa1JUY3NqfC18OTAxOTgy',
  });

  /* useEffect(() => {
    const subscriber = (async () => {
      let appId = await AsyncStorage.getItem('id');
      setId(appId);
      return users.doc(appId).onSnapshot(documentSnapshot => {
        setUser(documentSnapshot.data());
      });
    })();

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []); */
  return (
    <User.Provider value={{ user, setUser, id, setId }}>
      {children}
    </User.Provider>
  );
};

export { useUser, UserProvider };
