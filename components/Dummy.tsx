import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { autoWallets } from './lib/requests';
import { mywallet } from './types/schema';
import { Text } from 'react-native-paper';

const AutoWallet = () => {
  const { id } = useUser();
  const [data, setData] = useState({ loading: true, data: [mywallet] });

  useEffect(() => {
    (async () => {
      let data = await autoWallets(id.userToken);

      if (data.status == 'success') {
        setData(data.content);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Text variant="bodySmall">{JSON.stringify(data)}</Text>;
};

export default AutoWallet;
