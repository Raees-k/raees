// Environment Variables
import { VAR } from "../env.js";

export const CONST = {
  BASE_URL: `${VAR.BASE_URL}`,
  API: {
    USER: "/_api/sp.userprofiles.peoplemanager/getmyproperties",
    LIST: listName => `/_api/web/lists/GetByTitle('${listName}')/items`,
    QUERY: cloumnName => `?$select=${cloumnName}`,
    ATTACHMENT: `&$expand=AttachmentFiles`,
    FILTER: (columnName, filterItem) =>
      `&$filter= ${columnName} eq '${filterItem}'`,
  },
  REGEX: {
    EMAIL:
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    ALL_ALBHABET: /^[A-Za-z]+$/,
    PHONENUMBER: /^(\+[\d]{1,5}|0)?[1-9]\d{9}$/,
  },
  API_METHOD: {
    GET: `${VAR.API_METHOD.GET}`,
    POST: `${VAR.API_METHOD.POST}`,
  },
  GOOGLE_API_KEY: `${VAR.GOOGLE_MAP_API_KEY}`,
  MELLI_URL: {
    MELLI_BASE_URL: `${VAR.MELLI_BASE_URL}`,
    // MELLI_INDEX_PATH: `/indexes/${VAR.MELLI_INDEX}`,
  },
};
