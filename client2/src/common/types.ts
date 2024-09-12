export type ICartItemType = {
  _id: string;
  name: string;
  price: number;
  available_units: number;
  display_image_url: string;
  __v: number;
};

export type ICartContextItem = {
  _id: string;
  name: string;
  price: number;
  display_image_url: string;
  quantity: number;
};
