import axios from 'axios';

const API_URL = 'http://api.geonames.org/searchJSON';
const USERNAME = 'weknowit';
const ROW_COUNT = 10;

// Check out http://www.geonames.org/export/codes.html for more info.
const COUNTRY_CLASS = 'A';
const CITY_CLASS = 'P';

/**
 * Perform a search on api endpoint. Should be used for general
 * searches.
 * @param q - The query string.
 * @param isCountry - If you are looking for country or city.
 */
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

/**
 * Perform a specify search query.
 * NOTE: A search without the city supplied will return
 * all the cities within that country ordered by population.
 * @param country - The country that is being searched after
 * @param city - The city that is being searched after
 */
const apiQuery = async (country: string, city = ''): Promise<GeoNames.RootObject | null> => {
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
