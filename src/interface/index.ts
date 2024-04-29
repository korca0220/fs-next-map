export interface StoreType {
  id: number;
  phone?: string | null;
  address?: string | null;
  lat?: string | null;
  lng?: string | null;
  name?: string | null;
  category?: string | null;
  storeType?: string | null;
  feedCertifyName?: string | null;
}

export interface StoreApiResponse {
  page: number;
  data: StoreType[];
  totalCount: number;
  totalPage: number;
}

export interface LocationType {
  lat: number;
  lng: number;
  zoom: number;
}
