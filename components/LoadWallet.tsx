import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  IconButton,
  MD2Colors,
  Text,
  TextInput,
  Button,
} from 'react-native-paper';
import styles, { other, pry } from './styles';
import { money } from './lib/axios';
// import { initTrans } from './lib/requests';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScreenProps } from './types/types';

const LoadWallet = ({ navigation }: ScreenProps) => {
  const [amount, setAmount] = useState({
    loading: false,
    error: false,
    value: '',
    msg: '',
  });
  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={[styles.frow]}>
          <IconButton icon="information" size={32} iconColor={other} />
          <Text style={{ flex: 1 }} variant="bodySmall">
            Please note that loading your wallet through card as an agent
            attracts a card processing fee of 1.5%. To avoid paying this charge,
            please load your wallet through bank deposit
          </Text>
        </View>
        <TextInput
          label="Amount"
          mode="outlined"
          placeholder={`Amount to load ${money(5)} - ${money(100000000)}}`}
          keyboardType="number-pad"
          placeholderTextColor={other + '66'}
          value={amount.value}
          onChangeText={(e: any) => setAmount({ ...amount, value: e })}
          right={
            <TextInput.Icon
              icon="cash-fast"
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
          // underlineColor="#00000000"
          // activeUnderlineColor="#00000000"
          selectionColor={other}
          style={{
            backgroundColor: '#00000000',
            borderBottomWidth: 0,
            marginVertical: 16,
          }}
          onEndEditing={() => {
            if (Number(amount.value) < 1) {
              setAmount({
                ...amount,
                error: true,
                msg: 'Invalid amount supplied',
              });
            } else {
              setAmount({ ...amount, error: false });
            }
          }}
          returnKeyType="send"
          returnKeyLabel="Send"
        />
        <Button
          onPress={async () => {
            if (amount.value < 1) {
              setAmount({
                ...amount,
                error: true,
                msg: 'Invalid amount supplied',
              });
            } else {
              setAmount({ ...amount, error: false });
            }
          }}
          mode="contained"
          style={{ backgroundColor: pry, borderRadius: 5 }}
          disabled={amount.error}>
          Proceed
        </Button>
      </View>
    </ScrollView>
  );
};

export default LoadWallet;
