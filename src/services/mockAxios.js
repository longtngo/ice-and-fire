const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");

export const mockAxios = new MockAdapter(axios);

export const mockSearch = (url, data, statusCode = 200, headers) => {
  mockAxios.onGet(url).reply(statusCode, data, {
    link: `fake/api/characters?page=2&pageSize=10>; rel="next", fake/api/characters?page=1&pageSize=10>; rel="first", fake/api/characters?page=45&pageSize=10>; rel="last"`,
    ...headers,
  });
};
