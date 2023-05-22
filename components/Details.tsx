/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  IconButton,
  MD2Colors,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import styles, { other, pry } from './styles';
import {
  selectContactPhone,
  ContactPhoneSelection,
} from 'react-native-select-contact';
import { getTvInfo, initTrans } from './lib/requests';
import { useUser } from './lib/context';
import { ScrollView } from 'react-native-gesture-handler';
import { money } from './lib/axios';
import { BShit, Loader } from './Components';
import { billerInfo } from './types/schema';
import filter from 'lodash.filter';
import { Variation } from './types/types';

const Details = ({ route, navigation }: { navigation: any; route: any }) => {
  const { id, getUser } = useUser();
  const param = route.params;
  const [form, setForm] = useState({
    phone_number: '',
    email: id.login ? getUser.email : '',
    amount: param.selectedVar?.amount
      ? param.selectedVar?.amount == 0
        ? ''
        : param.selectedVar?.amount == ''
        ? ''
        : param.selectedVar?.amount
      : '',
    quantity: 1,
    unique_element: '',
    type: '',
    identifier: '',
    selected: '',
    calAmount: '',
  });
  const [btn, setBtn] = useState(false);
  const [userInfo, setUserInfo] = useState(billerInfo);
  const [error, setError] = useState({
    phone: false,
    email: false,
    amount: false,
    quatity: false,
    biller: false,
    main: false,
    msg: {
      phone: '',
      email: '',
      amount: '',
      quatity: '',
      biller: '',
    },
  });
  const [show, setShow] = useState(false);

  const selectContact = async () => {
    let { selectedPhone, contact }: ContactPhoneSelection | any =
      await selectContactPhone();

    setForm({
      ...form,
      email: contact.emails[0],
      phone_number: selectedPhone.number,
    });
  };

  const Heading = () => (
    <View style={[styles.frow, styles.fVertCenter, { marginBottom: 10 }]}>
      <Avatar.Image
        source={{ uri: param.selectedItem.image.replace('https', 'http') }}
        size={42}
      />
      <View>
        <Text
          variant="bodyLarge"
          style={{ fontWeight: 'bold', color: other, marginLeft: 12 }}>
          {param.selectedItem.name}
        </Text>
        <Text
          variant="bodySmall"
          style={{ marginLeft: 12, color: other + 'aa' }}>
          {param.selectedItem.name} - {param.selectedItem.description}
        </Text>
      </View>
    </View>
  );

  useEffect(() => {
    (async () => {
      if (form.unique_element.length > 9) {
        setUserInfo({ ...billerInfo, loading: true });
        if (param.selectedItem.serviceID.includes('tv')) {
          let tv = await getTvInfo(
            param.selectedItem.serviceID,
            form.unique_element,
          );

          if (tv.content?.error) {
            return setError({
              ...error,
              biller: tv.content?.error,
              main: true,
            });
          } else {
            return setUserInfo({ ...tv, loading: false });
          }
        } else if (param.selectedItem.serviceID.includes('elect')) {
          if (form.unique_element.length > 11) {
            let tt = await initTrans(param.selectedItem.product_id, {
              ...form,
              identifier: param.selectedVar?.identifier,
              customer_id: id?.id,
            });
            console.log(tt);
          }
        }
      }
      setUserInfo({ ...billerInfo, loading: false });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.unique_element]);

  useEffect(() => {
    setForm({
      ...form,
      calAmount: Number(form.amount) * Number(form.quantity || 1),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.quantity]);

  const checkFn = (type: string) => {
    return param.selectedItem.serviceID.includes(type);
  };

  const DisplayInfo = () => {
    return (
      <View>
        {(checkFn('tv') || checkFn('star')) &&
          form.unique_element.length > 9 && (
            <>
              {userInfo.loading ? (
                <View
                  style={[
                    styles.frow,
                    styles.fcenter,
                    { gap: 10, margin: 10 },
                  ]}>
                  <ActivityIndicator color={other} size={24} />
                  <Text variant="bodyLarge">Fetching Info...</Text>
                </View>
              ) : (
                <View
                  style={[
                    styles.frow,
                    styles.fcenter,
                    styles.fspace,
                    {
                      gap: 10,
                      marginVertical: 10,
                      backgroundColor: other + '44',
                    },
                  ]}>
                  <View style={{ padding: 10 }}>
                    <Text
                      variant="bodyLarge"
                      style={{ fontWeight: 'bold', color: pry }}>
                      Customer Name
                    </Text>
                    <Text variant="bodySmall">
                      {userInfo.content.customer_name}
                    </Text>
                    <Text
                      variant="bodyLarge"
                      style={{ fontWeight: 'bold', color: pry }}>
                      Current Bouquet
                    </Text>
                    <Text variant="bodySmall">{userInfo.content.name}</Text>
                    <Text
                      variant="bodyLarge"
                      style={{ fontWeight: 'bold', color: pry }}>
                      Due Date
                    </Text>
                    <Text variant="bodySmall">
                      {userInfo.content.due_date
                        ? userInfo.content.due_date
                        : 'N/A'}
                    </Text>
                  </View>
                  <IconButton
                    style={{ backgroundColor: other }}
                    icon={userInfo.content?.error ? 'alert' : 'check'}
                    iconColor={
                      userInfo.content?.error ? MD2Colors.red400 : 'white'
                    }
                  />
                </View>
              )}
            </>
          )}
      </View>
    );
  };

  const VariationList = ({ item }: { item: Variation }) => {
    // useEffect(() => {
    //   BackHandler.addEventListener('hardwareBackPress', function () {
    //     if (!show) {
    //       setShow(false);
    //       return true;
    //     }
    //   });
    // }, []);

    return (
      <Card
        style={{ marginBottom: 10, shadowColor: other }}
        onPress={() =>
          setForm({
            ...form,
            identifier: item.identifier,
            selected: item.variation,
            amount: item.amount,
          })
        }>
        <Card.Content
          style={[
            styles.frow,
            styles.fVertCenter,
            styles.fspace,
            { backgroundColor: other + '15', borderRadius: 12 },
          ]}>
          <View style={[styles.frow, styles.fVertCenter, { width: '70%' }]}>
            <Avatar.Image
              source={{
                uri: param.selectedItem.image.replace('https', 'http'),
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

  const Selection = () => {
    const [data, setData] = useState({
      key: '',
      filter: param.selectedItem.variations.variations,
      variation: param.selectedItem.variations.variations,
    });

    return (
      <View style={{ height: '95%' }}>
        <FlatList
          ListHeaderComponentStyle={{ marginBottom: 20 }}
          ListHeaderComponent={
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
                let searchResult = filter(
                  data.filter,
                  (item: any) =>
                    item.amount.toString().includes(text) ||
                    item.variation
                      .toLocaleLowerCase()
                      .includes(text.toLocaleLowerCase()),
                );
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
          }
          data={data.key == '' ? data.variation : data.filter}
          renderItem={({ item }) => <VariationList item={item} />}
          contentContainerStyle={{ padding: 10, height: '100%' }}
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
        />
      </View>
    );
  };

  let checkType = checkFn('tv')
    ? true
    : checkFn('electric')
    ? true
    : checkFn('star')
    ? true
    : checkFn('jamb')
    ? true
    : false;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {btn ? (
        <Loader />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ padding: 20 }}>
              <Heading />
              <DisplayInfo />
              <View>
                {checkType && (
                  <>
                    <View
                      style={error.biller ? css.borderError : css.boxBorder}>
                      <Text variant="bodySmall" style={css.text}>
                        {param.selectedItem.unique_element_description}
                      </Text>
                      {error.biller && (
                        <Text variant="bodySmall" style={css.textError}>
                          {error.msg.biller}
                        </Text>
                      )}
                      <TextInput
                        placeholder="1234567890"
                        keyboardType="number-pad"
                        placeholderTextColor={other + '66'}
                        value={form.unique_element}
                        onChangeText={async (e: string) => {
                          setForm({ ...form, unique_element: e });
                        }}
                        right={
                          <TextInput.Icon
                            onPress={selectContact}
                            icon="card-bulleted-outline"
                            iconColor={MD2Colors.grey200}
                            style={{
                              backgroundColor:
                                form.unique_element != ''
                                  ? pry + 'cc'
                                  : pry + '33',
                              borderRadius: 5,
                            }}
                            size={26}
                          />
                        }
                        activeOutlineColor="#00000000"
                        underlineColor="#00000000"
                        activeUnderlineColor="#00000000"
                        selectionColor={other}
                        style={{ backgroundColor: '#00000000' }}
                        onEndEditing={async () => {
                          if (param.selectedItem.serviceID.includes('tv')) {
                            if (
                              form.unique_element.length > 10 ||
                              form.unique_element.length < 10
                            ) {
                              setError({
                                ...error,
                                biller: true,
                                main: true,
                                msg: {
                                  ...error.msg,
                                  biller: 'Invalid SmartCard number',
                                },
                              });
                            } else if (
                              param.selectedItem.serviceID.includes('elect')
                            ) {
                              if (
                                form.unique_element.length > 13 ||
                                form.unique_element.length < 13
                              ) {
                                setError({
                                  ...error,
                                  biller: true,
                                  main: true,
                                  msg: {
                                    ...error.msg,
                                    biller: 'Invalid meter number!',
                                  },
                                });
                              }
                            } else {
                              setError({
                                ...error,
                                biller: false,
                                main: false,
                                msg: { ...error.msg, biller: '' },
                              });
                            }
                          }
                        }}
                      />
                    </View>
                    {userInfo.content.name != '' && (
                      <View>
                        <TouchableRipple
                          style={[error.main ? css.borderError : css.boxBorder]}
                          rippleColor={other + 'ee'}
                          onPress={() => setShow(true)}>
                          <View
                            style={[
                              styles.frow,
                              styles.fspace,
                              styles.fVertCenter,
                            ]}>
                            <View>
                              <Text
                                variant="bodyMedium"
                                style={{ color: other + 'aa' }}>
                                {form.type == ''
                                  ? 'Select Action'
                                  : form.type == 'renew'
                                  ? 'Renew Current Subscription'
                                  : 'New Subscription'}
                              </Text>
                              {form.identifier && (
                                <Text
                                  variant="bodyMedium"
                                  style={{ color: other + 'cc' }}>
                                  {form.selected}
                                </Text>
                              )}
                            </View>
                            <IconButton
                              icon="chevron-down"
                              iconColor={other + 'aa'}
                            />
                          </View>
                        </TouchableRipple>
                      </View>
                    )}
                  </>
                )}
                <View style={error.phone ? css.borderError : css.boxBorder}>
                  <Text variant="bodySmall" style={css.text}>
                    Phone Number
                  </Text>
                  {error.phone && (
                    <Text variant="bodySmall" style={css.textError}>
                      {error.msg.phone}
                    </Text>
                  )}
                  <TextInput
                    placeholder="08012345678"
                    keyboardType="number-pad"
                    placeholderTextColor={other + '66'}
                    value={form.phone_number}
                    onChangeText={(e: string) =>
                      setForm({ ...form, phone_number: e })
                    }
                    right={
                      <TextInput.Icon
                        onPress={selectContact}
                        icon="account-multiple"
                        iconColor={MD2Colors.grey200}
                        style={{
                          backgroundColor:
                            form.phone_number != '' ? pry + 'cc' : pry + '33',
                          borderRadius: 5,
                        }}
                        size={26}
                      />
                    }
                    activeOutlineColor="#00000000"
                    underlineColor="#00000000"
                    activeUnderlineColor="#00000000"
                    selectionColor={other}
                    style={{ backgroundColor: '#00000000' }}
                    onEndEditing={() => {
                      if (
                        form.phone_number.length > 11 ||
                        form.phone_number.length < 11
                      ) {
                        setError({
                          ...error,
                          phone: true,
                          main: true,
                          msg: { ...error.msg, phone: 'Invalid Phone Number' },
                        });
                      } else {
                        setError({
                          ...error,
                          phone: false,
                          main: false,
                          msg: { ...error.msg, phone: '' },
                        });
                      }
                    }}
                  />
                </View>
                <View style={error.email ? css.borderError : css.boxBorder}>
                  <Text variant="bodySmall" style={css.text}>
                    Email Address
                  </Text>
                  <TextInput
                    placeholder="user@example.com"
                    keyboardType="email-address"
                    placeholderTextColor={other + '66'}
                    value={form.email}
                    onChangeText={(e: string) => setForm({ ...form, email: e })}
                    right={
                      <TextInput.Icon
                        icon="email"
                        iconColor={MD2Colors.grey200}
                        style={{
                          backgroundColor:
                            form.email != '' ? pry + 'cc' : pry + '33',
                          borderRadius: 5,
                        }}
                        size={26}
                      />
                    }
                    activeOutlineColor="#00000000"
                    underlineColor="#00000000"
                    activeUnderlineColor="#00000000"
                    selectionColor={other}
                    style={{ backgroundColor: '#00000000' }}
                    onEndEditing={async () => {
                      if (
                        !form.email.includes('.') ||
                        !form.email.includes('@')
                      ) {
                        setError({
                          ...error,
                          email: true,
                          main: true,
                          msg: { ...error.msg, email: 'Invalid Email address' },
                        });
                      } else {
                        setError({
                          ...error,
                          email: false,
                          main: false,
                          msg: { ...error.msg, email: '' },
                        });
                      }
                    }}
                  />
                </View>
                {param.selectedItem.serviceID == 'jamb' && (
                  <View style={css.boxBorder}>
                    <Text variant="bodySmall" style={css.text}>
                      Quantity
                    </Text>
                    <TextInput
                      placeholder="user@example.com"
                      keyboardType="number-pad"
                      placeholderTextColor={other + '66'}
                      value={form.quantity.toString()}
                      onChangeText={(e: any) =>
                        setForm({
                          ...form,
                          quantity: e,
                        })
                      }
                      right={
                        <TextInput.Icon
                          icon="numeric"
                          iconColor={MD2Colors.grey200}
                          style={{
                            backgroundColor:
                              form.email != '' ? pry + 'cc' : pry + '33',
                            borderRadius: 5,
                          }}
                          size={26}
                        />
                      }
                      activeOutlineColor="#00000000"
                      underlineColor="#00000000"
                      activeUnderlineColor="#00000000"
                      selectionColor={other}
                      style={{ backgroundColor: '#00000000' }}
                      onEndEditing={async () => {
                        if (form.quantity < 1) {
                          setError({
                            ...error,
                            quatity: true,
                            main: true,
                            msg: {
                              ...error.msg,
                              email: 'At least minimum of an item is required',
                            },
                          });
                        } else {
                          setError({
                            ...error,
                            email: false,
                            main: false,
                            msg: { ...error.msg, email: '' },
                          });
                        }
                      }}
                    />
                  </View>
                )}
                <View style={error.amount ? css.borderError : css.boxBorder}>
                  <Text variant="bodySmall" style={css.text}>
                    Amount
                  </Text>
                  {error.amount && (
                    <Text variant="bodySmall" style={css.textError}>
                      {error.msg.amount}
                    </Text>
                  )}
                  <TextInput
                    placeholder={
                      form.calAmount
                        ? form.calAmount.toString()
                        : form.amount.toString()
                    }
                    keyboardType="number-pad"
                    placeholderTextColor={other + '66'}
                    value={
                      form.calAmount
                        ? money(Number(form.calAmount)).toString()
                        : form.amount
                    }
                    onChangeText={(e: string) =>
                      setForm({ ...form, amount: e })
                    }
                    right={
                      <TextInput.Icon
                        icon="cash-fast"
                        iconColor={MD2Colors.grey200}
                        style={{
                          backgroundColor:
                            form.amount != '' ? pry + 'cc' : pry + '33',
                          borderRadius: 5,
                        }}
                        size={26}
                      />
                    }
                    outlineColor="#00000000"
                    activeOutlineColor="#00000000"
                    underlineColor="#00000000"
                    activeUnderlineColor="#00000000"
                    selectionColor={other}
                    style={{
                      backgroundColor: '#00000000',
                      borderBottomWidth: 0,
                    }}
                    disabled={
                      checkFn('tv') ||
                      checkFn('star') ||
                      checkFn('elect') ||
                      checkFn('edu')
                        ? form.identifier && true
                        : param.selectedVar?.amount == 0 ||
                          param.selectedVar?.amount == '' ||
                          param.selectedVar == undefined
                        ? false
                        : true
                    }
                    onEndEditing={() => {
                      if (!param.selectedItem.maximum_amount) {
                        return;
                      }
                      if (
                        Number(form.amount) <
                        Number(param.selectedItem.minimium_amount)
                      ) {
                        setError({
                          ...error,
                          amount: true,
                          msg: {
                            ...error.msg,
                            amount:
                              'Below minimum amount of ' +
                              money(param.selectedItem.minimium_amount),
                          },
                        });
                      } else if (
                        Number(param.selectedItem.maximum_amount) <
                        Number(form.amount)
                      ) {
                        setError({
                          ...error,
                          amount: true,
                          msg: {
                            ...error.msg,
                            amount:
                              'Exceed maximum amount of ' +
                              money(param.selectedItem.maximum_amount),
                          },
                        });
                      } else {
                        setError({ ...error, amount: false });
                      }
                    }}
                  />
                </View>
                <Button
                  onPress={async () => {
                    setBtn(true);
                    let trans = await initTrans(param.selectedItem.product_id, {
                      ...form,
                      identifier: param.selectedVar?.identifier,
                      customer_id: id.login ? id.id : '',
                    });

                    console.log(JSON.stringify(trans, '', 2));

                    setBtn(false);
                    if (trans.status == 'success') {
                      navigation.navigate('TransactionDetails', {
                        ...param,
                        trans,
                      });
                    }
                  }}
                  mode="contained"
                  style={{ backgroundColor: pry, borderRadius: 5 }}
                  disabled={error.main}>
                  Proceed
                </Button>
              </View>
            </View>
            {show && (
              <BShit show={!show ? -1 : 0}>
                <View>
                  <Text
                    variant="titleSmall"
                    style={{
                      textAlign: 'center',
                      marginBottom: 10,
                      color: pry,
                    }}>
                    Select Action
                  </Text>
                  <TouchableRipple
                    rippleColor={other + 99}
                    onPress={() => {
                      setForm({
                        ...form,
                        type: 'renew',
                        selected: userInfo.content.name,
                        amount: '',
                      });
                      setShow(false);
                    }}>
                    <View>
                      <Text
                        variant="bodyMedium"
                        style={{ textAlign: 'center', color: other }}>
                        Renew Current Subscription
                      </Text>
                      <Text variant="bodySmall" style={{ textAlign: 'center' }}>
                        {userInfo.content.name}
                      </Text>
                    </View>
                  </TouchableRipple>
                  <TouchableRipple
                    rippleColor={other + 99}
                    style={{ padding: 10 }}
                    onPress={() => {
                      setForm({
                        ...form,
                        type: 'change',
                        identifier: '',
                        selected: '',
                      });
                      setShow(false);
                    }}>
                    <Text
                      variant="bodyMedium"
                      style={{ textAlign: 'center', color: other }}>
                      Select New Subscription
                    </Text>
                  </TouchableRipple>
                </View>
              </BShit>
            )}
          </ScrollView>
          {!show && form.identifier == '' && form.type == 'change' && (
            <BShit show={!form.identifier ? 4 : -1}>
              <Selection />
            </BShit>
          )}
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default Details;

const css = StyleSheet.create({
  boxBorder: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: other + '99',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: other + '99',
    marginLeft: 10,
  },
  borderError: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(150,20,30,0.5)',
    padding: 10,
    borderRadius: 5,
  },
  textError: {
    color: 'rgba(150,20,30,0.5)',
    marginLeft: 10,
  },
});
