import axios from 'axios';

let baseURL = 'http://10.0.2.16:8080/mobile-api/v1';

axios.defaults.baseURL = baseURL;
axios.defaults.params = {};
axios.defaults.params['devicekey'] = 'amRhbGk3NjE2dnRsa1JUY3NqfC18OTAxOTgy';

const request = axios;
export default request;
