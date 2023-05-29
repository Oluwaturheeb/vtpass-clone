import React, { useEffect, useState } from 'react';
import { Card, IconButton, MD2Colors, Text } from 'react-native-paper';
import { getWithdrawal } from './lib/requests';
import { FlatList, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Withdrawal } from './types/types';
import { Loader } from './Components';
import styles, { other } from './styles';
import { money } from './lib/helper';

const Withdrawals = () => {
  const [data, setData] = useState({ loading: true, data: [] });

  useEffect(() => {
    (async () => {
      let req = await getWithdrawal();
      setData({ loading: false, data: req.content });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Item = ({ item }: { item: Withdrawal }) => {
    return (
      <Card style={{ borderRadius: 5, padding: 0 }}>
        <Card.Content style={[styles.frow, styles.fVertCenter, styles.fspace]}>
          <View>
            <Text variant="titleSmall" style={{ color: other }}>
              {money(item.amount)}
            </Text>
            {/* <Text variant="bodyLarge" style={{ color: other }}>
              Commission withdrawn to {item.destination}
            </Text> */}
            {item.destination == 'bank' && (
              <View>
                <Text variant="bodySmall">{item.bank_name || 'N/A'}</Text>
                <Text variant="bodySmall">{item.account_name}</Text>
                <Text variant="bodySmall">{item.account_number}</Text>
              </View>
            )}
            <Text variant="bodySmall">
              {new Date(item.created_at).toString()}
            </Text>
          </View>
          <IconButton
            icon={
              item.status == 'pending'
                ? 'clock'
                : item.status == 'approved'
                ? 'check'
                : 'alert-circle'
            }
            iconColor={item.status == 'declined' ? MD2Colors.red400 : other}
          />
        </Card.Content>
      </Card>
    );
  };

  return (
    <View>
      {data.loading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={{ padding: 10 }}
          data={data.data}
          bouncesZoom={true}
          ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
          renderItem={({ item }) => <Item item={item} />}
        />
      )}
    </View>
  );
};

export default Withdrawals;
