import React from 'react';
import { ImageBackground, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { pry } from './styles';
import Animated, { BounceIn } from 'react-native-reanimated';

export const Loader = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <ImageBackground
      source={require('./assets/vtpass.gif')}
      style={{ width: '100%', height: '100%', flex: 1 }}
      resizeMethod="resize"
      resizeMode="contain"
    />
  </View>
);

export const HelpIcon = ({ nav }: any) => (
  <Animated.View
    entering={BounceIn.duration(3000).delay(1000).duration(2000)}
    style={{ position: 'absolute', bottom: 24, right: 24 }}>
    <IconButton
      iconColor="#fff"
      icon="help"
      // size={}
      onPress={() => nav.navigate('Help')}
      style={{ backgroundColor: pry, borderRadius: 100, elevation: 4 }}
    />
  </Animated.View>
);
