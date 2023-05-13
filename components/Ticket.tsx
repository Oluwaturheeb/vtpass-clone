import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { Button, MD2Colors, Text, TextInput } from 'react-native-paper';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ID, ScreenProps, User } from './types/types';
import { ScrollView, View } from 'react-native';
import { Input } from './Auth';
import { other } from './styles';
import { ticket } from './lib/requests';

const Ticket = ({ route }: ScreenProps) => {
  console.log(route.params);
  const { id, getUser }: { id: ID; getUser: User } = useUser();
  const [input, setInput] = useState({
    name: id.login ? `${getUser.name} ${getUser.lastname}` : '',
    email: getUser.email,
    phone: getUser.phone,
    message: '',
    loading: false,
    service: '',
  });

  const [error, setError] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    main: false,
  });

  const handleSubmit = async () => {
    setInput({ ...input, loading: true });
    if (!input.name) {
      setError({ ...error, name: 'Name field is required!', main: true });
    } else if (!input.email) {
      setError({ ...error, email: 'Email field is required!', main: true });
    } else if (!input.phone) {
      setError({ ...error, phone: 'Phone field is required!', main: true });
    } else if (!input.message) {
      setError({ ...error, message: 'Message field is required!', main: true });
    } else {
      let res = await ticket(input);
      if (res.message == 'Successful')
        setInput({
          ...input,
          service: 'Ticket has been submitted',
          loading: false,
        });
      else setInput({ ...input, service: res.message, loading: false });

      return false;
    }
    setInput({ ...input, loading: false });
  };

  let errorState = error.main == true;

  useEffect(() => {
    setTimeout(
      () =>
        setError({
          name: '',
          email: '',
          phone: '',
          message: '',
          main: false,
        }),
      4000,
    );
  }, [errorState]);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {!id.login && (
        <View>
          <Text variant="bodyMedium" style={{ color: other }}>
            Name
          </Text>
          {error.name && (
            <Text variant="bodySmall" style={{ color: MD2Colors.red400 }}>
              {error.name}
            </Text>
          )}
          <Input
            placeholder="Enter name..."
            value={input.name}
            state={(e: string) => setInput({ ...input, name: e })}
          />
          <View style={{ margin: 5 }} />
          <Text variant="bodyMedium" style={{ color: other }}>
            Phone Number
          </Text>
          {error.phone && (
            <Text variant="bodySmall" style={{ color: MD2Colors.red400 }}>
              {error.phone}
            </Text>
          )}
          <Input
            placeholder="Enter phone number ..."
            value={input.phone}
            state={(e: string) => setInput({ ...input, phone: e })}
          />
          <View style={{ margin: 5 }} />
          <Text variant="bodyMedium" style={{ color: other }}>
            Email
          </Text>
          {error.email && (
            <Text variant="bodySmall" style={{ color: MD2Colors.red400 }}>
              {error.email}
            </Text>
          )}
          <Input
            placeholder="Enter email..."
            value={input.email}
            state={(e: string) => setInput({ ...input, email: e })}
          />
        </View>
      )}
      <View style={{ margin: 5 }} />
      <Text variant="bodyMedium" style={{ color: other }}>
        Message
      </Text>
      {error.message && (
        <Text variant="bodySmall" style={{ color: MD2Colors.red400 }}>
          {error.message}
        </Text>
      )}
      <TextInput
        // error={error}
        placeholder="Your message"
        mode="outlined"
        underlineColor="#000"
        outlineColor={other}
        activeOutlineColor={other}
        activeUnderlineColor="#00000000"
        onChangeText={(text: any) => setInput({ ...input, message: text })}
        value={input.message}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          borderRadius: 5,
        }}
        multiline={true}
        numberOfLines={6}
      />
      <View style={{ margin: 5 }} />
      {input.service && (
        <Text
          variant="bodySmall"
          style={{
            color: MD2Colors.green700,
            textAlign: 'center',
            padding: 5,
          }}>
          {input.service}
        </Text>
      )}
      <Button
        mode="elevated"
        disabled={error.main || input.loading}
        loading={input.loading}
        buttonColor={other}
        textColor="white"
        style={{ borderRadius: 5 }}
        onPress={handleSubmit}>
        Submit Ticket
      </Button>
    </ScrollView>
  );
};

export default Ticket;
