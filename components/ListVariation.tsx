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
import { Image, View } from 'react-native';

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
  const [data, setData] = useState({
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

  // useEffect(() => {
  //   setData({ ...data, variationList: variationList });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [toggleVar]);

  const ServiceList = ({ item }: { item: ServiceExtra }) => {
    let check = item.name.includes('VTU');
    return (
      <Card
        style={{ marginBottom: 10 }}
        onPress={() => {
          if (check) {
            navigation.navigate('Details', { info: item });
          } else {
            setToggleVar(true);
            setData({ ...data, variationList: item.variations });
            setSelected({
              ...selected,
              selectedItem: {
                name: item.name,
                img: item.image.replace(
                  'https://localhost:8888/vtpassstager4',
                  'http://10.0.2.16:8080',
                ),
                min: item.minimium_amount,
                max: item.maximum_amount,
              },
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
                uri: item.image.replace(
                  'https://localhost:8888/vtpassstager4',
                  'http://10.0.2.16:8080',
                ),
              }}
              size={48}
            />
            <Text
              variant="bodyLarge"
              style={{ fontWeight: 'bold', color: pry, marginLeft: 20 }}>
              {item.name}
            </Text>
          </View>
          <IconButton
            icon="chevron-right"
            underlayColor={pry}
            iconColor={other}
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
            ...route.params,
            selected,
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
                uri: selected.selectedItem.img,
              }}
              size={48}
            />
            <Text
              textBreakStrategy="simple"
              variant="bodyLarge"
              style={{ fontWeight: 'bold', color: pry, marginLeft: 20 }}>
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
              <Avatar.Image source={{ uri: selected.selectedItem.img }} />
              <Text
                variant="headlineMedium"
                style={{ fontWeight: 'bold', color: other, marginLeft: 20 }}>
                {selected.selectedItem.name}
              </Text>
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
                searchResult = filter(data.variation, (item: ServiceExtra) =>
                  item.name.toLocaleLowerCase().includes(text),
                );
              } else {
                searchResult = filter(
                  data.variationList.variations,
                  (item: DataVariation) => item.amount.toString().includes(text) ||
                  item.variation.toLocaleLowerCase().includes(text),
                );
              }

              /* let searchResult = filter(
                data.variation,
                (item: ServiceExtra) => {
                  if (item.variations) {
                    if (
                      item.variations.amount?.includes(text) ||
                      item.name.toLocaleLowerCase().includes(text)
                    ) {
                      return true;
                    }
                  } else {
                    if (item.name.toLocaleLowerCase().includes(text)) {
                      return item;
                    }
                  }
                },
              ); */
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
