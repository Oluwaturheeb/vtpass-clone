import React, { useEffect, useState } from 'react';
import { useUser } from './lib/context';
import { Text } from 'react-native-paper';

const AutoWallet = () => {
  const { id } = useUser();
  const [data, setData] = useState({ loading: true, data: [mywallet] });

  useEffect(() => {
    (async () => {
      let data;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Text variant="bodySmall">{JSON.stringify(data)}</Text>;
};

export default AutoWallet;
