import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Referral, ScreenProps, User } from './types/types';
import { Button, Card, IconButton, Text, TextInput } from 'react-native-paper';
import { BackHandler, Share, ToastAndroid, View } from 'react-native';
import { refDash, refJoin, sendRefMsg } from './lib/requests';
import { Loader } from './Components';
import styles, { other } from './styles';
import { refSchema } from './types/schema';
import { useUser } from './lib/context';

const Refdash = ({ navigation }: ScreenProps) => {
  const { getUser }: { getUser: User } = useUser();
  const [ref, setRef] = useState<{ loading: boolean; data: Referral }>({
    loading: true,
    data: refSchema,
  });
  const [toggle, setSwitch] = useState({
    show: false,
    recepient: '',
    btn: false,
  });

  useEffect(() => {
    (async () => {
      let req = await refDash();
      if (req) {
        setRef({ loading: false, data: req });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinRef = async () => {
    let res = await refJoin(getUser.name);
    console.log(res);
  };

  BackHandler.addEventListener('hardwareBackPress', () => {
    if (toggle.show) {
      setSwitch({ ...toggle, show: false });
      return true;
    } else {
      navigation.goBack();
    }
  });

  return (
    <View style={{ flex: 1 }}>
      {ref.loading && <Loader />}
      {!ref.loading && !toggle.show && (
        <View style={{ flex: 1, padding: 10 }}>
          {ref.data.refer_status == 1 ? (
            <View>
              <Card
                style={[
                  styles.fcenter,
                  {
                    margin: 5,
                    borderRadius: 5,
                    backgroundColor: 'white',
                  },
                ]}>
                <Card.Content style={styles.fVertCenter}>
                  <Text variant="titleLarge" style={{ color: other }}>
                    {ref.data.invites_count}
                  </Text>
                  <Text
                    variant="bodyLarge"
                    style={{ marginTop: 7, color: other }}>
                    Total Referral
                  </Text>
                </Card.Content>
              </Card>
              <Card
                style={{
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: 'white',
                  height: 120,
                  justifyContent: 'center',
                }}>
                <Card.Content
                  style={[styles.fVertCenter, styles.frow, styles.fspace]}>
                  <View>
                    <Text variant="titleSmall" style={{ color: other }}>
                      Your Referral Code
                    </Text>
                    <Text variant="titleLarge" style={{ color: other }}>
                      {ref.data.refCode}
                    </Text>
                  </View>
                  <View style={styles.frow}>
                    <IconButton
                      icon="share-variant-outline"
                      iconColor="#fff"
                      onPress={async () => {
                        await Share.share({
                          title: 'VTpass Invite',
                          message: ref.data.refMessage,
                        });
                      }}
                      style={{ backgroundColor: other }}
                    />
                    <IconButton
                      icon="email-send-outline"
                      iconColor="#fff"
                      onPress={async () => setSwitch({ ...toggle, show: true })}
                      style={{ backgroundColor: other }}
                    />
                  </View>
                </Card.Content>
              </Card>
            </View>
          ) : (
            <View style={[styles.fcenter, { flex: 1 }]}>
              <IconButton
                size={120}
                icon="account-supervisor-outline"
                iconColor={other + '77'}
              />
              <Text
                variant="bodyLarge"
                style={{ color: other + 77, marginTop: -30 }}>
                Referral not active on this account
              </Text>
              <Button
                style={{ marginTop: 20 }}
                mode="elevated"
                buttonColor={other}
                textColor="white"
                onPress={joinRef}>
                Create Referral Link
              </Button>
            </View>
          )}
        </View>
      )}
      {toggle.show && (
        <View style={{ flex: 1, padding: 10 }}>
          <View style={[styles.frow, styles.fVertCenter]}>
            <IconButton icon="information" size={32} iconColor={other} />
            <Text style={{ flex: 1 }} variant="bodySmall">
              We'll help you get started, enter your friend email or phone
              number and we'll send the invite to them
            </Text>
          </View>
          <TextInput
            // label="Amount"
            mode="outlined"
            placeholder="Email or phone number"
            placeholderTextColor={other + '66'}
            value={toggle.recepient}
            onChangeText={(e: any) => setSwitch({ ...toggle, recepient: e })}
            outlineColor={other}
            activeOutlineColor={other}
            selectionColor={other}
            style={{
              backgroundColor: '#00000000',
              borderBottomWidth: 0,
              marginVertical: 16,
            }}
            returnKeyType="send"
            returnKeyLabel="Send"
          />
          <Button
            onPress={async () => {
              setSwitch({ ...toggle, btn: true });
              if (toggle.recepient) {
                let req = await sendRefMsg({ recepient: toggle.recepient });

                if (req.status == 'success') {
                  ToastAndroid.show(
                    'Invitation sent to contact.',
                    ToastAndroid.LONG,
                  );
                  setSwitch({ ...toggle, btn: false, recepient: '' });
                }
              }
            }}
            mode="contained"
            style={{ backgroundColor: other, borderRadius: 5 }}
            disabled={toggle.btn}>
            Proceed
          </Button>
        </View>
      )}
    </View>
  );
};

export default Refdash;
