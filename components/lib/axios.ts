import axios from 'axios';

let baseURL = 'http://10.0.2.16:8080/mobile-api/v1';
axios.defaults.baseURL = baseURL;
axios.defaults.params = {};
axios.defaults.params['platform'] = 'mobile';
axios.defaults.params['domain_url'] = 'localhost';

const request = axios;
export default request;
export const money = (num: number, currency = 'NGN') => {
  let format = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  });

  return format.format(num);
};
