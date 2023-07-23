import { ShopInterface } from 'interfaces/shop';
import { GetQueryInterface } from 'interfaces';

export interface AdvertisementInterface {
  id?: string;
  content: string;
  shop_id?: string;
  created_at?: any;
  updated_at?: any;

  shop?: ShopInterface;
  _count?: {};
}

export interface AdvertisementGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  shop_id?: string;
}
