import React, { useEffect, useState } from 'react';
import { ScreenProps } from './types/types';
import { Linking, ScrollView, View, BackHandler } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';
import styles, { other } from './styles';
import WebView from 'react-native-webview';

const Help = ({ route, navigation }: ScreenProps) => {
  const [url, setUrl] = useState({ set: false, url: '' });

  useEffect(() => {
    return void BackHandler?.addEventListener(
      'hardwareBackPress',
      () => void setUrl({ ...url, set: false }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {url.set ? (
        <WebView source={{ uri: url.url }} style={{ flex: 1 }} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ padding: 10 }}>
            <Text variant="titleLarge" style={{ color: other }}>
              Contact Us
            </Text>
            <Text variant="bodySmall" style={{ color: other }}>
              At VTpass.com we are dedicated ti making our customers happy. Use
              any of the options below to get your resolved. Our channel are
              available 24/7.
            </Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.p1}>
            <Card
              mode="outlined"
              style={{
                borderColor: other,
                backgroundColor: 'transparent',
                marginVertical: 10,
              }}>
              <Card.Content>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="alert-decagram"
                    iconColor={other}
                    size={20}
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="titleMedium" style={{ color: other }}>
                    Self Issue Resolution
                  </Text>
                </View>
                <Text
                  variant="bodySmall"
                  style={{
                    color: other + 'cc',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  Use In App tools to resolve your issues with any help. Click
                  here to start.
                </Text>
              </Card.Content>
            </Card>
            <Card
              mode="outlined"
              style={{
                borderColor: other,
                backgroundColor: 'transparent',
                marginVertical: 10,
              }}>
              <Card.Content>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="ticket-account"
                    iconColor={other}
                    size={20}
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="titleMedium" style={{ color: other }}>
                    Submit a ticket
                  </Text>
                </View>
                <Text
                  variant="bodySmall"
                  style={{
                    color: other + 'cc',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  Submit a ticket to our support team. Get professional
                  resolution in less 30mins.
                </Text>
              </Card.Content>
            </Card>
            <Card
              onPress={() =>
                setUrl({
                  set: true,
                  url: 'www.vtpass.com/mobile-api/v1/zoho-live-chat',
                })
              }
              mode="outlined"
              style={{
                borderColor: other,
                backgroundColor: 'transparent',
                marginVertical: 10,
              }}>
              <Card.Content>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="wechat"
                    iconColor={other}
                    size={20}
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="titleMedium" style={{ color: other }}>
                    Live Chat
                  </Text>
                </View>
                <Text
                  variant="bodySmall"
                  style={{
                    color: other + 'cc',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  Chat with an agent and get your issues resolved instantly.
                  Available 24/7.
                </Text>
              </Card.Content>
            </Card>
            <Card
              onPress={() => setUrl({ set: true, url: 'www.vtpass.com/faqs' })}
              mode="outlined"
              style={{
                borderColor: other,
                backgroundColor: 'transparent',
                marginVertical: 10,
              }}>
              <Card.Content>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="help-circle"
                    iconColor={other}
                    size={20}
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="titleMedium" style={{ color: other }}>
                    FAQs
                  </Text>
                </View>
                <Text
                  variant="bodySmall"
                  style={{
                    color: other + 'cc',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  Go through our Frequently Asked Questions.
                </Text>
              </Card.Content>
            </Card>
            <Card
              onPress={async () => await Linking.openURL('tel:08138752358')}
              mode="outlined"
              style={{
                borderColor: other,
                backgroundColor: 'transparent',
                marginVertical: 10,
              }}>
              <Card.Content>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="phone"
                    iconColor={other}
                    size={20}
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="titleMedium" style={{ color: other }}>
                    Phone Call
                  </Text>
                </View>
                <Text
                  variant="bodySmall"
                  style={{
                    color: other + 'cc',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  Call our support agent on{' '}
                  <Text
                    variant="bodySmall"
                    style={{ fontWeight: 'bold', color: other }}>
                    08138752358
                  </Text>
                </Text>
              </Card.Content>
            </Card>
            <Card
              onPress={() => setUrl({ set: true, url: 'www.vtpass.com/blog' })}
              mode="outlined"
              style={{
                borderColor: other,
                backgroundColor: 'transparent',
                marginVertical: 10,
              }}>
              <Card.Content>
                <View style={[styles.frow, styles.fVertCenter]}>
                  <IconButton
                    icon="account-details"
                    iconColor={other}
                    size={20}
                    style={{ marginVertical: -10 }}
                  />
                  <Text variant="titleMedium" style={{ color: other }}>
                    VTpass Blog
                  </Text>
                </View>
                <Text
                  variant="bodySmall"
                  style={{
                    color: other + 'cc',
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                  }}>
                  Need to learn more? Visit our blog for interesting and
                  educating contents.
                </Text>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Help;
