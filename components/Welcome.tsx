import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import styles, { other, pry } from './styles';
import request from './lib/axios';

const Welcome = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    (async () => {
      try {
        const services = await request.get('/entry-point');
        setTimeout(() => navigation.push('Home', services), 3000);
      } catch (e) {
        console.log(e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[css.bg, styles.fcenter]}>
      <View style={[css.circle1, styles.fcenter]}>
        <View style={[css.circle2, styles.fcenter]}>
          <Image
            source={require('./assets/vtTrans.png')}
            resizeMode="contain"
            style={css.img}
          />
        </View>
      </View>
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
  img: { width: 120 },
});
