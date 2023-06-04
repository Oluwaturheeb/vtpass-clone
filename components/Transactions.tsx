/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { transactions } from './lib/requests';
import { useUser } from './lib/context';
import { BShit, Loader } from './Components';
import {
  Button,
  Card,
  IconButton,
  MD2Colors,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { pSchema, transactionData, transactionSchema } from './types/schema';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  PermissionsAndroid,
  View,
} from 'react-native';
import styles, { other, pry } from './styles';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { money } from './lib/helper';
import { PrinterObj, ScreenProps, Transaction } from './types/types';
import { BLEPrinter, NetPrinter } from 'react-native-thermal-receipt-printer';

const Transactions = ({ navigation }: ScreenProps) => {
  const ref: any = useRef();
  const { id, homeData } = useUser();
  const [trans, setTrans] = useState(transactionData);
  const [details, setDetails] = useState<{
    show: number;
    data: Transaction;
  }>({ show: -1, data: transactionSchema });
  const snapPoints = useMemo(() => ['50%', '60%', '70%', '80%', '95%'], []);

  const [printer, setPrinters] = useState({
    show: false,
    printers: [pSchema],
    curr: {},
  });

  useEffect(() => {
    (async () => {
      let getTrans = await transactions();
      if (getTrans.status) {
        setTrans({ ...trans, data: getTrans.content, loading: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // printer permission and setting
  useEffect(() => {
    (async () => {
      BLEPrinter.init().then(() => {
        BLEPrinter.getDeviceList()
          .then(printers => setPrinters({ ...printer, printers }))
          .catch(e => console.log('err, ', e));
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // closing the modal with backhandler
  useEffect(() => {
    let back = BackHandler.addEventListener('hardwareBackPress', () => {
      if (printer.show) {
        setPrinters({ ...printer, show: false });
      } else if (details.show !== -1) {
        setDetails({ ...details, show: -1 });
        return true;
      } else {
        navigation.goBack();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details.show]);

  const TransItem = ({ item }: { item: Transaction }) => {
    return (
      <Card
        style={{
          borderRadius: 5,
          elevation: 5,
          shadowColor: other,
          backgroundColor: '#fff',
        }}
        onPress={() => {
          setDetails({ show: 2, data: item });
          ref.current.snapToIndex(1);
        }}>
        <Card.Content>
          <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
            <Text
              variant="bodyLarge"
              style={{ fontWeight: 'bold', color: other }}>
              {item.product_name}
            </Text>
            <Text
              style={{
                color: item.status == 'completed' ? other : MD2Colors.red500,
              }}
              variant="bodySmall">
              {item.status.replace(
                item.status[0],
                item.status[0].toLocaleUpperCase(),
              )}
            </Text>
          </View>
          <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
            <Text variant="bodySmall" style={{ color: other }}>
              {item.transactionId}
            </Text>
            <Text
              style={{
                color: other,
                fontWeight: 'bold',
              }}
              variant="bodyLarge">
              {money(item.amount)}
            </Text>
          </View>
          <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
            <Text variant="bodySmall" style={{ color: other }}>
              {item.created_at}
            </Text>
            <Button
              style={{ borderRadius: 5 }}
              labelStyle={{ fontSize: 12 }}
              buttonColor={pry}
              textColor="#fff"
              onPress={() => setDetails({ show: 2, data: item })}>
              View Details
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const buyAgain = () => {
    console.log(details.data);
  };

  const BlueSelect = () => {
    // const []
    const print = (item: PrinterObj) => {
      let toPrint = details.data.receipt;
      BLEPrinter.connectPrinter(item.inner_mac_address);
      BLEPrinter.printBill(toPrint);

      setPrinters({ ...printer, show: false, curr: item });
    };
    const List = ({ item }: { item: PrinterObj }) => (
      <TouchableRipple rippleColor={other + 99} onPress={() => print(item)}>
        <View style={[styles.frow, styles.fVertCenter, { gap: 10 }]}>
          <IconButton icon="bluetooth" />
          <Text variant="bodyMedium">{item.device_name}</Text>
        </View>
      </TouchableRipple>
    );
    return (
      <BShit show={1}>
        <BottomSheetFlatList
          ListEmptyComponent={() => (
            <View style={[styles.fVertCenter, { marginTop: 20 }]}>
              <IconButton icon="bluetooth-off" iconColor="#bbb" size={84} />
              <Text
                variant="bodyLarge"
                style={{ textAlign: 'center', color: '#bbb' }}>
                No Bluetooth device found!
              </Text>
            </View>
          )}
          data={printer.printers}
          renderItem={({ item }) => <List item={item} />}
        />
      </BShit>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {trans.loading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ margin: 10 }}
            ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
            data={trans.key ? trans.filter : trans.data}
            renderItem={({ item }) => <TransItem item={item} />}
            showsVerticalScrollIndicator={false}
          />
          {details.show != -1 && (
            <BottomSheet
              enablePanDownToClose={true}
              handleIndicatorStyle={{ display: 'none' }}
              snapPoints={snapPoints}
              onClose={() => setDetails({ ...details, show: -1 })}
              ref={ref}
              index={details.show}>
              <View style={styles.fVertCenter}>
                <Text
                  variant="titleLarge"
                  style={{
                    color: other,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Transaction Summary
                </Text>
                <Text variant="bodySmall">
                  Kindly verify your transaction summary below
                </Text>
              </View>
              <View
                style={[
                  styles.frow,
                  styles.fcenter,
                  styles.fVertCenter,
                  styles.p2,
                ]}>
                <Image
                  source={{
                    uri: details.data.prodImg.replace('https', 'http'),
                  }}
                  resizeMode="contain"
                  style={{ width: 60, height: 60, marginRight: 10 }}
                />
                <View>
                  <Text
                    variant="bodyLarge"
                    style={{ fontWeight: 'bold', color: pry }}>
                    {details.data.product_name}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={{ fontWeight: 'bold', color: pry }}>
                    {details.data.unique_element}
                  </Text>
                </View>
              </View>
              <Card
                style={{
                  marginHorizontal: 16,
                  borderRadius: 5,
                  padding: 10,
                  backgroundColor: '#fff',
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: 'bold',
                      color: other,
                      paddingVertical: 10,
                    }}>
                    Transaction ID
                  </Text>
                  <Text
                    variant="bodyMedium"
                    selectable={true}
                    style={{ color: MD2Colors.grey500 }}>
                    {details.data.transactionId}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: 'bold',
                      color: other,
                      paddingVertical: 10,
                    }}>
                    Transaction Date
                  </Text>
                  <Text
                    variant="bodyMedium"
                    selectable={true}
                    style={{ color: MD2Colors.grey500 }}>
                    {new Date(details.data.created_at).toLocaleString()}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: 'bold',
                      color: other,
                      paddingVertical: 10,
                    }}>
                    Transaction status
                  </Text>
                  <Text
                    variant="bodyMedium"
                    selectable={true}
                    style={{ color: MD2Colors.grey500 }}>
                    {details.data.status}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: 'bold',
                      color: other,
                      paddingVertical: 10,
                    }}>
                    Amount
                  </Text>
                  <Text
                    variant="bodyMedium"
                    selectable={true}
                    style={{ color: MD2Colors.grey500 }}>
                    {money(details.data.amount)}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: 'bold',
                      color: other,
                      paddingVertical: 10,
                    }}>
                    Convenience Fee
                  </Text>
                  <Text
                    variant="bodyMedium"
                    selectable={true}
                    style={{ color: MD2Colors.grey500 }}>
                    {money(details.data.convinience_fee)}
                  </Text>
                </View>
                <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontWeight: 'bold',
                      color: other,
                      paddingVertical: 10,
                    }}>
                    Total Amount
                  </Text>
                  <Text
                    variant="bodyMedium"
                    selectable={true}
                    style={{ color: MD2Colors.grey500 }}>
                    {money(details.data.total_amount)}
                  </Text>
                </View>
              </Card>
              <Button
                style={{
                  marginVertical: 10,
                  marginHorizontal: 16,
                  borderRadius: 5,
                  marginTop: 20,
                }}
                icon="sync"
                buttonColor={other}
                textColor="white"
                onPress={buyAgain}>
                Buy again
              </Button>
              <View
                style={[
                  styles.frow,
                  styles.fVertCenter,
                  styles.fspace,
                  { marginHorizontal: 10 },
                ]}>
                <Button
                  style={{ flex: 1, margin: 5, borderRadius: 5 }}
                  icon="cash-fast"
                  buttonColor={other}
                  textColor="white"
                  onPress={() => navigation.navigate('Home', homeData)}>
                  Buy Other Services
                </Button>
                <Button
                  style={{ flex: 1, margin: 5, borderRadius: 5 }}
                  icon="printer"
                  buttonColor={other}
                  textColor="white"
                  onPress={() => setPrinters({ ...printer, show: true })}>
                  Print
                </Button>
                <Button
                  style={{ flex: 1, margin: 5, borderRadius: 5 }}
                  icon="flag"
                  buttonColor={other}
                  textColor="white"
                  onPress={() => navigation.navigate('Ticket', details.data)}>
                  Report
                </Button>
              </View>
              {printer.show && <BlueSelect />}
            </BottomSheet>
          )}
        </>
      )}
    </View>
  );
};

export default Transactions;
