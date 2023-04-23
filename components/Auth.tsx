import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Button,
  IconButton,
  MD2Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import styles, { other } from './styles';

const Auth = ({ route, navigation }: { route: any; navigation: any }) => {
  const [input, setInput] = useState({ email: '', password: '', phone: '' });
  const type = route.params.title;

  return (
    <View style={[styles.p2, styles.fcenter]}>
      <View style={styles.inputHolder}>
        <Text variant="bodySmall" style={{ alignSelf: 'flex-start' }}>
          Email {route.params.title != 'Register' && 'or Phone number'}
        </Text>
        <Input
          state={(e: string) => setInput({ ...input, email: e })}
          value={input.email}
        />
      </View>
      {type != 'Login' && (
        <View style={styles.inputHolder}>
          <Text variant="bodySmall" style={{ alignSelf: 'flex-start' }}>
            Phone Number
          </Text>
          <Input
            state={(e: string) => setInput({ ...input, phone: e })}
            value={input.email}
          />
        </View>
      )}
      <View style={styles.inputHolder}>
        <Text variant="bodySmall" style={{ alignSelf: 'flex-start' }}>
          Password
        </Text>
        <Input
          state={(e: string) => setInput({ ...input, password: e })}
          value={input.email}
        />
      </View>
      <View style={[styles.fVertCenter, styles.frow]}>
        <Text variant="bodySmall">Don't have an account? </Text>
        <Button
          mode="text"
          textColor={MD2Colors.red600}
          onPress={() =>
            navigation.navigate('Auth', {
              title: type == 'Login' ? 'Create Account' : 'Login',
            })
          }>
          {type == 'Login' ? 'Register' : 'Login'}
        </Button>
      </View>
      <Button
        buttonColor={other}
        textColor={MD2Colors.white}
        style={{ width: '100%', borderRadius: 5 }}>
        {type}
      </Button>

      {type == 'Login' && (
        <View style={[styles.inputHolder, styles.fVertCenter]}>
          <Text
            variant="bodyMedium"
            style={{ color: other, fontWeight: 'bold', ...styles.my2 }}>
            Or login with your FingerPrint
          </Text>
          <IconButton icon="fingerprint" size={56} iconColor={other} />
        </View>
      )}
    </View>
  );
};

export const Input = ({ value, state }: { value: any; state: Function }) => (
  <TextInput
    mode="outlined"
    underlineColor="#000"
    outlineColor={other}
    activeOutlineColor={other}
    activeUnderlineColor="#00000000"
    onChangeText={text => state(text)}
    value={value}
    style={{
      width: '100%',
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 5,
    }}
  />
);

export default Auth;
