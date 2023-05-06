/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { transactions } from './lib/requests';
import { useUser } from './lib/context';
import { Loader } from './Components';
import { Button, Card, MD2Colors, Text } from 'react-native-paper';
import { transactionData, transactionSchema } from './types/schema';
import { FlatList, Image, View } from 'react-native';
import styles, { other, pry } from './styles';
import BottomSheet, { useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';
import { dateTimeFormat, money } from './lib/helper';
import { ScreenProps, Transaction } from './types/types';

const Transactions = ({ navigation }: ScreenProps) => {
  const ref: any = useRef();
  const { id, homeData } = useUser();
  const [trans, setTrans] = useState(transactionData);
  const [details, setDetails] = useState<{
    show: number;
    data: Transaction;
  }>({ show: -1, data: transactionSchema });
  const snapPoints = useMemo(() => ['50%', '60%', '70%', '80%', '95%'], []);

  useEffect(() => {
    (async () => {
      let getTrans = await transactions(id.userToken);
      if (getTrans.status) {
        setTrans({ ...trans, data: getTrans.content, loading: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const TransItem = ({ item }: { item: Transaction }) => {
    return (
      <Card
        style={{ borderRadius: 5, elevation: 5, shadowColor: other }}
        onPress={() => {
          setDetails({ show: 2, data: item });
          ref.current.snapToIndex(5);
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

  const animated = useBottomSheetSpringConfigs({
    damping: 10,
    overshootClamping: true,
    restDisplacementThreshold: 0.9,
    restSpeedThreshold: 0.9,
  });

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
          <BottomSheet
            enablePanDownToClose={true}
            handleIndicatorStyle={{ display: 'none' }}
            snapPoints={snapPoints}
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
            <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
              <Image
                source={{ uri: details.data.prodImg.replace('https', 'http') }}
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
              style={{ marginHorizontal: 16, borderRadius: 5, padding: 10 }}>
              <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                <Text
                  variant="bodyLarge"
                  style={{ fontWeight: 'bold', color: other }}>
                  Transaction ID
                </Text>
                <Text selectable={true} style={{ color: MD2Colors.grey500 }}>
                  {details.data.transactionId}
                </Text>
              </View>
              <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: 'bold',
                    color: other,
                    paddingVertical: 10,
                  }}>
                  Transaction Date
                </Text>
                <Text selectable={true} style={{ color: MD2Colors.grey500 }}>
                  {new Date(details.data.created_at).toLocaleString()}
                </Text>
              </View>
              <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: 'bold',
                    color: other,
                    paddingVertical: 10,
                  }}>
                  Transaction status
                </Text>
                <Text selectable={true} style={{ color: MD2Colors.grey500 }}>
                  {details.data.status}
                </Text>
              </View>
              <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: 'bold',
                    color: other,
                    paddingVertical: 10,
                  }}>
                  Amount
                </Text>
                <Text selectable={true} style={{ color: MD2Colors.grey500 }}>
                  {money(details.data.amount)}
                </Text>
              </View>
              <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: 'bold',
                    color: other,
                    paddingVertical: 10,
                  }}>
                  Convenience Fee
                </Text>
                <Text selectable={true} style={{ color: MD2Colors.grey500 }}>
                  {money(details.data.convinience_fee)}
                </Text>
              </View>
              <View style={[styles.frow, styles.fVertCenter, styles.fspace]}>
                <Text
                  variant="bodyLarge"
                  style={{
                    fontWeight: 'bold',
                    color: other,
                    paddingVertical: 10,
                  }}>
                  Total Amount
                </Text>
                <Text selectable={true} style={{ color: MD2Colors.grey500 }}>
                  {money(details.data.total_amount)}
                </Text>
              </View>
            </Card>
            <View
              style={[
                styles.frow,
                styles.fVertCenter,
                styles.fspace,
                { marginTop: 20, marginHorizontal: 10 },
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
                onPress={() => navigation.navigate('Home', homeData)}>
                Print
              </Button>
            </View>
          </BottomSheet>
        </>
      )}
    </View>
  );
};

export default Transactions;
