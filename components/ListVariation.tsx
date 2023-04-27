import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import {
  Avatar,
  Card,
  IconButton,
  MD2Colors,
  Text,
  TextInput,
} from 'react-native-paper';
import styles, { other, pry } from './styles';
import filter from 'lodash.filter';
import { View } from 'react-native';

const ListVariation = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  // variations
  let params = route.params;
  let variation: ServiceExtra = params.variation;
  let variationList: ServiceExtraVariation = params.variationList;

  // state
  const [data, setData] = useState<{
    variation: ServiceExtra;
    variationList: ServiceExtraVariation;
    filter: any;
    key: string;
  }>({
    variation,
    variationList: variationList,
    filter: [],
    key: '',
  });

  const [selected, setSelected] = useState({
    selectedVar: {},
    selectedItem: {},
  });
  const [toggleVar, setToggleVar] = useState(false);

  const ServiceList = ({ item }: { item: ServiceExtra }) => {
    let check = item.name.includes('VTU');
    return (
      <Card
        style={{ marginBottom: 10 }}
        onPress={() => {
          if (check) {
            navigation.navigate('Details', {
              selectedItem: { ...item },
            });
          } else {
            setToggleVar(true);
            setData({ ...data, variationList: item.variations });
            setSelected({
              ...selected,
              selectedItem: { ...item },
            });
          }
        }}>
        <Card.Content
          style={[
            styles.frow,
            styles.fVertCenter,
            styles.fspace,
            { backgroundColor: pry + '22', borderRadius: 12 },
          ]}>
          <View style={[styles.frow, styles.fVertCenter]}>
            <Avatar.Image
              source={{
                uri: item.image.replace('https', 'http'),
              }}
              size={36}
            />
            <Text
              variant="bodyMedium"
              style={{ fontWeight: 'bold', color: pry, marginLeft: 12 }}>
              {item.name}
            </Text>
          </View>
          <IconButton
            icon="chevron-right"
            underlayColor={pry}
            iconColor={other}
            style={{ marginVertical: -10 }}
          />
        </Card.Content>
      </Card>
    );
  };

  const VariationList = ({ item }: { item: DataVariation }) => {
    return (
      <Card
        style={{ marginBottom: 10, shadowColor: other }}
        onPress={() =>
          navigation.navigate('Details', {
            title: selected.selectedItem.name,
            ...selected,
            selectedVar: item,
            productId: variation.product_id,
          })
        }>
        <Card.Content
          style={[
            styles.frow,
            styles.fVertCenter,
            styles.fspace,
            { backgroundColor: pry + '22', borderRadius: 12 },
          ]}>
          <View style={[styles.frow, styles.fVertCenter, { width: '70%' }]}>
            <Avatar.Image
              source={{
                uri: selected.selectedItem.image.replace('https', 'http'),
              }}
              size={36}
            />
            <Text
              textBreakStrategy="simple"
              variant="bodySmall"
              style={{ fontWeight: 'bold', color: pry, marginLeft: 12 }}>
              {item.variation}
            </Text>
          </View>
          <IconButton
            icon="chevron-right"
            underlayColor={pry}
            iconColor={other}
            size={28}
            style={{ marginVertical: -10 }}
          />
        </Card.Content>
      </Card>
    );
  };

  return (
    <FlatList
      ListHeaderComponentStyle={{ marginBottom: 20 }}
      ListHeaderComponent={
        <>
          {toggleVar && (
            <View
              style={[styles.frow, styles.fVertCenter, { marginBottom: 10 }]}>
              <Avatar.Image
                source={{ uri: selected.selectedItem.image.replace('https', 'http') }}
                size={42}
              />
              <View>
                <Text
                  variant="bodyLarge"
                  style={{ fontWeight: 'bold', color: other, marginLeft: 12 }}>
                  {selected.selectedItem.name}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ marginLeft: 12, color: other + 'aa' }}>
                  {selected.selectedItem.name} - Get instant Top up
                </Text>
              </View>
            </View>
          )}
          <TextInput
            placeholder="Search..."
            placeholderTextColor={other + '88'}
            mode="outlined"
            underlineColor="#00000000"
            outlineColor={MD2Colors.lightBlue100 + '88'}
            activeOutlineColor={other + 'cc'}
            activeUnderlineColor="#00000000"
            value={data.key}
            onChangeText={(text: string) => {
              let searchResult;
              if (!toggleVar) {
                searchResult = filter(data.variation, (item: any) =>
                  item.name.toLocaleLowerCase().includes(text),
                );
              } else {
                searchResult = filter(
                  data.variationList.variations,
                  (item: any) =>
                    item.amount.toString().includes(text) ||
                    item.variation.toLocaleLowerCase().includes(text),
                );
              }
              setData({ ...data, filter: searchResult, key: text });
            }}
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'transparent',
              borderRadius: 5,
              elevation: 3,
              shadowColor: MD2Colors.lightBlue100,
            }}
            left={
              <TextInput.Icon
                icon="magnify"
                iconColor={other}
                style={{ marginBottom: -5 }}
              />
            }
          />
        </>
      }
      data={
        data.key == ''
          ? toggleVar
            ? data.variationList.variations
            : data.variation
          : data.filter
      }
      renderItem={({ item }) =>
        toggleVar ? <VariationList item={item} /> : <ServiceList item={item} />
      }
      contentContainerStyle={{ padding: 20 }}
    />
  );
};

export default ListVariation;
