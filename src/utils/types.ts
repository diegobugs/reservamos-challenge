/*
  DEFINE ALL GLOBAL TYPES FOR THE APPLICATION
*/

export type Place = {
  id: number;
  slug: string;
  city_slug: string;
  display: string;
  ascii_display: string;
  city_name: string;
  city_ascii_name: string;
  state: string;
  country: string;
  lat: string;
  long: string;
  result_type: string;
  popularity: string;
  sort_criteria: number;
};

export type PlacesResponse = Array<Place>;
