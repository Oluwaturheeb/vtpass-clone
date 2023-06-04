import React, { useMemo, useRef } from 'react';
import { ImageBackground, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { other, pry } from './styles';
import Animated, { BounceIn, BounceInDown } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';

export const Loader = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <ImageBackground
      source={require('./assets/vtpass_loader.gif')}
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
      onPress={() => nav.navigate('Help')}
      style={{ backgroundColor: pry, borderRadius: 100, elevation: 4 }}
    />
  </Animated.View>
);
type PropType = {
  show?: number;
  children: JSX.Element;
};

export const BShit = (props: PropType) => {
  let { show, children } = props;
  const ref: any = useRef();
  const snapPoints = useMemo(() => ['50%', '60%', '70%', '80%', '105%'], []);
  return (
    <Animated.View
      entering={BounceInDown.duration(2000)}
      style={{
        position: 'absolute',
        bottom: -16,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
      }}>
      <BottomSheet
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: other + '55' }}
        snapPoints={snapPoints}
        style={{ padding: 10 }}
        ref={ref}
        index={show}>
        {children}
      </BottomSheet>
    </Animated.View>
  );
};
