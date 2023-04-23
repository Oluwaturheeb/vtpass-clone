interface Services {
  code: string;
  content: Service[];
  message: string;
}

interface Service {
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
    variations: DataVariation;
  };
}

interface DataVariation {
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
