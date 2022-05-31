export type RoomParkData = {
  Bedrooms: Array<string>;
  Bathroom: string;
  Parking: string;
  Search: string;
  Interval: string;
  [key: string]: Array<string> | string;
};
export type FiltersDateType = 'Bedrooms' | 'Bathroom' | 'Parking';
