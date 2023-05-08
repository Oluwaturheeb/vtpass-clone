import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { autoWallets } from './lib/requests';
import { mywallet } from './types/schema';
import { Avatar, Card, FAB, IconButton, Switch, Text } from 'react-native-paper';
import { Alert, FlatList, Image, ImageBackground, View } from 'react-native';
import { Loader } from './Components';
import { MyWallet } from './types/types';
import styles, { other } from './styles';

const AutoWallet = () => {
  const { id } = useUser();
  const [data, setData] = useState({ loading: true, data: [mywallet] });

  useEffect(() => {
    (async () => {
      let data = await autoWallets(id.userToken);

      if (data.status == 'success') {
        setData({ data: data.content, loading: false });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitch = async () => {
    return null;
  };

  const CardItem = ({ item }: { item: MyWallet }) => {
    return (
      <Card
        style={{ borderRadius: 7, backgroundColor: '#fff', minHeight: 180 }}>
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
      {data.loading ? (
        <Loader />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ padding: 10, flex: 1 }}
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
            onPress={() =>
              Alert.alert('VTpass Alert', 'Generate new auto wallet account?', [
                {
                  style: 'cancel',
                  text: 'No',
                },
                {
                  text: 'Yes',
                  onPress: () => console.log('Presssed'),
                },
              ])
            }
          />
        </>
      )}
    </>
  );
};

export default AutoWallet;
