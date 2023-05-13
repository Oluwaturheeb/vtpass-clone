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

export const fetchUser = async (token: string) => {
  let res = await request.post('/account-details', { user_token: token });
  return res.data;
};

export const transactions = async () => {
  let res = await request.post('/get-transactions');
  return res.data;
};

export const walletPay = async (id: string) => {
  let res = await request.post('/wallet-product-payment/' + id);
  return res.data;
};

export const getNotty = async () => {
  let res = await request.post('/display-all-platform-notification');
  return res.data;
};

export const getTvInfo = async (service: string, card: string) => {
  let res = await request(`multichoice-lookup/${service}/${card}`);
  return res.data;
};

export const earnings = async () => {
  let res = await request.post('get-earnings');
  return res.data;
};

export const getBanks = async () => {
  let res = await request('list-banks');
  return res.data;
};

export const reset2FA = async (token: string, channel: string) => {
  let res = await request.get('reset-twofa/' + channel, {
    params: { user_token: token },
  });
  return res.data;
};

export const update2FA = async (
  token: string,
  old: string,
  newfa: string,
  type: 'create' | 'update',
) => {
  let res = await request.post('update2FA', {
    user_token: token,
    old_fa_pin: encode(old),
    two_fa_pin: encode(newfa),
    confirm_fa_pin: encode(newfa),
    type: type ? 'create' : 'update',
  });
  return res.data;
};

export const refDash = async (token: string) => {
  let res = await request.post('/referral-dashboard', {
    user_token: token,
  });
  return res.data;
};

export const autoWallets = async (token: string) => {
  let res = await request.post('/auto-wallets', {
    user_token: token,
  });
  return res.data;
};

export const changePasswords = async (payload: object) => {
  let res = await request.post('/update-password', payload);
  return res.data;
};

export const submitKyc = async (payload: object) => {
  let res = await request.post('/update-kyc', payload);
  return res.data;
};

export const ticket = async (payload: object) => {
  let res = await request.post('/contact-us', payload);
  return res.data;
};

export const getUserBanks = async () => {
  let res = await request.get('manage-accounts');
  return res.data;
};

export const deleteFunc = async () => {
  let res = await request.post('/delete-account');
  return res.data;
};
