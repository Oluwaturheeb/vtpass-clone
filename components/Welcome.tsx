import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import styles, { other, pry } from './styles';
import { Button, MD2Colors } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { getService } from './lib/requests';
import { useUser } from './lib/context';
import Animated, { SlideInDown } from 'react-native-reanimated';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScreenProps } from './types/types';

const Welcome = ({ navigation }: ScreenProps) => {
  const { id, setHomeData } = useUser();
  const [show, setShow] = useState(false);
  const [service, setService] = useState();

  useEffect(() => {
    (async () => {
      // request permission
      await PermissionsAndroid.requestMultiple([
        'android.permission.BLUETOOTH_CONNECT',
        'android.permission.BLUETOOTH_SCAN',
        'android.permission.BLUETOOTH_ADVERTISE',
        'android.permission.READ_CONTACTS',
      ]);

      let serv;
      if (id.deviceToken) {
        serv = await getService({ devicekey: id.deviceToken });
        setHomeData(serv);
        setService(serv);
      }

      if (id.login) {
        setShow(false);
        // get permission to read contact
        try {
          if (serv.code == 'success') {
            navigation.navigate('Home', serv);
          } else {
            Alert.alert(
              'Vtpass error',
              'Something went wrong, kindly contact support!',
            );
          }
        } catch (e) {
          // console.log(e, '    welcome     from catch');
          Alert.alert('Vtpass', 'Something went wrong, kindly reopen the app!');
        }
      } else {
        setShow(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id.deviceToken]);

  return (
    <View style={[css.bg, styles.fcenter]}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('./assets/bg.png')}
        resizeMode="contain"
        style={{ width: '100%', height: '100%', padding: 10 }}>
        {show && !id.login && (
          <Animated.View
            entering={SlideInDown.duration(1000).delay(1000)}
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-end',
              padding: 10,
            }}>
            <Button
              onPress={() => navigation.navigate('Auth', { title: 'Login' })}
              compact={false}
              textColor={MD2Colors.white}
              style={{
                backgroundColor: MD2Colors.red600,
                borderRadius: 5,
                marginBottom: 5,
              }}>
              Login
            </Button>
            <Button
              onPress={() =>
                navigation.navigate('Auth', { title: 'Create Account' })
              }
              compact={false}
              mode="outlined"
              textColor={other}
              style={{
                backgroundColor: MD2Colors.white,
                borderRadius: 5,
                marginBottom: 5,
              }}>
              Create Account
            </Button>
            <Button
              onPress={() => navigation.navigate('Home', service)}
              compact={false}
              textColor={MD2Colors.red600}
              style={{
                backgroundColor: MD2Colors.white,
                borderWidth: 1,
                borderColor: MD2Colors.red600,
                borderRadius: 5,
              }}>
              Continue without Login
            </Button>
          </Animated.View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const css = StyleSheet.create({
  bg: { backgroundColor: pry, width: '100%', height: '100%' },
  circle1: {
    backgroundColor: other,
    borderRadius: 100,
    width: 200,
    height: 200,
  },
  circle2: {
    backgroundColor: pry + '55',
    borderRadius: 100,
    width: 120,
    height: 120,
  },
  img: { width: 120, flex: 1 },
});
