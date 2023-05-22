import React, { useEffect, useState } from 'react';
import { Alert, DeviceEventEmitter, NativeModules, View } from 'react-native';
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
import { fetchUser, postAuth } from './lib/requests';
import ReactNativeBiometrics from 'react-native-biometrics';

const Auth = ({ route, navigation }: { route: any; navigation: any }) => {
  const { setId, setUser, id } = useUser();
  const [input, setInput] = useState({
    email: '',
    password: '',
    phone: '',
    loading: false,
  });
  const [msg, setMsg] = useState({ msg: '', status: false });
  const { title } = route.params;
  const [fingerprint, setFingerPrint] = useState({ show: false, set: false });

  const authenticate = async () => {
    setInput({ ...input, loading: true });
    try {
      if (!input.email?.trim()) {
        setMsg({ ...msg, msg: 'Email field is required!' });
      } else if (title != 'Login' && !input.phone) {
        setMsg({ ...msg, msg: 'Phone field is required!' });
      } else if (!input.password?.trim()) {
        setMsg({ ...msg, msg: 'Password field is required!' });
      } else {
        let url, data;
        if (title == 'Login') {
          url = '/auth';
          data = { username: input.email, password: input.password };
        } else {
          url = '/customer-signup';
          data = input;
        }

        let response = await postAuth(url, data);
        setId({
          ...id,
          id: response.c_id,
          userToken: response.s_token,
          login: true,
        });
        setMsg({
          msg: response.errors
            ? 'Invalid credentials!'
            : 'Authenticaton successful!',
          status: response.errors ? false : true,
        });
        await AsyncStorage.setItem(
          'id',
          JSON.stringify({
            ...id,
            id: response.c_id,
            userToken: response.s_token,
            login: true,
          }),
        );
        let user = await fetchUser(response.s_token);
        if (user.status) {
          setUser(user.content);
        }
      }
      setInput({ ...input, loading: false });
    } catch (e) {
      setMsg({ ...msg, msg: 'Something went wrong, contact support!' });
      setInput({ ...input, loading: false });
    }
  };

  useEffect(() => {
    (async () => {
      setTimeout(() => setMsg({ ...msg, msg: '' }), 5000);
      if (msg.status) {
        navigation.navigate('Home', route.params);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  useEffect(() => {
    (async () => {
      if (fingerprint.show) {
        const auth = new ReactNativeBiometrics({
          allowDeviceCredentials: true,
        });

        let check = await auth.isSensorAvailable();

        if (!check.available) {
          Alert.alert(
            'VTpass',
            'Your device does not appear to have fingerprint sensor!',
          );
        } else {
          if (!id.id) {
            Alert.alert('VTpass', 'You to login first with your credentials');
          } else {
            let login = await auth.simplePrompt({
              promptMessage: 'Fingerprint Authentication',
              fallbackPromptMessage: 'Alternative Authentication',
              cancelButtonText: 'Close',
            });
            setFingerPrint({ show: !fingerprint.show, set: true });
            if (login.success) {
              setId({ ...id, login: true });
              await AsyncStorage.setItem(
                'id',
                JSON.stringify({
                  ...id,
                  login: true,
                }),
              );
            }

            console.log(login);
          }
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fingerprint.show]);

  return (
    <View style={[styles.p2, styles.fcenter]}>
      <View style={styles.inputHolder}>
        <Text variant="bodySmall" style={{ alignSelf: 'flex-start' }}>
          Email {route.params.title != 'Register' && 'or Phone number'}
        </Text>
        <Input
          placeholder={title == 'Login' ? 'Email or Phone number' : 'Email'}
          state={(e: string) => setInput({ ...input, email: e })}
          value={input.email}
        />
      </View>
      {title != 'Login' && (
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
              title: title == 'Login' ? 'Create Account' : 'Login',
            })
          }>
          {title == 'Login' ? 'Register' : 'Login'}
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
          {title}
        </Button>
      )}

      {title == 'Login' && (
        <View style={[styles.inputHolder, styles.fVertCenter]}>
          <Text
            variant="bodyMedium"
            style={{ color: other, fontWeight: 'bold', ...styles.my2 }}>
            Or login with your FingerPrint
          </Text>
          <IconButton
            onPress={() => setFingerPrint({ ...fingerprint, show: true })}
            icon="fingerprint"
            size={56}
            iconColor={other}
          />
        </View>
      )}
    </View>
  );
};

export const Input = ({
  placeholder,
  value,
  state,
  useLine,
  line,
}: // error,
{
  placeholder: string;
  value: any;
  state: Function;
}) => (
  <TextInput
    // error={error}
    placeholder={placeholder}
    mode="outlined"
    underlineColor="#000"
    outlineColor={other}
    activeOutlineColor={other}
    activeUnderlineColor="#00000000"
    onChangeText={(text: any) => state(text)}
    secureTextEntry={placeholder == 'Password'}
    value={value}
    style={{
      width: '100%',
      height: 40,
      backgroundColor: 'transparent',
      borderRadius: 5,
    }}
    multiline={useLine}
    numberOfLines={line}
  />
);

export default Auth;
