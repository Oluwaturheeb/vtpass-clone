import React, {
  createContext,
  useState,
  useContext,
  useLayoutEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from './axios';
import { fetchUser, registerDevice, userBalance } from './requests';
import { str } from './helper';
// import {users} from './firestore';
// import {UserSchema} from '../schema';

const User = createContext({});
const useUser: Function = () => useContext(User);

const UserProvider = ({ children }: { children: any }) => {
  let [user, setUser] = useState({});
  let [id, setId] = useState({ id: '', token: '', deviceId: '' });
  let [homeData, setHomeData] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      try {
        let appId = await AsyncStorage.getItem('id');

        if (appId) {
          let id = JSON.parse(appId);
          setId(id);
          request.defaults.params.devicekey = id.token;
          if (id.id) {
            let user = await fetchUser(id.userToken);
            let balance = await userBalance(id.userToken);
            if (user.code == 'success')
              setUser({ ...user, user: user.content });
            if (balance.status == 'success')
              setUser({ ...user, balance: balance.balance });
          }
        } else {
          let res = await registerDevice(str(100, false));
          // set the default token
          request.defaults.params.devicekey = id.token;
          // set the store
          setId({ ...id, token: res.device_key, deviceId: res.device_id });
          // save the token
          await AsyncStorage.setItem(
            'id',
            JSON.stringify({
              ...id,
              token: res.device_key,
              deviceId: res.device_id,
            }),
          );
        }
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <User.Provider value={{ user, setUser, id, setId, homeData, setHomeData }}>
      {children}
    </User.Provider>
  );
};

export { useUser, UserProvider };
