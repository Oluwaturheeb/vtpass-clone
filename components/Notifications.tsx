import React, { useEffect, useState } from 'react';
import { getNotty } from './lib/requests';
import { useUser } from './lib/context';
import { Loader } from './Components';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Avatar, Card, IconButton, Text } from 'react-native-paper';
import styles, { other, pry } from './styles';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Notty, ScreenProps } from './types/types';
import { nottySchema } from './types/schema';

const Notification = ({ route, navigation }: ScreenProps) => {
  const [notty, setNotty] = useState({
    loading: true,
    data: [nottySchema],
    unread: 0,
  });

  useEffect(() => {
    (async () => {
      let notty = await getNotty();
      if (notty.status == 'success') {
        setNotty({
          loading: false,
          data: notty.message.unreadnotifications.concat(
            notty.message.readnotifications,
          ),
          unread: notty.message.unreadtotalCount,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NottyItem = ({ item }: { item: Notty }) => {
    let img = item.flag.substring(37, item.flag.length - 3);
    const [click, setClick] = useState({ show: false, id: 0 });

    useEffect(() => {
      (async () => {
        if (click.id != 0) {
          console.log('going read');
        }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [click.id]);

    return (
      <Card onPress={() => setClick({ id: item.id, show: !click.show })}>
        <Card.Content style={[styles.frow, { gap: 10 }]}>
          <Avatar.Image
            style={{ backgroundColor: 'transparent' }}
            size={32}
            source={{ uri: img }}
          />
          <View>
            <Text style={{ color: other }} variant="titleSmall">
              {item.content}
            </Text>
            <Text variant="bodySmall">
              {click.show
                ? item.id == click.id
                  ? item.content + '....'
                  : item.preamble
                : item.preamble}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const Empty = () => (
    <View style={[{ flex: 1 }, styles.fcenter]}>
      <IconButton icon="bell-off" size={100} iconColor={pry + '55'} />
      <Text variant="headlineSmall" style={{ color: pry + 'aa' }}>
        You are all caught up!
      </Text>
    </View>
  );

  return (
    <>
      {notty.loading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={{ flex: 1, padding: 16 }}
          data={notty.data}
          renderItem={({ item }) => <NottyItem item={item} />}
          ListEmptyComponent={() => <Empty />}
        />
      )}
    </>
  );
};

export default Notification;
