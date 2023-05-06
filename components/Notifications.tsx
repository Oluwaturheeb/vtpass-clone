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
  const [notty, setNotty] = useState({ loading: true, data: [] });

  useEffect(() => {
    (async () => {
      let notty = await getNotty(id.userToken);
      console.log(id, notty);
      if (notty.status) {
        setNotty({ loading: false, data: notty.content });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NottyItem = ({ item }) => {
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
      {!notty.loading ? (
        <Loader />
      ) : (
        <FlatList
          contentContainerStyle={{ flex: 1 }}
          data={notty.data}
          renderItem={({ item }) => <NottyItem item={item} />}
          ListEmptyComponent={() => <Empty />}
        />
      )}
    </>
  );
};

export default Notification;
