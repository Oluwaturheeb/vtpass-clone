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
