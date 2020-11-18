import axios from 'axios';

const API_URL = 'http://api.geonames.org/searchJSON';
const USERNAME = 'weknowit';
const ROW_COUNT = 10;

const COUNTRY_CLASS = 'A';
const CITY_CLASS = 'P';

const apiSearchQuery = async (
  q: string,
  isCountry: boolean,
): Promise<GeoNames.RootObject | null> => {
  try {
    const res = await axios.get<GeoNames.RootObject>(API_URL, {
      params: {
        q,
        maxRows: ROW_COUNT,
        username: USERNAME,
        orderBy: 'relevance',
        featureClass: isCountry ? COUNTRY_CLASS : CITY_CLASS,
      },
    });

    return res.data;
  } catch {
    return null;
  }
};

const apiQuery = async (country: string, city: string): Promise<GeoNames.RootObject | null> => {
  try {
    const res = await axios.get<GeoNames.RootObject>(API_URL, {
      params: {
        q: city,
        country,
        maxRows: ROW_COUNT,
        username: USERNAME,
        orderBy: 'population',
        featureClass: CITY_CLASS,
      },
    });

    return res.data;
  } catch {
    return null;
  }
};

export { apiQuery, apiSearchQuery };
