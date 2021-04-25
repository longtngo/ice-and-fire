export const baseURL = process.env.REACT_APP_API_BASE_URL;

export const defaultRequestConfig = {
  baseURL,
  headers: {
    Accept: "application/vnd.anapioficeandfire+json; version=1",
  },
};

const pageNumberReg = /page=(\d+)/;

export const parseLastPage = (link) => {
  const splits = link.split(",");
  const lastChunk = splits[splits.length - 1].trim();
  const found = lastChunk.match(pageNumberReg);
  return parseInt(found[1]);
};

export const parseId = (link, pattern) => {
  const found = link.match(pattern);
  return parseInt(found[1]);
};

export const attachIdToListItem = (list, pattern) => {
  return list.map((item) => {
    item.id = parseId(item.url, pattern);
    return item;
  });
};
