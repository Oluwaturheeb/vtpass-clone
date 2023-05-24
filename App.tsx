import React, { useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodePush from 'react-native-code-push';
import { BackHandler, Image, StatusBar, View } from 'react-native';
import {
  DrawerLayout,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  IconButton,
  MD2Colors,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import styles, { other, pry } from './components/styles';
import { UserProvider, useUser } from './components/lib/context';
import { money } from './components/lib/axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from './components/types/types';

// Screens only
import Welcome from './components/Welcome';
import Home from './components/Home';
import Auth from './components/Auth';
import ListVariation from './components/ListVariation';
import Details from './components/Details';
import TransactionDetails from './components/TransactionDetails';
import Transactions from './components/Transactions';
import Notification from './components/Notifications';
import Help from './components/Help';
import Status from './components/TransactionStatus';
import LoadWallet from './components/LoadWallet';
import Settings from './components/Settings';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Earnings from './components/Earnings';
import Refdash from './components/RefDash';
import AutoWallet from './components/AutoWallets';
import Passwords from './components/ChangePassword';
import KYC from './components/KYC';
import Ticket from './components/Ticket';
import UserBanks from './components/UserBanks';

const App = () => {
  const Stack = createNativeStackNavigator();
  const navRef: any = useRef();

  const Headers = ({ props }: { props: any }) => {
    let routeName = props.route.name;

    return (
      <View style={[styles.fspace, { backgroundColor: pry }]}>
        <View style={[styles.frow, styles.fspace]}>
          {props.back == undefined ? (
            <>
              <View style={[styles.frow, styles.fVertCenter]}>
                <IconButton
                  icon="menu"
                  iconColor={MD2Colors.white}
                  onPress={navRef.current?.openDrawer}
                />
                {routeName == 'Home' && (
                  <Image
                    source={require('./components/assets/vtpass1.png')}
                    resizeMode="contain"
                    style={{ width: 100, height: 30 }}
                  />
                )}
              </View>
              <View style={[styles.frow]}>
                <IconButton
                  icon="magnify"
                  onPress={() => props.navigation.navigate('Transactions')}
                  iconColor={MD2Colors.white}
                  style={{ marginVertical: 10 }}
                />
                <IconButton
                  icon="bell-outline"
                  iconColor={MD2Colors.white}
                  onPress={() => props.navigation.navigate('Notifications')}
                />
              </View>
            </>
          ) : (
            <View style={[styles.frow, styles.fspace, { flex: 1 }]}>
              <View style={[styles.frow, { alignItems: 'center' }]}>
                <IconButton
                  icon="arrow-left"
                  onPress={props.navigation.goBack}
                  iconColor={MD2Colors.white}
                  style={{ marginVertical: 10 }}
                />
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  variant="titleSmall"
                  style={{ color: MD2Colors.white + 'ff', width: 180 }}>
                  {props.route.params?.title != undefined
                    ? props.route.params.title
                    : props.options.title}
                </Text>
              </View>
              {routeName != 'Auth' && (
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="magnify"
                    onPress={() => props.navigation.navigate('Transactions')}
                    iconColor={MD2Colors.white}
                    style={{ marginVertical: 10 }}
                  />
                  <IconButton
                    icon="bell"
                    iconColor={MD2Colors.white}
                    style={{ marginVertical: 10 }}
                    onPress={() => props.navigation.navigate('Notifications')}
                  />
                  <IconButton
                    icon="menu"
                    onPress={navRef.current.openDrawer}
                    iconColor={MD2Colors.white}
                    style={{ marginVertical: 10 }}
                  />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  const NavDrawer = () => {
    const nav: any = useNavigation();
    let { getUser, setUser, setId, id, homeData } = useUser();
    let user: User = getUser;

    // BackHandler.addEventListener('hardwareBackPress', () => {
    //   if (navRef.current.state.drawerOpened) {
    //     navRef.current.closeDrawer();
    //     return true;
    //   } else nav.goBack();
    // });

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (navRef.current.state.drawerOpened) {
        navRef.current.closeDrawer();
        return true;
      } else if (!nav.canGoBack()) {
        BackHandler.removeEventListener('hardwareBackPress', () => false);
      }
    });

    BackHandler.removeEventListener('hardwareBackPress', () => true);

    return (
      <LinearGradient
        colors={[MD2Colors.blueGrey50, MD2Colors.blueGrey100]}
        style={{ position: 'relative', height: '100%' }}>
        <View>
          {id.login != 0 ? (
            <LinearGradient
              colors={[other, pry + 'dd']}
              style={{
                height: 100,
                padding: 5,
                ...styles.fVertCenter,
                ...styles.fspace,
              }}>
              <Text variant="bodyLarge" style={{ color: '#fff' }}>
                Hello{' '}
                {user?.name?.replace(
                  user?.name[0],
                  user?.name[0]?.toUpperCase(),
                )}
              </Text>
              <Text variant="bodyMedium" style={{ color: '#fff' }}>
                Wallet Balance
              </Text>
              <Text variant="bodyMedium" style={{ color: '#fff' }}>
                {money(user?.customer?.wallet)}
              </Text>
            </LinearGradient>
          ) : (
            <Image
              source={require('./components/assets/vtpass.png')}
              resizeMode="contain"
              style={{
                width: '80%',
                height: 100,
                marginTop: 20,
                marginHorizontal: 10,
              }}
            />
          )}
          <TouchableRipple
            rippleColor={pry + 'cc'}
            onPress={() => {
              nav.navigate('Home', homeData);
              navRef.current.closeDrawer();
            }}>
            <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
              <IconButton
                style={{ marginVertical: -10 }}
                iconColor={other}
                icon="cash-fast"
              />
              <Text variant="bodySmall" style={{ color: other }}>
                Pay
              </Text>
            </View>
          </TouchableRipple>
          {id.login ? (
            <>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={() => {
                  nav.navigate('LoadWallet');
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={other}
                    icon="wallet"
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    Load Wallet
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={() => {
                  nav.navigate('Transactions');
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={other}
                    icon="script-text-outline"
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    Transactions
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={() => {
                  nav.navigate('Earnings');
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={other}
                    icon="account-cash"
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    My Earnings
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={() => {
                  nav.navigate('Notifications');
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={other}
                    icon="bell"
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    Notifications
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={() => {
                  nav.navigate('Settings');
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    iconColor={other}
                    icon="account-cog"
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    Settings
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={async () => {
                  await AsyncStorage.setItem(
                    'id',
                    JSON.stringify({
                      ...id,
                      login: false,
                    }),
                  );
                  setId({ ...id, login: false });
                  setUser({});
                  navRef.current.closeDrawer();
                  nav.navigate('Welcome');
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={other}
                    icon="logout"
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    Logout
                  </Text>
                </View>
              </TouchableRipple>
            </>
          ) : (
            <>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={() => {
                  nav.navigate('Auth', { title: 'Login' });
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    iconColor={other}
                    icon="login"
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    Login
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={pry + 'cc'}
                onPress={() => {
                  nav.navigate('Auth', { title: 'Create Account' });
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={other}
                    icon="account-plus"
                  />
                  <Text variant="bodySmall" style={{ color: other }}>
                    Register
                  </Text>
                </View>
              </TouchableRipple>
            </>
          )}
          <TouchableRipple
            rippleColor={pry + 'cc'}
            onPress={() => {
              nav.navigate('Help');
              navRef.current.closeDrawer();
            }}>
            <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
              <IconButton
                style={{ marginVertical: -10 }}
                iconColor={other}
                icon="help-circle"
              />
              <Text variant="bodySmall" style={{ color: other }}>
                Help
              </Text>
            </View>
          </TouchableRipple>
        </View>
      </LinearGradient>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor={pry} />
      <UserProvider>
        <NavigationContainer>
          <DrawerLayout
            drawerWidth={240}
            drawerPosition="left"
            useNativeAnimations={true}
            drawerType="front"
            minSwipeDistance={20}
            renderNavigationView={() => <NavDrawer />}
            drawerBackgroundColor={MD2Colors.white}
            ref={navRef}>
            <Stack.Navigator
              screenOptions={{
                header: (props: any) => <Headers props={props} />,
              }}>
              <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="Variations"
                component={ListVariation}
                options={{ title: '???' }}
              />
              <Stack.Screen
                name="Details"
                component={Details}
                options={{ title: 'Airtime VTU' }}
              />
              <Stack.Screen
                name="TransactionDetails"
                component={TransactionDetails}
                options={{ title: 'Transaction Details' }}
              />
              <Stack.Screen
                name="Transactions"
                component={Transactions}
                options={{
                  title: 'Transactions',
                }}
              />
              <Stack.Screen
                name="Notifications"
                component={Notification}
                options={{
                  title: 'Notifications',
                }}
              />
              <Stack.Screen
                name="Help"
                component={Help}
                options={{ title: 'Help' }}
              />
              <Stack.Screen
                name="Status"
                component={Status}
                options={{ title: 'Transaction Status' }}
              />
              <Stack.Screen
                name="LoadWallet"
                component={LoadWallet}
                options={{ title: 'Load Wallet' }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ title: 'Account Settings' }}
              />
              <Stack.Screen
                name="Earnings"
                component={Earnings}
                options={{ title: 'Earnings' }}
              />
              <Stack.Screen
                name="RefDash"
                component={Refdash}
                options={{ title: 'Earnings' }}
              />
              <Stack.Screen
                name="AutoWallet"
                component={AutoWallet}
                options={{ title: 'Wallet Funding' }}
              />
              <Stack.Screen
                name="Passwords"
                component={Passwords}
                options={{ title: 'Change Password' }}
              />
              <Stack.Screen
                name="KYC"
                component={KYC}
                options={{ title: 'KYC & BVN Info' }}
              />
              <Stack.Screen
                name="Ticket"
                component={Ticket}
                options={{ title: 'Create ticket' }}
              />
              <Stack.Screen
                name="UserBanks"
                component={UserBanks}
                options={{ title: 'My Bank Accounts' }}
              />
              {/* <Stack.Screen
              name="Search"
              component={Search}
              options={{ title: 'Search', headerShown: false }}
            />
            <Stack.Screen
              name="Beneficiary"
              component={Beneficiary}
              options={{ title: 'Beneficiaries' }}
            /> */}
            </Stack.Navigator>
          </DrawerLayout>
        </NavigationContainer>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

let codePushConfig = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  minimumBackgroundDuration: 60,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'Update available',
    optionalUpdateMessage:
      'Click update to upgrade your app to the latest version.',
  },
};

export default __DEV__ ? App : CodePush(codePushConfig)(App);
