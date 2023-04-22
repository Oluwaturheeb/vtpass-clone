import React, { useEffect, useState } from 'react';
import request from './lib/axios';
import { Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';

const Home = ({ navigation, route }) => {

  // reset the nav state
  useEffect(() => {
    navigation.dispatch((state: any) => {
      const routes = state.routes.filter((r: any) => r.name !== 'Welcome');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      // const services = request.get('/entry');
      // console.log(services);
    })();
  }, []);

  return <Text>Home</Text>;
};

export default Home;
