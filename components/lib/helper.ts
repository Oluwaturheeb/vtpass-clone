export const str = (num = 32, flw = true) => {
  let str = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    str += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return flw ? `flw_tx_ref_${str}` : str;
};

export const money = (num: number, currency = 'NGN') => {
  let format = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  });

  return format.format(num);
};

export const validateEmail = (email: string) => {
  let check = new RegExp(
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  ).test(email);

  if (check) return true;
  else return false;
};
