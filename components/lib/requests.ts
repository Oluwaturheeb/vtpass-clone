import request from './axios';
import { encode } from 'base-64';

export const getService = async () => {
  const res = await request.get('/entry-point');
  return res.data;
};

export const postAuth = async (url: string, payload: object) => {
  let res = await request.post(url, payload);
  return res.data;
};

export const userBalance = async () => {
  let res = await request.post('/get-wallet-balance');
  return res.data;
};

export const initTrans = async (productId: string, payload: object) => {
  let res = await request.post(
    '/initialize-transactions/' + productId,
    payload,
  );

  return res.data;
};

export const registerDevice = async (token: string) => {
  let res = await request.post('/register-device', {
    entryKey: encode('jdali7616vtlkRTcsj|-|' + token),
  });

  return res.data;
};
