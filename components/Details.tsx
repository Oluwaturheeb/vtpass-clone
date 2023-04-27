import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Avatar, Button, MD2Colors, Text, TextInput } from 'react-native-paper';
import styles, { other, pry } from './styles';
import {
  selectContactPhone,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ContactPhoneSelection,
} from 'react-native-select-contact';
import { initTrans, userBalance } from './lib/requests';
import { useUser } from './lib/context';
import { ScrollView } from 'react-native-gesture-handler';

const Details = ({ route, navigation }: { navigation: any; route: any }) => {
  const { id } = useUser();
  const param = route.params;
  const [form, setForm] = useState({
    phone_number: '',
    email: '',
    amount: param.selectedVar?.amount
      ? param.selectedVar?.amount == 0
        ? ''
        : param.selectedVar?.amount == ''
        ? ''
        : param.selectedVar?.amount
      : '',
    quantity: 1,
    // decode: '',
    unique_element: '',
  });

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

  // console.log(JSON.stringify(param.selectedItem.serviceID, '', 2));

  const selectContact = async () => {
    let { selectedPhone, contact }: ContactPhoneSelection | null =
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
          {param.selectedItem.name} - Get instant Top up
        </Text>
      </View>
    </View>
  );

  let checkType = param.selectedItem.serviceID.includes('tv')
    ? true
    : param.selectedItem.serviceID.includes('electric')
    ? true
    : param.selectedItem.serviceID.includes('star')
    ? true
    : false;

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Heading />
          <View>
            {checkType && (
              <View style={error.biller ? css.borderError : css.boxBorder}>
                <Text variant="bodySmall" style={css.text}>
                  {param.selectedItem.serviceID.includes('gotv') &&
                    'Gotv Decoder Number'}
                  {param.selectedItem.serviceID.includes('dstv') &&
                    'DStv Smartcard Number'}
                  {param.selectedItem.serviceID.includes('electric') &&
                    'Meter Number'}
                  {param.selectedItem.serviceID.includes('star') &&
                    'Startimes SmartCard Number'}
                </Text>
                {error.biller && (
                  <Text variant="bodySmall" style={css.textError}>
                    {error.msg.biller}
                  </Text>
                )}
                <TextInput
                  placeholder="08012345678"
                  keyboardType="number-pad"
                  placeholderTextColor={other + '66'}
                  value={form.unique_element}
                  onChangeText={(e: string) =>
                    setForm({ ...form, unique_element: e })
                  }
                  right={
                    <TextInput.Icon
                      onPress={selectContact}
                      icon="account-multiple"
                      iconColor={MD2Colors.grey200}
                      style={{
                        backgroundColor:
                          form.unique_element != '' ? pry + 'cc' : pry + '33',
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
                          msg: { ...error.msg, biller: 'Invalid SmartCard number' },
                        });
                      } else {
                        setError({
                          ...error,
                          biller: false,
                          main: false,
                          msg: { ...error.msg, biller: '' },
                        });
                        // let info = initTrans(param.selectedItem.product_id, {
                        //   unique_element: form.unique_element,
                        //   // identifier:
                        // });
                      }
                    }
                  }}
                />
              </View>
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
                onChangeText={(e: string) => setForm({ ...form, phone_number: e })}
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
                      backgroundColor: form.email != '' ? pry + 'cc' : pry + '33',
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
                  if (!form.email.includes('.') || !form.email.includes('@')) {
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
                  value={form.quantity}
                  onChangeText={(e: string) => setForm({ ...form, quantity: e })}
                  right={
                    <TextInput.Icon
                      icon="numeric"
                      iconColor={MD2Colors.grey200}
                      style={{
                        backgroundColor: form.email != '' ? pry + 'cc' : pry + '33',
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
            <View style={css.boxBorder}>
              <Text variant="bodySmall" style={css.text}>
                Amount
              </Text>
              <TextInput
                placeholder="08012345678"
                keyboardType="number-pad"
                placeholderTextColor={other + '66'}
                value={form.amount}
                onChangeText={(e: string) => setForm({ ...form, amount: e })}
                right={
                  <TextInput.Icon
                    icon="cash-fast"
                    iconColor={MD2Colors.grey200}
                    style={{
                      backgroundColor: form.amount != '' ? pry + 'cc' : pry + '33',
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
                style={{ backgroundColor: '#00000000' }}
                disabled={
                  param.selectedVar?.amount == 0 || param.selectedVar?.amount == ''
                    ? false
                    : true
                }
              />
            </View>
            <Button
              onPress={async () => {
                // console.log(param.selectedVar.identifier, id);
                let trans = await initTrans(param.selectedItem.product_id, {
                  ...form,
                  identifier: param.selectedItem.serviceID,
                  product_id: param.selectedItem.product_id,
                  customer_id: id?.id,
                });
                console.log(trans);

                if (trans.status == 'success') {
                  navigation.navigate('TransactionDetails', { ...param, trans });
                } else {
                  false;
                }
              }}
              mode="contained"
              style={{ backgroundColor: pry, borderRadius: 5 }}
              disabled={error.main}>
              Proceed
            </Button>
          </View>
        </View>
      </ScrollView>
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
