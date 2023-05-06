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

export const userBalance = async (token: string) => {
  let res = await request.post('/get-wallet-balance', { user_token: token });
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

export const fetchUser = async (token: string) => {
  let res = await request.post('/account-details', { user_token: token });
  return res.data;
};

export const transactions = async (token: string) => {
  let res = await request.post('/get-transactions', { user_token: token });
  return res.data;
};

export const walletPay = async (id: string, token: string) => {
  let res = await request.post('/wallet-product-payment/' + id, {
    user_token: token,
  });
  return res.data;
};

export const getNotty = async (token: string) => {
  let res = await request.post('/display-all-platform-notification', {
    user_token: token,
  });
  return res.data;
};

export const getTvInfo = async (service: string, card: string) => {
  let res = await request(`multichoice-lookup/${service}/${card}`);
  return res.data;
};
