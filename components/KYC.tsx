import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { autoWallets } from './lib/requests';
import { mywallet } from './types/schema';
import {
  Button,
  IconButton,
  MD2Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import styles, { other, pry } from './styles';

const KYC = () => {
  const { id } = useUser();
  const [password, setPassword] = useState({ old: '', new: '', confirm: '' });

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={[styles.frow]}>
          <IconButton icon="information" size={32} />
          <Text style={{ flex: 1 }} variant="bodySmall">
            To change your password, kindly enter the old password first.
          </Text>
        </View>
        <TextInput
          label="Current Password"
          mode="outlined"
          placeholder="Enter your current password"
          keyboardType="number-pad"
          placeholderTextColor={other + '66'}
          value={password.old}
          onChangeText={(e: any) => setPassword({ ...password, old: e })}
          right={
            <TextInput.Icon
              icon="lock"
              iconColor={MD2Colors.grey200}
              style={{
                backgroundColor: pry + 'cc',
                borderRadius: 5,
              }}
              size={26}
            />
          }
          outlineColor={other}
          activeOutlineColor={other}
          selectionColor={other}
          style={{
            backgroundColor: '#00000000',
            borderBottomWidth: 0,
            marginVertical: 16,
          }}
          returnKeyType="send"
          returnKeyLabel="Send"
        />
        <Button
          onPress={async () => {}}
          mode="contained"
          style={{ backgroundColor: pry, borderRadius: 5 }}
          disabled={false}>
          Proceed
        </Button>
      </View>
    </ScrollView>
  );
};

export default KYC;
