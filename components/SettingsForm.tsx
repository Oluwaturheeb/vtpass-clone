import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { autoWallets } from './lib/requests';
import { mywallet } from './types/schema';
import { Button, MD2Colors, Text, TextInput } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import { money } from './lib/axios';
import styles, { other, pry } from './styles';

const AutoWallet = () => {
  const { id } = useUser();
  const [data, setData] = useState({ loading: true, data: [mywallet] });

  useEffect(() => {
    (async () => {})();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 10 }}>
        {/* <View style={[styles.frow]}> */}
        {/* </View> */}
        <TextInput
          label="Amount"
          mode="outlined"
          placeholder=""
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
          onPress={async () => null}
          mode="contained"
          style={{ backgroundColor: pry, borderRadius: 5 }}
          disabled={false}>
          Proceed
        </Button>
      </View>
    </ScrollView>
  );
};

export default AutoWallet;
