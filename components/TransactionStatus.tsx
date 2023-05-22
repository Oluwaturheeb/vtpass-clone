import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, IconButton, MD2Colors, Text } from 'react-native-paper';
import styles, { other, pry } from './styles';
import { money } from './lib/helper';
import { Share } from 'react-native';
import { useUser } from './lib/context';
import { userBalance } from './lib/requests';
import Animated, { StretchInX } from 'react-native-reanimated';

const Status = ({ route, navigation }: { route: any; navigation: any }) => {
  const param: TransactionStatus = route.params;
  const { setUser, getUser, homeData } = useUser();

  useEffect(() => {
    (async () => {
      let bal = await userBalance();
      setUser({
        ...getUser,
        customer: { ...getUser.customer, wallet: bal.balance },
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.fVertCenter, styles.fcenter, { flex: 1 }]}>
      {param.status == 'success' && (
        <View style={{ marginTop: -75, alignItems: 'center' }}>
          <Animated.View entering={StretchInX.duration(2000)}>
            <IconButton
              size={82}
              icon="check"
              iconColor="#fff"
              style={{ backgroundColor: other }}
            />
          </Animated.View>
          <Text variant="titleMedium" style={{ color: other, marginTop: 10 }}>
            Success
          </Text>
        </View>
      )}
      {param.status == 'failed' && (
        <>
          <IconButton
            size={72}
            icon="close"
            iconColor="#fff"
            style={{ backgroundColor: MD2Colors.red400 }}
          />
          <Text variant="titleMedium">Failed</Text>
        </>
      )}
      <View style={{ marginTop: 50 }}>
        <Text
          variant="titleLarge"
          style={{ fontWeight: 'bold', color: pry, textAlign: 'center' }}>
          {param.content.product_name}
        </Text>
        <View style={[styles.frow, styles.fspace, { marginVertical: 10 }]}>
          <Text
            variant="bodyMedium"
            style={{ fontWeight: 'bold', color: other }}>
            Destination
          </Text>
          <Text variant="bodyMedium" style={{ color: other }}>
            {param.content.unique_element}
          </Text>
        </View>
        <View style={[styles.frow, styles.fspace, { marginVertical: 10 }]}>
          <Text
            variant="bodyMedium"
            style={{ fontWeight: 'bold', color: other }}>
            Amount
          </Text>
          <Text variant="bodyMedium" style={{ color: other }}>
            {money(param.content.total_amount)}
          </Text>
        </View>
        <View style={[styles.frow, styles.fspace, { marginVertical: 10 }]}>
          <Text
            variant="bodyMedium"
            style={{ fontWeight: 'bold', color: other }}>
            Trans.ID
          </Text>
          <Text variant="bodyMedium" style={{ color: other }}>
            {param.content.transactionId}
          </Text>
        </View>
      </View>
      <View style={[styles.frow, styles.fspace, styles.m1]}>
        <IconButton
          icon="share-variant-outline"
          iconColor="#fff"
          onPress={async () => {
            // await Linking.openURL('share://');
            let share = await Share.share({
              title: 'Share Receipt',
              message: param.content.receipt,
            });
            console.log(share);
          }}
          size={32}
          style={{ backgroundColor: other }}
        />
        <IconButton
          icon="account-multiple-plus"
          iconColor="#fff"
          onPress={async () => {
            // await Linking.openURL('share://');
            let share = await Share.share({
              title: 'Share Receipt',
              message: param.content.receipt,
            });
            console.log(share);
          }}
          size={32}
          style={{ backgroundColor: other }}
        />
        <IconButton
          icon="printer"
          iconColor="#fff"
          onPress={async () => {
            // await Linking.openURL('share://');
            let share = await Share.share({
              title: 'Share Receipt',
              message: param.content.receipt,
            });
            console.log(share);
          }}
          size={32}
          style={{ backgroundColor: other }}
        />
      </View>
      <Button
        mode="elevated"
        buttonColor={other}
        textColor="white"
        onPress={() => navigation.navigate('Home', homeData)}
        icon="home">
        Home
      </Button>
    </View>
  );
};

export default Status;
