import React, { useEffect, useState } from 'react';
import { addBank, getBanks, getUserBanks } from './lib/requests';
// import { mybank } from './types/schema';
import {
  Button,
  Card,
  FAB,
  IconButton,
  Switch,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { BackHandler, FlatList, Image, View } from 'react-native';
import { BShit, Loader } from './Components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Bank, MyBank } from './types/types';
import styles, { other } from './styles';
import { Input } from './Auth';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

const NewBank = ({ bankData }: { bankData: Bank[] }) => {
  const [bank, setBank] = useState({
    bank_code: '',
    account_name: '',
    account_number: '',
    selected: '',
    show: -1,
    btn: false,
    message: '',
  });

  const BankList = ({ item }: { item: Bank }) => {
    return (
      <TouchableRipple
        rippleColor={other + 99}
        onPress={() =>
          setBank({
            ...bank,
            bank_code: item.bank_code,
            selected: item.bank_name,
            show: -1,
          })
        }>
        <View style={[styles.frow, styles.fVertCenter]}>
          <IconButton icon="bank" iconColor={other} />
          <View>
            <Text variant="bodyLarge">{item.bank_name}</Text>
          </View>
        </View>
      </TouchableRipple>
    );
  };

  const addBankAccount = async () => {
    setBank({ ...bank, btn: true });
    let req = await addBank({
      bank_code: bank.bank_code,
      account_name: bank.account_name,
      account_number: bank.account_name,
    });
    setBank({ ...bank, btn: false, message: req.message });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <TouchableRipple
          rippleColor={other + 99}
          onPress={() => setBank({ ...bank, show: 2 })}>
          <View
            style={[
              styles.frow,
              styles.fspace,
              styles.fVertCenter,
              { borderWidth: 1, borderColor: other, borderRadius: 5 },
            ]}>
            <Text variant="bodyLarge" style={{ padding: 10 }}>
              {bank.selected || 'Select Bank'}
            </Text>
            <IconButton icon="chevron-down" iconColor={other} />
          </View>
        </TouchableRipple>
        <View style={{ margin: 5 }} />
        <Input
          placeholder="Account name"
          value={bank.account_name}
          state={(e: string) => setBank({ ...bank, account_name: e })}
        />
        <View style={{ margin: 5 }} />
        <Input
          placeholder="Account number"
          value={bank.account_number}
          state={(e: string) => setBank({ ...bank, account_number: e })}
        />
        <View style={{ margin: 5 }} />
        {bank.message && (
          <Text variant="bodySmall" style={{ padding: 10 }}>
            {bank.message}
          </Text>
        )}
        <Button
          onPress={addBankAccount}
          disabled={bank.btn}
          loading={bank.btn}
          mode="elevated"
          textColor="white"
          buttonColor={other}
          style={{ borderRadius: 5 }}>
          Add Bank
        </Button>
      </View>
      {bank.show != -1 && (
        <BShit show={bank.show}>
          <BottomSheetFlatList
            contentContainerStyle={{ margin: 10, marginRight: 20 }}
            data={bankData}
            renderItem={({ item }: { item: Bank }) => <BankList item={item} />}
          />
        </BShit>
      )}
    </View>
  );
};

const UserBanks = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState<{
    loading: boolean;
    data: MyBank[];
    banks: Bank[];
    switchView: number;
  }>({
    loading: true,
    data: [],
    banks: [],
    switchView: 0,
  });

  useEffect(() => {
    (async () => {
      let user = await getUserBanks();
      let banks = await getBanks();

      if (user.status == 'success') {
        setData({
          ...data,
          data: user.content,
          loading: false,
          banks: banks.content,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleSwitch = async () => {
  //   return null;
  // };

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (data.switchView == 1) {
      setData({ ...data, switchView: 0 });
      return true;
    } else {
      navigation.goBack();
    }
  });

  const BankList = () => {
    const CardItem = ({ item }: { item: MyBank }) => {
      return (
        <Card style={{ borderRadius: 7, backgroundColor: '#fff' }}>
          <Card.Content>
            <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
              <Image
                source={require('./assets/vtpass.png')}
                resizeMode="contain"
                style={{ width: 100, height: 40, opacity: 0.8 }}
              />
              <Switch
                style={{ marginVertical: -10 }}
                color={other}
                value={item.status == 'active' ? true : false}
              />
            </View>
            <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
              <View>
                <Text variant="titleLarge" style={{ color: other }}>
                  {item.bank_name}
                </Text>
                <Text variant="bodyLarge">{item.account_name}</Text>
                <Text
                  variant="bodyLarge"
                  selectable={true}
                  style={{ marginVertical: 10 }}
                  selectionColor={other}>
                  {item.account_number}
                </Text>
              </View>
              <IconButton icon="bank" size={72} iconColor={other + '99'} />
            </View>
          </Card.Content>
        </Card>
      );
    };

    return (
      <>
        <FlatList
          contentContainerStyle={{
            padding: 10,
          }}
          showsVerticalScrollIndicator={false}
          data={data.data}
          renderItem={({ item }) => <CardItem item={item} />}
          ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
        />
        <FAB
          style={{
            position: 'absolute',
            right: 24,
            bottom: 24,
            backgroundColor: other,
            borderRadius: 100,
          }}
          color="white"
          icon="plus"
          onPress={() => setData({ ...data, switchView: 1 })}
        />
      </>
    );
  };

  return (
    <>
      {data.loading ? (
        <Loader />
      ) : (
        <View>
          {data.switchView == 0 ? (
            <BankList />
          ) : (
            <NewBank bankData={data.banks} />
          )}
        </View>
      )}
    </>
  );
};

export default UserBanks;
