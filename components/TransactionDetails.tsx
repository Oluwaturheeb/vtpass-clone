import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import styles, { other, pry } from './styles';
import { money } from './lib/axios';
import Animated, { BounceInDown } from 'react-native-reanimated';

const TransactionDetails = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  let {
    selectedItem,
    selectedVar,
    trans: { content },
  } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <Card style={[styles.p2, { margin: 10, borderRadius: 5 }]}>
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
          <Text variant="bodyMedium" style={{ color: other, marginRight: 10 }}>
            Total Amount
          </Text>
          <Text variant="bodyMedium" style={{ color: other }}>
            {money(Number(content.amount) + Number(content.convinience_fee))}
          </Text>
        </View>
      </Card>
      <Animated.View
        entering={BounceInDown.duration(2000)}
        style={style.bModal}>
        <Card style={style.card}>
          <Card.Content style={{ height: 200 }}>
            <View style={style.handle} />
            <Text>Oyrjeh</Text>
          </Card.Content>
        </Card>
      </Animated.View>
    </View>
  );
};

export default TransactionDetails;

const style = StyleSheet.create({
  text: { color: other, fontWeight: 'bold' },
  card: { height: '100%', marginTop: 12 },
  bModal: {
    position: 'absolute',
    bottom: -16,
    height: '54%',
    width: '100%',
    shadowColor: 'red',
    elevation: 6,
    backgroundColor: 'transaparent',
  },
  handle: {
    alignSelf: 'center',
    backgroundColor: other + 20,
    paddingHorizontal: 30,
    paddingVertical: 2.5,
    borderRadius: 10,
  },
});
