import React, { useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CodePush from 'react-native-code-push';
import { Alert, Image, View } from 'react-native';
// import {UserSchema} from './components/schema';
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

// Screens only
import Welcome from './components/Welcome';
import Home from './components/Home';
import Auth from './components/Auth';
import ListVariation from './components/ListVariation';
import Details from './components/Details';
// import Services from './components/services/index';
// import Airtime from './components/Airtime';
// import TransactionDetails from './components/TransactionDetails';
// import {money} from './components/lib/firestore';
// import {UserProvider, useUser} from './components/lib/context';
// import Logs from './components/Logs';
// import Admin from './components/Admin';
// import CustomerProfile from './components/CustomerProfile';
// import Settings from './components/Settings';
// import Statistics from './components/Statistics';
// import Search from './components/Search';
// import Beneficiary from './components/Beneficiary';

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
                  onPress={() =>
                    Alert.alert('Search', 'Implementation is ongoing')
                  }
                  iconColor={MD2Colors.white}
                  style={{ marginVertical: 10 }}
                />
                <IconButton icon="bell-outline" iconColor={MD2Colors.white} />
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
                  variant="titleMedium"
                  style={{ color: MD2Colors.white + 'ff' }}>
                  {props.route.params.title != undefined
                    ? props.route.params.title
                    : props.options.title}
                </Text>
              </View>
              {routeName != 'Auth' && (
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="magnify"
                    onPress={() => props.navigation.navigate('Logs')}
                    iconColor={MD2Colors.white}
                    style={{ marginVertical: 10 }}
                  />
                  <IconButton
                    icon="bell"
                    iconColor={MD2Colors.white}
                    style={{ marginVertical: 10 }}
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
    let { user, setUser, setId } = useUser();

    return (
      <LinearGradient
        colors={[pry, other]}
        style={{ position: 'relative', height: '100%' }}>
        <View>
          <Image
            source={require('./components/assets/vtpass1.png')}
            resizeMode="contain"
            style={{ width: '100%', height: 50, marginVertical: 10 }}
          />
          <TouchableRipple
            rippleColor={pry}
            onPress={() => {
              nav.navigate('Home');
              navRef.current.closeDrawer();
            }}>
            <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
              <IconButton
                style={{ marginVertical: -10 }}
                iconColor={MD2Colors.white}
                icon="cash-fast"
              />
              <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                Pay
              </Text>
            </View>
          </TouchableRipple>
          {user?.id ? (
            <>
              <TouchableRipple
                rippleColor={MD2Colors.white + '44'}
                onPress={() => {
                  nav.navigate('Admin');
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={MD2Colors.white}
                    icon="wallet"
                  />
                  <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                    Load Wallet
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={MD2Colors.white + '44'}
                onPress={() => {
                  nav.navigate('Stats', { stats: 1 });
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={MD2Colors.white}
                    icon="script-text-outline"
                  />
                  <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                    Transactions
                  </Text>
                </View>
              </TouchableRipple>
              {/* <TouchableRipple
                rippleColor={MD2Colors.white + '44'}
                onPress={() => {
                  nav.navigate('Stats', { stats: 1 });
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={MD2Colors.white}
                    icon="script-text-outline"
                  />
                  <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                    Transactions
                  </Text>
                </View>
              </TouchableRipple> */}
              <TouchableRipple
                rippleColor={MD2Colors.white + '44'}
                onPress={() => {
                  nav.navigate('Auth', { type: 'Login' });
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    iconColor={MD2Colors.white}
                    icon="account-cog"
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                    Settings
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={MD2Colors.white + '44'}
                onPress={async () => {
                  await AsyncStorage.removeItem('id');
                  setId('');
                  setUser(UserSchema);
                  navRef.current.closeDrawer();
                  nav.navigate('Welcome');
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={MD2Colors.white}
                    icon="logout"
                  />
                  <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                    Logout
                  </Text>
                </View>
              </TouchableRipple>
            </>
          ) : (
            <>
              <TouchableRipple
                rippleColor={MD2Colors.white + '44'}
                onPress={() => {
                  nav.navigate('Auth', { type: 'Login' });
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    iconColor={MD2Colors.white}
                    icon="login"
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                    Login
                  </Text>
                </View>
              </TouchableRipple>
              <TouchableRipple
                rippleColor={MD2Colors.white + '44'}
                onPress={() => {
                  nav.navigate('Auth', { type: 'Create Account' });
                  navRef.current.closeDrawer();
                }}>
                <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
                  <IconButton
                    style={{ marginVertical: -10 }}
                    iconColor={MD2Colors.white}
                    icon="account-plus"
                  />
                  <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
                    Register
                  </Text>
                </View>
              </TouchableRipple>
            </>
          )}
          <TouchableRipple
            rippleColor={MD2Colors.white + '44'}
            onPress={() => {
              nav.navigate('Logs');
              navRef.current.closeDrawer();
            }}>
            <View style={[styles.frow, styles.fVertCenter, styles.p2]}>
              <IconButton
                style={{ marginVertical: -10 }}
                iconColor={MD2Colors.white}
                icon="help-circle"
              />
              <Text variant="bodySmall" style={{ color: MD2Colors.white }}>
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
              {/* <Stack.Screen
              name="TransactionDetails"
              component={TransactionDetails}
              options={{ title: 'Transaction Details' }}
            />
            <Stack.Screen
              name="Logs"
              component={Logs}
              options={{
                headerTitle: 'Transaction History',
                title: 'Transaction History',
              }}
            />
            <Stack.Screen
              name="CustomerProfile"
              component={CustomerProfile}
              options={{
                title: 'Customer Profile',
              }}
            />
            <Stack.Screen
              name="Admin"
              component={Admin}
              options={{ title: 'Admin panel' }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ title: 'Account Settings' }}
            />
            <Stack.Screen
              name="Stats"
              component={Statistics}
              options={{ title: 'Statistics' }}
            />
            <Stack.Screen
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
