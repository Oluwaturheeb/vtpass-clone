import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { Button, IconButton, Text, TouchableRipple } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import styles, { other, pry } from './styles';
import { Input } from './Auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ID, User } from './types/types';
import DatePicker from 'react-native-date-picker';
import { submitKyc } from './lib/requests';

const KYC = () => {
  const { id, getUser }: { id: ID; getUser: User } = useUser();
  const [dp, setDP] = useState(false);

  const [kyc, setKyc] = useState({
    name: getUser.name,
    middle_name: getUser.middle_name,
    last_name: getUser.lastname,
    bvn: getUser.bvn,
    bvn_phone_number: getUser.bvn_phone_number,
    date_of_birth: getUser.date_of_birth,
    gender: getUser.gender,
    id_card_number: getUser.idc,
  });

  const [error, setError] = useState({
    name: '',
    middle_name: '',
    last_name: '',
    bvn: '',
    bvn_phone_number: '',
    date_of_birth: '',
    gender: '',
    id_card_number: '',
    error: false,
  });

  const kycHandler = async () => {
    if (!kyc.name?.trim()) {
      setError({ ...error, name: 'Name field is required!' });
    } else if (!kyc.middle_name?.trim()) {
      setError({ ...error, middle_name: 'Middle name field is required!' });
    } else if (!kyc.last_name?.trim()) {
      setError({ ...error, last_name: 'Last name field is required!' });
    } else if (kyc.bvn < 1) {
      setError({ ...error, bvn: 'Bvn field is required!' });
    } else if (!kyc.bvn_phone_number?.trim()) {
      setError({ ...error, bvn_phone_number: 'Bvn field is required!' });
    } else if (!kyc.date_of_birth) {
      setError({ ...error, date_of_birth: 'Date of birth field is required!' });
    } else if (!kyc.gender?.trim()) {
      setError({ ...error, gender: 'Kindly select a gender' });
    } else if (kyc.id_card_number?.trim()?.length < 1) {
      setError({ ...error, id_card_number: 'ID card no. field is required' });
    } else {
      let res = await submitKyc({
        ...kyc,
        user_token: id.userToken,
      });
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 10 }}>
        <View style={[styles.frow, styles.fVertCenter]}>
          <IconButton icon="information" size={32} />
          <Text style={{ flex: 1 }} variant="bodySmall">
            To change your password, kindly enter the old password first.
          </Text>
        </View>
        <Input
          placeholder="Name"
          value={kyc.name}
          state={(str: string) => setKyc({ ...kyc, name: str })}
        />
        <View style={{ marginBottom: 10 }} />
        <Input
          placeholder="Middle Name"
          value={kyc.middle_name}
          state={(str: string) => setKyc({ ...kyc, middle_name: str })}
        />
        <View style={{ marginBottom: 10 }} />
        <Input
          placeholder="Last Name"
          value={kyc.last_name}
          state={(str: string) => setKyc({ ...kyc, last_name: str })}
        />
        <View style={{ marginBottom: 10 }} />
        <View
          style={[
            styles.frow,
            styles.fspace,
            {
              padding: 16,
              borderWidth: 1,
              borderColor: other,
              borderRadius: 5,
              alignItems: 'flex-start',
            },
          ]}>
          <Text variant="bodyLarge">{kyc.gender || 'Gender'}</Text>
          <View style={[styles.frow, styles.fright]}>
            <IconButton
              onPress={() => setKyc({ ...kyc, gender: 'Male' })}
              icon="face-man"
              iconColor="white"
              style={{ marginVertical: -10, backgroundColor: other }}
              selected={kyc.gender == 'Male'}
            />
            <IconButton
              onPress={() => setKyc({ ...kyc, gender: 'Female' })}
              icon="face-woman-shimmer"
              iconColor="white"
              style={{ marginVertical: -10, backgroundColor: other }}
              selected={kyc.gender == 'Female'}
            />
          </View>
        </View>
        <View style={{ marginBottom: 10 }} />
        <TouchableRipple onPress={() => setDP(!dp)}>
          <View
            style={[
              styles.frow,
              styles.fspace,
              {
                padding: 16,
                borderWidth: 1,
                borderColor: other,
                borderRadius: 5,
                alignItems: 'flex-start',
              },
            ]}>
            <Text variant="bodyLarge">
              {kyc.date_of_birth
                ? new Date(kyc.date_of_birth).toDateString()
                : 'Date of Birth'}
            </Text>
            <IconButton
              iconColor={other}
              icon="chevron-down"
              style={{ margin: -10 }}
            />
          </View>
        </TouchableRipple>
        <View style={{ marginBottom: 10 }} />
        <Input
          value={kyc.bvn}
          placeholder="BVN Number"
          state={(e: any) => setKyc({ ...kyc, bvn: e })}
        />
        <View style={{ marginBottom: 10 }} />
        <Input
          value={kyc.id_card_number}
          placeholder="ID Card No."
          state={(e: any) => setKyc({ ...kyc, id_card_number: e })}
        />
        <View style={{ marginBottom: 10 }} />
        <Button
          onPress={async () => {}}
          mode="contained"
          style={{ backgroundColor: pry, borderRadius: 5 }}
          disabled={false}>
          Proceed
        </Button>
      </View>
      <DatePicker
        date={new Date()}
        modal={true}
        mode="date"
        open={dp}
        onConfirm={(e: any) => void setKyc({ ...kyc, date_of_birth: e })}
        onCancel={() => setDP(!dp)}
      />
    </ScrollView>
  );
};

export default KYC;
