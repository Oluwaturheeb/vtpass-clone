import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScreenProps } from './types/types';
import { Card, IconButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import { earnings } from './lib/requests';
import { useUser } from './lib/context';
import { Loader } from './Components';
import { myEarnings } from './types/schema';
import styles, { other } from './styles';
import { money } from './lib/helper';

const Earnings = ({ navigation }: ScreenProps) => {
  const [earning, setEarning] = useState({ loading: true, data: myEarnings });
  const { id } = useUser();

  useEffect(() => {
    (async () => {
      let getEarning = await earnings(id.userToken);
      if (getEarning.accounts) {
        setEarning({ loading: false, data: getEarning });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {earning.loading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1, padding: 10 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Card
              style={[
                styles.fcenter,
                {
                  margin: 5,
                  width: '47%',
                  borderRadius: 5,
                  backgroundColor: 'white',
                  height: 120,
                },
              ]}>
              <Card.Content style={styles.fVertCenter}>
                <Text variant="titleLarge" style={{ color: other }}>
                  {money(earning.data.earning_balance)}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ marginTop: 7, color: other }}>
                  Earning Balance
                </Text>
              </Card.Content>
            </Card>
            <Card
              style={[
                styles.fcenter,
                {
                  margin: 5,
                  width: '47%',
                  borderRadius: 5,
                  backgroundColor: 'white',
                  height: 120,
                },
              ]}>
              <Card.Content style={styles.fVertCenter}>
                <Text variant="titleLarge" style={{ color: other }}>
                  {money(earning.data.total_earned)}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ marginTop: 7, color: other }}>
                  Total Earnings
                </Text>
              </Card.Content>
            </Card>
            <Card
              style={[
                styles.fcenter,
                {
                  margin: 5,
                  width: '47%',
                  borderRadius: 5,
                  backgroundColor: 'white',
                  height: 120,
                },
              ]}>
              <Card.Content style={styles.fVertCenter}>
                <Text variant="titleLarge" style={{ color: other }}>
                  {money(earning.data.total_withdrawn)}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ marginTop: 7, color: other }}>
                  Total Withdrawn
                </Text>
              </Card.Content>
            </Card>
            <Card
              style={[
                styles.fcenter,
                {
                  margin: 5,
                  width: '47%',
                  borderRadius: 5,
                  backgroundColor: 'white',
                  height: 120,
                },
              ]}>
              <Card.Content style={styles.fVertCenter}>
                <Text variant="titleLarge" style={{ color: other }}>
                  {earning.data.invites_count}
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ marginTop: 7, color: other }}>
                  No Referrals
                </Text>
              </Card.Content>
            </Card>
          </View>
          <Card mode="elevated" style={{ margin: 5, backgroundColor: 'white' }}>
            <Card.Content
              style={[styles.frow, styles.fspace, styles.fVertCenter]}>
              <Text variant="titleMedium" style={{ color: other }}>
                Referral Dashboard
              </Text>
              <IconButton
                icon="chevron-right"
                iconColor={other}
                size={32}
                style={{ margin: -10 }}
              />
            </Card.Content>
          </Card>
          <Card mode="elevated" style={{ margin: 5, backgroundColor: 'white' }}>
            <Card.Content
              style={[styles.frow, styles.fspace, styles.fVertCenter]}>
              <Text variant="titleMedium" style={{ color: other }}>
                Withdraw Earnings
              </Text>
              <IconButton
                icon="chevron-right"
                iconColor={other}
                size={32}
                style={{ margin: -10 }}
              />
            </Card.Content>
          </Card>
          <Card mode="elevated" style={{ margin: 5, backgroundColor: 'white' }}>
            <Card.Content
              style={[styles.frow, styles.fspace, styles.fVertCenter]}>
              <Text variant="titleMedium" style={{ color: other }}>
                Hearning History
              </Text>
              <IconButton
                icon="chevron-right"
                iconColor={other}
                size={32}
                style={{ margin: -10 }}
              />
            </Card.Content>
          </Card>
          <Card mode="elevated" style={{ margin: 5, backgroundColor: 'white' }}>
            <Card.Content
              style={[styles.frow, styles.fspace, styles.fVertCenter]}>
              <Text variant="titleMedium" style={{ color: other }}>
                Withdwral History
              </Text>
              <IconButton
                icon="chevron-right"
                iconColor={other}
                size={32}
                style={{ margin: -10 }}
              />
            </Card.Content>
          </Card>
        </View>
      )}
    </View>
  );
};

export default Earnings;
