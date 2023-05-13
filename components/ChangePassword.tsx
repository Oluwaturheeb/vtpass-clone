import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { changePasswords } from './lib/requests';
import {
  Button,
  IconButton,
  MD2Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import { Alert, ScrollView, View } from 'react-native';
import styles, { other, pry } from './styles';

const Passwords = () => {
  const { id } = useUser();
  const [password, setPassword] = useState({
    old: '',
    new: '',
    confirm: '',
    msg: '',
  });
  const [see, setSee] = useState({ old: true, new: true, confirm: true });

  const submitPassword = async () => {
    if (password.new.length < 6) {
      setPassword({
        ...password,
        msg: 'New Password should be at least minimum of 8 characters',
      });
    } else if (password.new !== password.confirm) {
      setPassword({ ...password, msg: 'Passwords do not match!' });
    } else {
      let data = await changePasswords({
        user_token: id.userToken,
        old_password: password.old,
        new_password: password.new,
      });

      if (data.status == 'error') {
        setPassword({ ...password, msg: data.message });
      } else {
        Alert.alert('VTpass Info', 'Password changed successfully!');
      }
    }
  };

  useEffect(() => {
    setTimeout(() => setPassword({ ...password, msg: '' }), 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password.msg != '']);

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 16 }}>
        <View style={[styles.frow, styles.fVertCenter]}>
          <IconButton icon="information" size={32} />
          <Text style={{ flex: 1 }} variant="bodySmall">
            To change your password, kindly enter the old password first.
          </Text>
        </View>
        <TextInput
          label="Current Password"
          mode="outlined"
          placeholder="Enter your current password"
          placeholderTextColor={other + '66'}
          value={password.old}
          onChangeText={(e: any) => setPassword({ ...password, old: e })}
          right={
            <TextInput.Icon
              icon="eye"
              iconColor={MD2Colors.grey200}
              style={{
                backgroundColor: pry + 'cc',
                borderRadius: 5,
              }}
              size={26}
              onPress={() => setSee({ ...see, old: !see.old })}
            />
          }
          outlineColor={other}
          activeOutlineColor={other}
          selectionColor={other}
          style={{
            backgroundColor: '#eee',
            borderBottomWidth: 0,
            marginVertical: 16,
          }}
          secureTextEntry={see.old}
          autoComplete="off"
        />
        <TextInput
          label="New Password"
          mode="outlined"
          placeholder="Enter New Password"
          placeholderTextColor={other + '66'}
          value={password.new}
          onChangeText={(e: any) => setPassword({ ...password, new: e })}
          right={
            <TextInput.Icon
              icon="eye"
              iconColor={MD2Colors.grey200}
              style={{
                backgroundColor: pry + 'cc',
                borderRadius: 5,
              }}
              size={26}
              onPress={() => setSee({ ...see, new: !see.new })}
            />
          }
          outlineColor={other}
          activeOutlineColor={other}
          selectionColor={other}
          style={{
            backgroundColor: '#eee',
            borderBottomWidth: 0,
            marginVertical: 16,
          }}
          secureTextEntry={see.new}
          autoComplete="off"
        />
        <TextInput
          label="Confirm New Password"
          mode="outlined"
          placeholder="Confirm new password"
          placeholderTextColor={other + '66'}
          value={password.confirm}
          onChangeText={(e: any) => setPassword({ ...password, confirm: e })}
          right={
            <TextInput.Icon
              icon="eye"
              iconColor={MD2Colors.grey200}
              style={{
                backgroundColor: pry + 'cc',
                borderRadius: 5,
              }}
              size={26}
              onPress={() => setSee({ ...see, confirm: !see.confirm })}
            />
          }
          outlineColor={other}
          activeOutlineColor={other}
          selectionColor={other}
          style={{
            backgroundColor: '#eee',
            borderBottomWidth: 0,
            marginVertical: 16,
          }}
          returnKeyType="send"
          returnKeyLabel="Send"
          secureTextEntry={see.confirm}
          autoComplete="off"
        />
        {password.msg != '' && (
          <Text
            variant="bodySmall"
            style={{
              color: MD2Colors.red500,
              textAlign: 'center',
              marginVertical: 5,
            }}>
            {password.msg}
          </Text>
        )}
        <Button
          onPress={submitPassword}
          mode="contained"
          style={{ backgroundColor: pry, borderRadius: 5 }}
          disabled={
            password.old.trim() == '' ||
            password.new.trim() == '' ||
            password.confirm.trim() == ''
              ? true
              : false
          }>
          Proceed
        </Button>
      </View>
    </ScrollView>
  );
};

export default Passwords;
