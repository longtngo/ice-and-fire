import axios from "axios";
import { defaultRequestConfig } from "./common.js";

export const parseCharacterId = (link) => {
  const found = link.match(/\/characters\/(\d+)$/);
  return parseInt(found[1]);
};

const pageNumberReg = /page=(\d+)/;

const parseLastPage = (link) => {
  const splits = link.split(",");
  const lastChunk = splits[splits.length - 1].trim();
  const found = lastChunk.match(pageNumberReg);
  return parseInt(found[1]);
};

const processCharacterList = (characters) => {
  return characters.map((character) => {
    character.id = parseCharacterId(character.url);
    return character;
  });
};

export const searchCharacters = (params) => {
  return axios({
    ...defaultRequestConfig,
    url: "/characters",
    params,
  }).then((resp) => {
    return {
      data: {
        characters: processCharacterList(resp.data),
        lastPage: parseLastPage(resp.headers.link),
      },
    };
  });
};

export const getCharacterById = (id) => {
  return axios({
    ...defaultRequestConfig,
    url: `/characters/${id}`,
  }).then((resp) => {
    resp.data.id = parseCharacterId(resp.data.url);

    return { data: resp.data };
  });
};
