import axios from "axios";
import { defaultRequestConfig } from "./common.js";

export const parseHouseId = (link) => {
  const found = link.match(/\/houses\/(\d+)$/);
  return parseInt(found[1]);
};

export const getHouseById = (id) => {
  return axios({
    ...defaultRequestConfig,
    url: `/houses/${id}`,
  }).then((resp) => {
    resp.data.id = parseHouseId(resp.data.url);
    return resp;
  });
};
