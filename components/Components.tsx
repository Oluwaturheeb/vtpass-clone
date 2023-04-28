import React from 'react';
import { ImageBackground } from 'react-native';
import { IconButton } from 'react-native-paper';
import { pry } from './styles';
import Animated, { BounceIn } from 'react-native-reanimated';

export const Loader = () => (
  <ImageBackground
    source={require('./assets/vtpass.gif')}
    style={{ width: '100%', height: '100%' }}
  />
);

export const HelpIcon = ({ nav }: any) => (
  <Animated.View
    entering={BounceIn.duration(3000).delay(1000).duration(2000)}
    style={{ position: 'absolute', bottom: 24, right: 24 }}>
    <IconButton
      iconColor="#fff"
      icon="help-circle"
      size={42}
      onPress={() => nav.navigate('Help')}
      style={{ backgroundColor: pry, borderRadius: 100, elevation: 4 }}
    />
  </Animated.View>
);
