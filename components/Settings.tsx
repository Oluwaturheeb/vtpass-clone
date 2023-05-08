import React from 'react';
import { useUser } from './lib/context';
import {
  Avatar,
  Card,
  IconButton,
  MD2Colors,
  Provider,
  Switch,
  Text,
  Tooltip,
  TouchableRipple,
} from 'react-native-paper';
import { Alert, ScrollView, View } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScreenProps, User } from './types/types';
import styles, { other } from './styles';
import { money } from './lib/helper';
import { reset2FA } from './lib/requests';

const Settings = ({ navigation }: ScreenProps) => {
  const { getUser, id }: { getUser: User } = useUser();

  const deleteAcc = async () => {
    Alert.alert(
      'VTpass Info',
      'Are you sure about this action.\nIt\'s not resversible!',
      [
        {
          isPreferred: true,
          style: 'cancel',
          text: 'No',
        },
        {
          isPreferred: false,
          onPress: async () => {
            let action = await deleteFunc(id.userToken);
            console.log(action);
          },
          text: 'Yes',
        },
      ],
    );
  };

  const fareset = async () => {
    Alert.alert(
      'VTpass Info',
      'Are you sure you want to reset 2 FA in your account.',
      [
        {
          isPreferred: true,
          style: 'cancel',
          text: 'No',
        },
        {
          isPreferred: false,
          onPress: async () => {
            let action = await reset2FA(id.userToken, 'mobile');
            console.log(action);
          },
          text: 'Yes',
        },
      ],
    );
  };

  return (
    <Provider>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            {
              paddingVertical: 10,
              paddingHorizontal: 16,
              // backgroundColor: 'white',
            },
            styles.fspace,
            styles.frow,
            styles.fVertCenter,
          ]}>
          <View>
            <Text
              variant="titleLarge"
              style={{ color: other, marginBottom: 5, fontStyle: 'italic' }}>
              Hey!
            </Text>
            <Text
              variant="titleLarge"
              style={{ color: other, marginBottom: 5, fontWeight: 'bold' }}>
              {getUser.name + ' ' + getUser.lastname}
            </Text>
            <Text variant="bodySmall" style={{ color: other, marginBottom: 5 }}>
              Wallet Balance - {money(getUser.customer.wallet)}
            </Text>
          </View>
          {getUser.image ? (
            <Avatar.Image source={{ uri: getUser.image }} size={72} />
          ) : (
            <IconButton size={72} icon="face-man-shimmer" iconColor={other} />
          )}
        </View>
        <Card style={{ margin: 10, backgroundColor: 'white' }}>
          <Card.Content>
            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={() => null}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  Email Address
                </Text>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <Text variant="bodySmall" style={{ color: other + '99' }}>
                    {getUser.email}
                  </Text>
                  <IconButton
                    icon="chevron-right"
                    size={30}
                    style={{ margin: -10 }}
                    iconColor={other + '99'}
                  />
                </View>
              </View>
            </TouchableRipple>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: other + '15',
                // marginVertical: 10,
              }}
            />

            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={() => null}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  Phone Number
                </Text>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <Text variant="bodySmall" style={{ color: other + '99' }}>
                    {getUser.phone}
                  </Text>
                  <IconButton
                    icon="chevron-right"
                    size={30}
                    style={{ margin: -10 }}
                    iconColor={other + '99'}
                  />
                </View>
              </View>
            </TouchableRipple>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: other + '15',
                // marginVertical: 10,
              }}
            />
            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={() => null}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  Account Status
                </Text>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <Text variant="bodySmall" style={{ color: other + '99' }}>
                    {getUser.status.replace(
                      getUser.status[0],
                      getUser.status[0].toLocaleUpperCase(),
                    )}
                  </Text>
                  <IconButton
                    icon="chevron-right"
                    size={30}
                    style={{ margin: -10 }}
                    iconColor={other + '99'}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Card.Content>
        </Card>

        <Card style={{ margin: 10, backgroundColor: 'white' }}>
          <Card.Content>
            <TouchableRipple
              style={{ paddingTop: 10, paddingBottom: 0, paddingHorizontal: 2 }}
              onPress={() => null}>
              <View
                style={[
                  styles.frow,
                  styles.fspace,
                  styles.fVertCenter,
                  { marginBottom: 16 },
                ]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  2 Factor Authentication
                </Text>
                <View style={[styles.frow, styles.fVertCenter]}>
                  {getUser.status == 'active' && (
                    <View>
                      <View style={[styles.frow]}>
                        <Tooltip title="Edit 2FA">
                          <IconButton
                            icon="pencil-outline"
                            style={{
                              marginVertical: -10,
                              backgroundColor: other,
                            }}
                            iconColor={MD2Colors.white}
                            size={16}
                          />
                        </Tooltip>
                        <Tooltip title="Reset 2FA">
                          <IconButton
                            icon="lock-reset"
                            style={{
                              marginVertical: -10,
                              backgroundColor: other,
                            }}
                            iconColor={MD2Colors.white}
                            size={16}
                            onPress={fareset}
                          />
                        </Tooltip>
                      </View>
                    </View>
                  )}
                  <Switch
                    value={getUser.status == 'active' ? true : false}
                    color={other}
                    style={{ marginVertical: -10 }}
                  />
                </View>
              </View>
            </TouchableRipple>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: other + '15',
                // marginVertical: 5,
              }}
            />
            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={() => navigation.navigate('KYC')}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  KYC & BVN
                </Text>
                <IconButton
                  icon="chevron-right"
                  size={30}
                  style={{ margin: -10 }}
                  iconColor={other}
                />
              </View>
            </TouchableRipple>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: other + '15',
                // marginVertical: 10,
              }}
            />
            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={() => navigation.navigate('Passwords')}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  Change Password
                </Text>
                <IconButton
                  icon="chevron-right"
                  size={30}
                  style={{ margin: -10 }}
                  iconColor={other}
                />
              </View>
            </TouchableRipple>
          </Card.Content>
        </Card>
        <Card style={{ margin: 10, backgroundColor: 'white' }}>
          <Card.Content>
            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={() => null}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  Bank Details
                </Text>
                <IconButton
                  icon="chevron-right"
                  size={30}
                  style={{ margin: -10 }}
                  iconColor={other}
                />
              </View>
            </TouchableRipple>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: other + '15',
                // marginVertical: 10,
              }}
            />
            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={() => navigation.navigate('AutoWallet')}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: other, fontWeight: 'bold' }}>
                  Wallet Funding
                </Text>
                <IconButton
                  icon="chevron-right"
                  size={30}
                  style={{ margin: -10 }}
                  iconColor={other}
                />
              </View>
            </TouchableRipple>
          </Card.Content>
        </Card>
        <Card style={{ margin: 10, backgroundColor: 'white' }}>
          <Card.Content>
            <TouchableRipple
              style={{ paddingVertical: 10, paddingHorizontal: 2 }}
              onPress={deleteAcc}>
              <View style={[styles.frow, styles.fspace, styles.fVertCenter]}>
                <Text
                  variant="bodyLarge"
                  style={{ color: MD2Colors.red600, fontWeight: 'bold' }}>
                  Delete Account
                </Text>
                <IconButton
                  icon="chevron-right"
                  size={30}
                  style={{ margin: -10 }}
                  iconColor={other}
                />
              </View>
            </TouchableRipple>
          </Card.Content>
        </Card>
      </ScrollView>
    </Provider>
  );
};

export default Settings;
