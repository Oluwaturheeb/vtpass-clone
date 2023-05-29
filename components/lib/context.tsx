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
import { user as userSchema, userID } from '../types/schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User as UserType, ID } from '../types/types';

const User = createContext({});
const useUser: Function = () => useContext(User);

const UserProvider = ({ children }: { children: any }) => {
  let [getUser, setUser] = useState(userSchema);
  let [id, setId] = useState(userID);
  let [homeData, setHomeData] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      try {
        let appId = await AsyncStorage.getItem('id');
        if (appId) {
          let parseId: ID = JSON.parse(appId);
          setId(parseId);
          request.defaults.params['devicekey'] = parseId.deviceToken;
          if (parseId.id != 0) {
            request.defaults.params['user_token'] = parseId.userToken;
            let user = await fetchUser(parseId.userToken);
            let balance = await userBalance();

            if (user.status == 'success') {
              let loggedUser: UserType = {
                ...user.content,
                customer: { ...user.content.customer, wallet: balance.balance },
              };
              setUser(loggedUser);
              setId({
                ...parseId,
                userToken: loggedUser.s_token,
                id: loggedUser.customer.id,
              });
            }
          }
        } else {
          let res = await registerDevice(str(100, false));
          // set the default token
          request.defaults.params['devicekey'] = res.device_key;
          // set the store
          setId({
            ...id,
            deviceToken: res.device_key,
            deviceId: res.device_id,
          });
          // save the token
          await AsyncStorage.setItem(
            'id',
            JSON.stringify({
              ...id,
              deviceToken: res.device_key,
              deviceId: res.device_id,
              login: false,
            }),
          );
        }
      } catch (e) {
        console.log(e, 'context----');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser]);

  return (
    <User.Provider
      value={{ getUser, setUser, id, setId, homeData, setHomeData }}>
      {children}
    </User.Provider>
  );
};

export { useUser, UserProvider };
