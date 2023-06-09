import request from './axios';
import { encode } from 'base-64';

export const getService = async (params: object) => {
  const res = await request.get('/entry-point', { params: params });
  // console.log(JSON.stringify(res, '', 1));
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

export const verify2FA = async (data: any) => {
  let res = await request.post('verify-2fapin', data);
  return res.data;
};

export const refDash = async () => {
  let res = await request.post('/referral-dashboard');
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

export const addBank = async (body: object) => {
  let res = await request.post('/add-bank-account', body);
  return res.data;
};

export const deleteFunc = async () => {
  let res = await request.post('/delete-account');
  return res.data;
};

export const dynamicPayment = async (type: string, trx: string) => {
  let str = encode(encode(encode(trx)));
  let res = await request.get(`mobile-process-dynamic-pay/${type}/${str}`);
  return res.data;
};

export const refComm = async () => {
  let res = await request.post('/get-commissions');
  return res.data;
};

export const refJoin = async (name: string) => {
  let res = await request.post('/activate-referral', { name });
  return res.data;
};

export const sendRefMsg = async (data: object) => {
  let res = await request.post('/send-referral-invite', data);
  return res.data;
};

export const getWithdrawal = async (search?: object) => {
  let res = await request.post('/get-withdrawals', search);
  return res.data;
};

export const withdrawComm = async (method: object) => {
  let res = await request.post('/withdraw-commission', method);
  return res.data;
};

export const findToken = async (body: object) => {
  let res = await request.post('/find-my-token', body);
  return res.data;
};

export const loadWallet = async (amount: any) => {
  let res = await request.post('/initiate-wallet-load', { amount: amount });
  return res.data;
};

export const merchantVerify = async (params: object) => {
  let base = request.defaults.baseURL;
  base = base?.substring(-1, base.length - 13);
  let req = await request.get(base + 'ajax/merchant-verify', {
    params: params,
  });

  return req.data;
}
