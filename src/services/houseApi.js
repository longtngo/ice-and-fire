import axios from "axios";
import {
  defaultRequestConfig,
  parseId,
  attachIdToListItem,
  parseLastPage,
} from "./common.js";

export const houseIdPattern = /\/houses\/(\d+)$/;
const endpointUrl = "/houses";

export const searchHouses = (params) => {
  return axios({
    ...defaultRequestConfig,
    url: endpointUrl,
    params,
  }).then((resp) => {
    return {
      data: {
        houses: attachIdToListItem(resp.data, houseIdPattern),
        lastPage: parseLastPage(resp.headers.link),
      },
    };
  });
};

export const getHouseById = (id) => {
  return axios({
    ...defaultRequestConfig,
    url: `${endpointUrl}/${id}`,
  }).then((resp) => {
    resp.data.id = parseId(resp.data.url, houseIdPattern);
    return resp;
  });
};
