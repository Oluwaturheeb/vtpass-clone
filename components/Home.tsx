import React, { useEffect } from 'react';
// import request from './lib/axios';
import { Button, Card, IconButton, MD2Colors, Text } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
// import { FlatList } from 'react-native-gesture-handler';
import { View, FlatList, StyleSheet } from 'react-native';
import styles, { pry, other } from './styles';
import BottomNav from './BottomNav';

const Home = ({ navigation, route }: { navigation: any; route: any }) => {
  const services: Services = route.params;

  // reset the navigation state
  useEffect(() => {
    navigation.dispatch((state: any) => {
      const routes = state.routes.filter((r: any) => r.name !== 'Welcome');
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ServiceItems = ({ item }: { item: Service }) => {
    return (
      <Card
        style={[{ width: '31.5%', height: 120, marginHorizontal: '1%' }]}
        onPress={() =>
          navigation.navigate('Variations', {
            variation: item.extras,
            title: item.name,
          })
        }>
        <Card.Content style={css.serviceCard}>
          <IconButton
            icon={
              item.name.includes('Phone')
                ? 'cellphone'
                : item.name.includes('Internet')
                ? 'wifi-arrow-up-down'
                : item.name.includes('Subscription')
                ? 'television'
                : item.name.includes('Elect')
                ? 'flash-outline'
                : item.name.includes('Education')
                ? 'school-outline'
                : item.name.includes('Insurance')
                ? 'account-reactivate-outline'
                : item.name.includes('Other')
                ? 'bank-plus'
                : 'book'
            }
            iconColor={pry}
            style={{ margin: -10 }}
          />
          <Text
            variant="bodySmall"
            style={{ marginTop: 5, color: pry, textAlign: 'center' }}>
            {item.name}
          </Text>
        </Card.Content>
      </Card>
    );
  };

  const Header = () => (
    <View style={[styles.fspace, styles.frow, styles.fVertCenter, styles.my2]}>
      <View>
        <Text variant="bodySmall" style={{ color: pry }}>
          Hello,
        </Text>
        <Text variant="bodySmall" style={{ color: pry }}>
          What do you want to do?
        </Text>
      </View>
      <Button
        icon="lightbulb-on"
        labelStyle={{ color: MD2Colors.white, fontSize: 10 }}
        style={{ backgroundColor: pry, borderRadius: 6 }}>
        Find Token
      </Button>
    </View>
  );

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => <Header />}
        // ListFooterComponent={() => <BottomNav />}
        data={services?.content}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
        numColumns={3}
        renderItem={({ item }) => <ServiceItems item={item} />}
        contentContainerStyle={{ padding: 10 }}
      />
      <BottomNav />
    </View>
  );
};

export default Home;

const css = StyleSheet.create({
  serviceCard: {
    ...styles.fcenter,
    ...styles.fVertCenter,
    backgroundColor: other + '11',
    height: '100%',
    borderRadius: 12,
  },
});
