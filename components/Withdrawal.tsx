import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  IconButton,
  Provider,
  Text,
  Tooltip,
  TouchableRipple,
} from 'react-native-paper';
import { Alert, ToastAndroid, View } from 'react-native';
import { BShit, Loader } from './Components';
import styles, { other } from './styles';
import { getUserBanks, withdrawComm } from './lib/requests';
import { money } from './lib/helper';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const Withdrawal = ({ route, navigation }: { route: any; navigation: any }) => {
  const [data, setData] = useState({
    loading: true,
    data: [],
    show: -1,
    account: '',
    identifier: '',
  });

  useEffect(() => {
    (async () => {
      let banks = await getUserBanks();
      setData({ ...data, loading: false, data: banks.content });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toWallet = () => {
    let handle = async () => {
      let res = await withdrawComm({ method: 'wallet' });
      if (res.code == 1) {
        ToastAndroid.show(
          'Commission has been added to your balance.',
          ToastAndroid.LONG,
        );

        setTimeout(() => navigation.navigate('Earnings'), 4000);
      }
    };

    if (route.params.earning < 50) {
      Alert.alert(
        'VTpass Info',
        `Commission below minimum withdrawal limit of ${money(50)}`,
      );
    } else {
      Alert.alert('VTpass Info', 'Withdraw commission to your wallet?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: handle,
          isPreferred: true,
        },
      ]);
    }
  };

  const toBank = () => {
    let handle = async () => {
      let res = await withdrawComm({
        method: 'cash',
        account: data.account,
      });

      if (res.code == 1) {
        ToastAndroid.show(
          'Commission has been withdrawn to your bank.',
          ToastAndroid.LONG,
        );

        setTimeout(() => navigation.navigate('Earnings'), 4000);
      }
    };

    if (route.params.earning < 50) {
      Alert.alert(
        'VTpass Info',
        `Commission below minimum withdrawal limit of ${money(50)}`,
      );
    } else {
      Alert.alert('VTpass Info', 'Withdraw commission to your bank account?', [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: handle,
          isPreferred: true,
        },
      ]);
    }
  };

  const BankList = ({ item }: { item: any }) => {
    return (
      <TouchableRipple
        rippleColor={other + 99}
        onPress={() =>
          setData({
            ...data,
            identifier: item.identifier,
            account: item.id,
            show: -1,
          })
        }>
        <View style={[styles.frow, styles.fVertCenter]}>
          <IconButton icon="bank" iconColor={other} />
          <View>
            <Text variant="bodyLarge">{item.bank_name || 'No name'}</Text>
            <Text variant="bodySmall">{item.account_name}</Text>
            <Text variant="bodySmall">{item.account_number}</Text>
          </View>
        </View>
      </TouchableRipple>
    );
  };

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        {data.loading && <Loader />}
        {!data.loading && (
          <Card
            style={{
              margin: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              // height: 120,
              padding: 10,
              justifyContent: 'center',
            }}>
            <Card.Content>
              <View style={[styles.fVertCenter, styles.frow, styles.fspace]}>
                <View>
                  <Text variant="titleSmall" style={{ color: other }}>
                    Commission Balance
                  </Text>
                  <Text variant="titleLarge" style={{ color: other }}>
                    {money(route.params?.earning)}
                  </Text>
                </View>
                <View style={styles.frow}>
                  <Tooltip title="Withdraw to Wallet">
                    <IconButton
                      icon="wallet"
                      iconColor="#fff"
                      onPress={toWallet}
                      style={{ backgroundColor: other }}
                    />
                  </Tooltip>
                  <Tooltip title="Withdraw to bank account">
                    <IconButton
                      icon="bank"
                      iconColor="#fff"
                      onPress={() => setData({ ...data, show: 3 })}
                      style={{ backgroundColor: other }}
                    />
                  </Tooltip>
                </View>
              </View>
              {data.identifier && (
                <Button
                  onPress={toBank}
                  mode="elevated"
                  style={{ borderRadius: 5, marginTop: 20 }}
                  textColor="white"
                  buttonColor={other}>
                  Withdraw
                </Button>
              )}
            </Card.Content>
          </Card>
        )}
        {data.show != -1 && (
          <BShit show={data.show}>
            <BottomSheetFlatList
              contentContainerStyle={{ marginVertical: 10 }}
              data={data.data}
              renderItem={({ item }) => <BankList item={item} />}
            />
          </BShit>
        )}
      </View>
    </Provider>
  );
};

export default Withdrawal;
