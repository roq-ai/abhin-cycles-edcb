import { ShopInterface } from 'interfaces/shop';
import { GetQueryInterface } from 'interfaces';

export interface CycleInterface {
  id?: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  shop_id?: string;
  created_at?: any;
  updated_at?: any;

  shop?: ShopInterface;
  _count?: {};
}

export interface CycleGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  shop_id?: string;
}
