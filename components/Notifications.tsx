import React, { useEffect, useState } from 'react';
import { getNotty } from './lib/requests';
import { useUser } from './lib/context';
import { Loader } from './Components';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import styles, { pry } from './styles';

const Notification = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { id } = useUser();
  const [notty, setNotty] = useState({ loading: true, data: [], unread: 0 });

  useEffect(() => {
    (async () => {
      let notty = await getNotty(id.userToken);
      if (notty.status == 'success') {
        setNotty({
          loading: false,
          data: notty.message.unreadnotifications.join(
            notty.message.readnotifications,
          ),
          unread: notty.message.unreadtotalCount,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NottyItem = ({ item, index }) => {
    return (
      <Card>
        <Card.Content>
          <Text>Hi</Text>
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
          contentContainerStyle={{ flex: 1 }}
          data={notty.data}
          renderItem={({ item, index }) => (
            <NottyItem item={item} index={index} />
          )}
          ListEmptyComponent={() => <Empty />}
        />
      )}
    </>
  );
};

export default Notification;
