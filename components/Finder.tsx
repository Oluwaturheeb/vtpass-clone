import React, { useEffect, useState } from 'react';
import { Button, Card, IconButton, MD2Colors, Text } from 'react-native-paper';
import { Input } from './Auth';
import { BackHandler, FlatList, View } from 'react-native';
import { Loader } from './Components';
import styles, { other, pry } from './styles';
import { findToken } from './lib/requests';

const Finder = ({ navigation }: { navigation: any }) => {
  const [data, setData] = useState({ loading: false, data: [], switch: false });
  const [input, setInput] = useState({ meter: '', phone: '' });
  const [error, setError] = useState({ meter: '', phone: '', error: false });

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (data.switch) {
      setData({ ...data, switch: false });
      return true;
    } else {
      navigation.goBack();
    }
  });

  useEffect(() => {
    if (error.error) {
      setTimeout(() => setError({ meter: '', phone: '', error: false }), 4000);
    }
  }, [error]);

  // console.log(JSON.stringify(data.data, '', 2));

  const find = async () => {
    setData({ ...data, loading: true });

    if (!input.meter.trim()) {
      setError({ ...error, error: true, meter: 'Meter number is required!' });
    } else if (!input.phone.trim()) {
      setError({ ...error, error: true, phone: 'Phone number is required!' });
    } else {
      let req = await findToken({
        biller_code: input.meter,
        phone: input.phone,
      });

      if (req.status == 'success') {
        return setData({
          ...data,
          data: req.content,
          switch: true,
          loading: false,
        });
      }
    }
    return setData({ ...data, loading: false });
  };

  const Items = ({ item }) => {
    return (
      <Card>
        <Card.Content />
      </Card>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {data.loading && <Loader />}
      {!data.loading && !data.switch && (
        <View>
          <View style={[styles.frow, styles.fVertCenter]}>
            <IconButton
              icon="information"
              size={32}
              iconColor={other}
              style={{ marginLeft: -10 }}
            />
            <Text style={{ flex: 1 }} variant="bodySmall">
              Fill the search form below to find your previously purchased
              token.
            </Text>
          </View>
          <Text variant="titleSmall" style={{ color: other }}>
            Meter Number
          </Text>
          <Input
            placeholder="Meter number"
            value={input.meter}
            state={(e: any) => setInput({ ...input, meter: e })}
          />
          {error.meter && (
            <Text
              variant="bodySmall"
              style={{ color: MD2Colors.red400, padding: 5 }}>
              {error.meter}
            </Text>
          )}
          <View style={{ margin: 5 }} />
          <Text variant="titleSmall" style={{ color: other }}>
            Phone Number
          </Text>
          <Input
            placeholder="Phone number"
            value={input.phone}
            state={(e: any) => setInput({ ...input, phone: e })}
          />
          {error.phone && (
            <Text
              variant="bodySmall"
              style={{ color: MD2Colors.red400, padding: 5 }}>
              {error.phone}
            </Text>
          )}
          <Button
            disabled={data.loading}
            loading={data.loading}
            onPress={find}
            mode="elevated"
            style={{ borderRadius: 5, marginTop: 10 }}
            textColor="white"
            buttonColor={other}>
            Search
          </Button>
        </View>
      )}
      {!data.loading && data.switch && (
        <FlatList
          contentContainerStyle={{ flex: 1, padding: 5 }}
          renderItem={({ item }) => <Items item={item} />}
          data={data.data}
          ItemSeparatorComponent={() => <View style={{margin: 5}} />}
          ListEmptyComponent={() => (
            <View style={[styles.fcenter, { height: '100%' }]}>
              <IconButton icon="magnify" size={84} iconColor={other + 99} />
              <Text variant="bodyLarge" style={{ color: pry + 66 }}>
                No result found.
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Finder;
