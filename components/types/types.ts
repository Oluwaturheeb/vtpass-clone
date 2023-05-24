interface Services {
  code: string;
  content: [Service];
  message: string;
}

export interface Service {
  extras: [] | string;
  icon: string;
  id: number;
  name: string;
}

interface ServiceExtra {
  accept_field_label: string;
  allow_variation_amount_edit: number;
  convinience_fee: number;
  description: string;
  description2: string;
  image: string;
  is_mobile_voucher: boolean;
  is_quantity: boolean;
  is_unique: boolean;
  maximum_amount: number;
  minimium_amount: number;
  name: string;
  page_type: string;
  product_id: number;
  product_type: string;
  quantity_label: string;
  serviceID: string;
  unique_element: boolean;
  unique_element_description: boolean;
  var_count: boolean;
  variations: ServiceExtraVariation;
}

interface ServiceExtraVariation {
  variations: {
    countries: [];
    foreign_variation: [];
    variation_name: string;
    variations: Variation;
  };
}

export interface Variation {
  variation: string;
  amount: number;
  identifier: string;
  product_id: number;
  is_unique: boolean;
  unique_element: boolean;
  unique_element_description: boolean;
  is_quantity: boolean;
  is_mobile_voucher: boolean;
}

export interface Transaction {
  id: number;
  transactionId: number;
  amount: number;
  convinience_fee: number;
  reference: string;
  method: string;
  wepaid_gateway_fee: undefined | string;
  customer_id: number;
  name: string;
  phone: string;
  email: string;
  type: string;
  created_at: string;
  updated_at: string;
  reason: undefined | string;
  payment_response: string;
  payment_description: string;
  discount: string;
  giftcard_id: string;
  total_amount: number;
  is_api: number;
  commission: string | undefined;
  channel: string;
  referral_id: string;
  extras: string;
  service_verification: string;
  memo: string;
  is_flagged: number;
  receipt_extras: string;
  quantity: number;
  unit_price: number;
  initiated_id: string;
  final_id: string;
  unique_element: string;
  product_id: number;
  product_name: string;
  flagged_admin: string;
  vtpass_deposit_reference: string;
  customer_deposit_reference: string;
  platform: string;
  customer_processing_fee: string;
  deviceID: string;
  admin_id: number;
  in_suspend: string;
  ip: string;
  cron_trial_no: number;
  cron_last_trial: string;
  service_commission: number;
  domain_id: number;
  domain_convenience: string | number;
  domain_commission: number | string;
  external_requestId: string;
  src: string;
  idc: string;
  app_version: string;
  prodImg: string;
  status: string;
  receipt: string;
  extra_s: string;
}

interface TransactionData {
  loading: boolean;
  data: [Transaction];
  filter: [Transaction];
  key: any;
}

interface TransactionStatus {
  status: string;
  content: TransactionStatusContent;
}

interface TransactionStatusContent {
  id: number;
  transactionId: number;
  amount: number;
  convinience_fee: number;
  status: string;
  reference: string;
  method: string;
  wepaid_gateway_fee: null;
  customer_id: null;
  name: string;
  phone: string;
  email: string;
  type: string;
  created_at: string;
  updated_at: string;
  reason: string;
  payment_response: string;
  payment_description: string;
  discount: string;
  giftcard_id: string;
  total_amount: number;
  is_api: number;
  commission: number;
  channel: string;
  referral_id: number;
  extras: string;
  service_verification: null;
  memo: null;
  is_flagged: number;
  receipt_extras: null;
  quantity: number;
  unit_price: number;
  initiated_id: null;
  final_id: null;
  unique_element: number;
  product_id: number;
  product_name: string;
  flagged_admin: null;
  vtpass_deposit_reference: null;
  customer_deposit_reference: null;
  platform: string;
  customer_processing_fee: string;
  deviceID: string;
  admin_id: null;
  in_suspend: null;
  ip: string;
  cron_trial_no: number;
  cron_last_trial: string;
  service_commission: number;
  domain_id: number;
  domain_convenience: number;
  domain_commission: number;
  external_requestId: null;
  src: null;
  idc: null;
  app_version: string;
  statusx: string;
  prodImg: string;
  extra_s: string;
  receipt: string;
}

