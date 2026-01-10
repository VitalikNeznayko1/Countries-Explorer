import apiClient from "./apiClient";

const countryApi = {
  getAll: () =>
    apiClient.get(
      "/all?fields=name,flags,landlocked,capital,population,region,cca3,continents,subregion"
    ),

  getByCode: (code) => apiClient.get(`/alpha/${code}`),

  getByLanguage: (lang) => apiClient.get(`/lang/${lang}`),

  getByRegion: (region) => apiClient.get(`/region/${region}`),
};

export default countryApi;
