/// <reference types="react-scripts" />
declare namespace GeoNames {

  export interface AdminCodes1 {
    ISO3166_2: string;
  }

  export interface Geoname {
    adminCode1: string;
    lng: string;
    geonameId: number;
    toponymName: string;
    countryId: string;
    fcl: string;
    population: number;
    countryCode: string;
    name: string;
    fclName: string;
    countryName: string;
    fcodeName: string;
    adminName1: string;
    lat: string;
    fcode: string;
    adminCodes1: AdminCodes1;
  }

  export interface RootObject {
    totalResultsCount: number;
    geonames: Geoname[];
  }
}