export interface ScreenProps {
  navigation: {
    addListener: Function;
    canGoBack: Function;
    dispatch: Function;
    getId: Function;
    getParent: Function;
    getState: Function;
    goBack: Function;
    isFocused: Function;
    navigate: Function;
    pop: Function;
    popToTop: Function;
    push: Function;
    removeListener: Function;
    replace: Function;
    reset: Function;
    setOptions: Function;
    setParams: Function;
  };
  route: { key: string; name: string; params: any };
}

export interface Customer {
  account_manager_id: number;
  admin_id: number | string;
  affiliateId: number;
  callback_url: string;
  category: string;
  commission: number;
  created_at: string;
  customer_type: number;
  domain_id: number;
  email_verification_code: number;
  gift_voucher_count: number;
  id: number;
  is_old: number;
  is_verified: number;
  lock_reason: string;
  reason: string;
  referral_id: number;
  required_pass_change: number;
  reset_time: number;
  security_question_trial: number;
  seen: number;
  sms_count: number;
  special_agent: number;
  status: 'active' | 'inactive';
  sub_terminal_role: number;
  sub_tp_role: number;
  updated_at: string;
  user_id: number;
  verification_code: number;
  verify_count: number;
  wallet: number;
  wallet_min: any;
}

export interface User {
  api_authentication_type: string;
  api_key: string;
  bank_reference: string;
  bvn: number;
  bvn_phone_number: string;
  campaign_flag: string;
  check_request_id: string;
  company_name: string;
  created_at: string;
  customer: Customer;
  date_of_birth: string;
  domain_id: number;
  duplicate_check: string;
  email: string;
  facebook: any;
  gender: any;
  home_address: string;
  id: number;
  idc: string;
  image: string;
  ip_lock: number;
  lastname: string;
  local_govt: string;
  middle_name: string;
  mobile_type: string;
  name: string;
  parent: string;
  phone: string;
  public_key: string;
  s_token: string;
  secret_key: string;
  src: string;
  state: string;
  status: 'active' | 'inactive';
  twitter: string;
  two_fa_pin: string;
  two_fa_status: 'in-active' | 'active';
  twofa_reset_token_expires: string;
  updated_at: string;
  w_token: string;
  wallet_lock: number;
}

export interface ID {
  id: number;
  deviceToken: string;
  deviceId: string;
  userToken: string;
  login: true | false;
}

export interface Account {
  id: number;
  name: string;
}

export interface MyEarning {
  accounts: Account[];
  earning_balance: number;
  invites_count: number;
  refer_status: number;
  refer_system_status: number;
  ta_status: number;
  total_earned: number;
  total_withdrawn: number;
  tp_status: number;
}

export interface MyWallet {
  id: number;
  account_reference: string;
  account_number: number;
  account_name: string;
  bank_name: string;
  provider: string;
  trans_lower_amt: number;
  trans_upper_amt: number;
  daily_upper_limit: number;
  charge_flat: number;
  charge_percentage: number;
  charge_cap: number;
  bvn: number;
  verification_status: string;
  date_created: string;
  customer_id: number;
  email: string;
  creation_method: string;
  purpose: string;
  status: string;
  admin_id: number;
  created_at: string;
  updated_at: string;
  domain_id: number;
}

export interface MyBank {
  account_name: string;
  account_number: number;
  alias: string;
  bank_name: string;
  created_at: string;
  customer_id: number;
  domain_id: number;
  id: number;
  identifier: string;
  status: 'active' | 'inactive';
  updated_at: string;
}

export interface Referral {
  invites: [];
  invites_count: number;
  refCode: number;
  refLink: string;
  refMessage: string;
  refer_code_status: number;
  refer_status: number;
}

export interface BillerInfo {
  loading: boolean;
  code: string;
  content: {
    customer_name?: string;
    name?: string;
    due_date?: string;
    amount?: number;
    error?: string;
  };
}

export interface Notty {
  id: number;
  subject: string;
  date: string;
  flag: string;
  content: string;
  preamble: string;
}

export interface PrinterObj {
  device_name: string;
  inner_mac_address: string;
}
