/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import { Button, Card, MD2Colors, Text } from 'react-native-paper';
import styles, { other } from './styles';
import { money } from './lib/axios';
import Animated, { BounceInDown } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import { useUser } from './lib/context';
import { walletPay } from './lib/requests';
import { Loader } from './Components';
import WebView from 'react-native-webview';
import { encode } from 'base-64';

const TransactionDetails = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { getUser } = useUser();
  let {
    selectedItem,
    selectedVar,
    trans: {
      content,
      card_option,
      mobile_payment_setting_type,
      card_option_dynamic,
      card_option_interswitch,
      card_option_ravepay,
      card_option_ravepay_mobile_bank_ussd,
      ussd_option_dynamic,
      bank_transfer_option_dynamic,
    },
  } = route.params;
  let balanceCheck =
    Number(content.amount) + Number(content.convinience_fee) >
    Number(getUser?.customer?.wallet);
  console.log(mobile_payment_setting_type);

  const ref: any = useRef();
  const snapPoints = useMemo(() => ['50%', '60%', '70%', '80%', '95%'], []);
  const [btn, setBtn] = useState(false);
  const [pay, setPay] = useState('');

  useEffect(() => {
    if (pay) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        setPay('');
        return true;
      });
    } else {
      BackHandler.removeEventListener('hardwareBackPress', () => true);
    }
  }, [pay]);

  return (
    <View style={{ flex: 1 }}>
      {btn ? (
        <Loader />
      ) : (
        <>
          {!pay ? (
            <View style={{ height: '100%' }}>
              <Card style={style.tcard}>
                <Text
                  variant="titleSmall"
                  style={{ color: other, textAlign: 'center' }}>
                  Transaction Information
                </Text>
                <View style={[styles.frow, styles.fspace, { padding: 10 }]}>
                  <Text variant="bodySmall" style={style.text}>
                    Service
                  </Text>
                  <Text variant="bodySmall" style={{ color: other }}>
                    {content.product_name}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fspace, { padding: 10 }]}>
                  <Text variant="bodySmall" style={style.text}>
                    Phone number
                  </Text>
                  <Text variant="bodySmall" style={{ color: other }}>
                    {content.phone}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fspace, { padding: 10 }]}>
                  <Text variant="bodySmall" style={style.text}>
                    Email
                  </Text>
                  <Text variant="bodySmall" style={{ color: other }}>
                    {content.email}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fspace, { padding: 10 }]}>
                  <Text variant="bodySmall" style={style.text}>
                    Transaction ID
                  </Text>
                  <Text variant="bodySmall" style={{ color: other }}>
                    {content.transactionId}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fspace, { padding: 10 }]}>
                  <Text variant="bodySmall" style={style.text}>
                    Amount
                  </Text>
                  <Text variant="bodySmall" style={{ color: other }}>
                    {money(content.amount)}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fspace, { padding: 10 }]}>
                  <Text variant="bodySmall" style={style.text}>
                    Convinience fee
                  </Text>
                  <Text variant="bodySmall" style={{ color: other }}>
                    {money(content.convinience_fee)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.frow,
                    {
                      marginTop: 10,
                      borderTopWidth: 1,
                      borderTopColor: other + '33',
                      justifyContent: 'flex-end',
                      padding: 10,
                    },
                  ]}>
                  <Text
                    variant="bodyMedium"
                    style={{ color: other, marginRight: 10 }}>
                    Total Amount
                  </Text>
                  <Text variant="bodyMedium" style={{ color: other }}>
                    {money(
                      Number(content.amount) + Number(content.convinience_fee),
                    )}
                  </Text>
                </View>
              </Card>
              <Animated.View
                entering={BounceInDown.duration(2000)}
                style={style.bModal}>
                <BottomSheet
                  handleIndicatorStyle={{ backgroundColor: other + '55' }}
                  snapPoints={snapPoints}
                  style={{ padding: 10 }}
                  ref={ref}
                  index={0}>
                  {mobile_payment_setting_type != '' ||
                    (mobile_payment_setting_type == undefined && (
                      <View>
                        {card_option && (
                          <Button
                            mode="text"
                            textColor={other}
                            style={{ borderRadius: 0 }}
                            labelStyle={{ textAlign: 'center' }}
                            icon="credit-card"
                            onPress={() => setPay('card')}>
                            Pay with Card
                          </Button>
                        )}
                        {card_option_interswitch && (
                          <Button
                            mode="text"
                            textColor={other}
                            style={{ borderRadius: 0 }}
                            labelStyle={{ textAlign: 'center' }}
                            icon="wallet"
                            onPress={async () => {}}>
                            Pay with InterSwitch
                          </Button>
                        )}
                        {ussd_option_dynamic && (
                          <Button
                            mode="text"
                            textColor={other}
                            style={{ borderRadius: 0 }}
                            labelStyle={{ textAlign: 'center' }}
                            icon="pound"
                            onPress={() => setPay('card')}>
                            Pay with USSD
                          </Button>
                        )}
                        {bank_transfer_option_dynamic && (
                          <Button
                            mode="text"
                            textColor={other}
                            style={{ borderRadius: 0 }}
                            labelStyle={{ textAlign: 'center' }}
                            icon="bank-transfer"
                            onPress={() => setPay('card')}>
                            Pay with Bank Transfer
                          </Button>
                        )}
                      </View>
                    ))}
                  {!card_option && (
                    <View>
                      <Button
                        mode="text"
                        textColor={other}
                        style={{ borderRadius: 0 }}
                        labelStyle={{ textAlign: 'center' }}
                        icon="wallet"
                        disabled={balanceCheck ? true : false}
                        onPress={async () => {
                          setBtn(true);
                          let pay = await walletPay(content.transactionId);
                          console.log(JSON.stringify(pay, '', 2));
                          if (pay.status) {
                            navigation.navigate('Status', pay);
                          }
                        }}>
                        Pay with Wallet
                      </Button>
                      {balanceCheck && (
                        <Text
                          variant="bodySmall"
                          style={{
                            textAlign: 'center',
                            marginVertical: -5,
                            color: MD2Colors.red500,
                          }}>
                          Insufficient balance
                        </Text>
                      )}
                    </View>
                  )}
                </BottomSheet>
              </Animated.View>
            </View>
          ) : (
            <WebView
              style={{ flex: 1 }}
              userAgent="Mozilla/5.0 (Linux; Android 13.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
              source={{
                uri: `http://localhost:8080/mobile-api/v1/mobile-process-dynamic-pay/${pay}/${encode(
                  encode(encode(content.id)),
                )}`,
              }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default TransactionDetails;

const style = StyleSheet.create({
  tcard: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: MD2Colors.grey50,
    padding: 16,
  },
  text: { color: other, fontWeight: 'bold' },
  card: { height: '100%', marginTop: 12 },
  bModal: {
    position: 'absolute',
    bottom: -16,
    height: '100%',
    width: '100%',
    // shadowColor: 'red',
    // elevation: 6,
    backgroundColor: 'transparent',
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: other + 20,
    paddingHorizontal: 30,
    paddingVertical: 2.5,
    borderRadius: 10,
  },
});
