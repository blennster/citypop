import axios from 'axios';

const API_URL = 'http://api.geonames.org/searchJSON';

const apiSearchQuery = async (
  q: string,
  isCountry: boolean,
): Promise<GeoNames.RootObject | null> => {
  try {
    const res = await axios.get<GeoNames.RootObject>(API_URL, {
      params: {
        q,
        maxRows: 10,
        username: 'weknowit',
        orderBy: 'relevance',
        featureClass: isCountry ? 'A' : 'P',
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
        maxRows: 10,
        username: 'weknowit',
        orderBy: 'population',
        featureClass: 'P',
      },
    });

    return res.data;
  } catch {
    return null;
  }
};

export { apiQuery, apiSearchQuery };
