import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ScreenProps } from './types/types';
import { Card, IconButton, Text } from 'react-native-paper';
import { View } from 'react-native';
import { refDash } from './lib/requests';
import { Loader } from './Components';
import styles, { other } from './styles';
import { money } from './lib/helper';
import { refSchema } from './types/schema';

const Refdash = ({ navigation }: ScreenProps) => {
  const [ref, setRef] = useState<{ loading: boolean; data: any }>({
    loading: true,
    data: refSchema,
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

  return (
    <View style={{ flex: 1 }}>
      {ref.loading ? (
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
                  {}
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

export default Refdash;
