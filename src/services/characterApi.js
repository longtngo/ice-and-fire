import axios from "axios";
import {
  defaultRequestConfig,
  parseLastPage,
  parseId,
  attachIdToListItem,
} from "./common.js";

export const characterIdPattern = /\/characters\/(\d+)$/;
const endpointUrl = "/characters";

export const searchCharacters = (params) => {
  return axios({
    ...defaultRequestConfig,
    url: endpointUrl,
    params,
  }).then((resp) => {
    return {
      data: {
        characters: attachIdToListItem(resp.data, characterIdPattern),
        lastPage: parseLastPage(resp.headers.link),
      },
    };
  });
};

export const getCharacterById = (id) => {
  return axios({
    ...defaultRequestConfig,
    url: `${endpointUrl}/${id}`,
  }).then((resp) => {
    resp.data.id = parseId(resp.data.url, characterIdPattern);

    return { data: resp.data };
  });
};
