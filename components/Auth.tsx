import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  MD2Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import styles, { other } from './styles';
import { useUser } from './lib/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getService, postAuth } from './lib/requests';

const Auth = ({ route, navigation }: { route: any; navigation: any }) => {
  const { setId, setUser } = useUser();
  const [input, setInput] = useState({
    email: '',
    password: '',
    phone: '',
    loading: false,
  });
  const [msg, setMsg] = useState({ msg: '', status: false });
  const type = route.params.title;

  const authenticate = async () => {
    setInput({ ...input, loading: true });
    try {
      if (!input.email?.trim()) {
        setMsg({ ...msg, msg: 'Email field is required!' });
      } else if (type != 'Login' && !input.phone) {
        setMsg({ ...msg, msg: 'Phone field is required!' });
      } else if (!input.password?.trim()) {
        setMsg({ ...msg, msg: 'Password field is required!' });
      } else {
        let url, data;
        if (type == 'Login') {
          url = '/auth';
          data = { username: input.email, password: input.password };
        } else {
          url = '/customer-signup';
          data = input;
        }

        let response = await postAuth(url, data);
        setUser(response);
        setId(response.c_id);
        setMsg({
          msg: response.errors
            ? 'Invalid credentials!'
            : 'Authenticaton successful!',
          status: response.errors ? false : true,
        });
        await AsyncStorage.setItem('user', response.data.c_id);
      }
      setInput({ ...input, loading: false });
    } catch (e) {
      setMsg({ ...msg, msg: 'Something went wrong, contact support!' });
      setInput({ ...input, loading: false });
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      setTimeout(() => setMsg({ ...msg, msg: '' }), 5000);
      if (msg.status) {
        navigation.navigate('Home', await getService());
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  return (
    <View style={[styles.p2, styles.fcenter]}>
      <View style={styles.inputHolder}>
        <Text variant="bodySmall" style={{ alignSelf: 'flex-start' }}>
          Email {route.params.title != 'Register' && 'or Phone number'}
        </Text>
        <Input
          placeholder={type == 'Login' ? 'Email or Phone number' : 'Email'}
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
            placeholder="Phone number"
            state={(e: string) => setInput({ ...input, phone: e })}
            value={input.phone}
          />
        </View>
      )}
      <View style={styles.inputHolder}>
        <Text variant="bodySmall" style={{ alignSelf: 'flex-start' }}>
          Password
        </Text>
        <Input
          placeholder="Password"
          state={(e: string) => setInput({ ...input, password: e })}
          value={input.password}
        />
      </View>
      {msg.msg && (
        <Text
          variant="bodySmall"
          style={{ color: msg.status ? other : MD2Colors.red400 }}>
          {msg.msg}
        </Text>
      )}
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
      {input.loading ? (
        <ActivityIndicator
          size="small"
          color="#fff"
          style={{ backgroundColor: other, padding: 5, borderRadius: 100 }}
        />
      ) : (
        <Button
          loading={input.loading}
          disabled={input.loading}
          onPress={authenticate}
          buttonColor={other}
          textColor={MD2Colors.white}
          style={{ width: '100%', borderRadius: 5 }}>
          {type}
        </Button>
      )}

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

export const Input = ({
  placeholder,
  value,
  state,
}: // error,
{
  placeholder: string;
  value: any;
  state: Function;
  // error: boolean;
}) => (
  <TextInput
    // error={error}
    placeholder={placeholder}
    mode="outlined"
    underlineColor="#000"
    outlineColor={other}
    activeOutlineColor={other}
    activeUnderlineColor="#00000000"
    onChangeText={text => state(text)}
    secureTextEntry={placeholder == 'Password'}
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
