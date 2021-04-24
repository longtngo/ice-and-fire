export const baseURL = process.env.REACT_APP_API_BASE_URL;

export const defaultRequestConfig = {
  baseURL,
  headers: {
    Accept: "application/vnd.anapioficeandfire+json; version=1",
  },
};
