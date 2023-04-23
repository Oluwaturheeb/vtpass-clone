import React, { useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import styles, { other, pry } from './styles';
import request from './lib/axios';
import { Button, MD2Colors } from 'react-native-paper';
import { StatusBar } from 'react-native';

const Welcome = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    (async () => {
      try {
        const services = await request.get('/entry-point');
        setTimeout(() => navigation.push('Home', services.data), 0);
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[css.bg, styles.fcenter]}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('./assets/bg.png')}
        resizeMode="contain"
        style={{ width: '100%', height: '100%', padding: 10 }}>
        <View
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
        </View>
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
