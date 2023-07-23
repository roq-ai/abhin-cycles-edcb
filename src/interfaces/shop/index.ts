import { AdvertisementInterface } from 'interfaces/advertisement';
import { CycleInterface } from 'interfaces/cycle';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ShopInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  advertisement?: AdvertisementInterface[];
  cycle?: CycleInterface[];
  user?: UserInterface;
  _count?: {
    advertisement?: number;
    cycle?: number;
  };
}

export interface ShopGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
