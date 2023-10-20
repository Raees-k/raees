//constant
import { CONST } from "../../constant";

export const fetchService = async (url, method, body) => {
  let responseJson;
  let response;
  switch (method) {
    case CONST.API_METHOD.POST:
      responseJson = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      response = await responseJson.json();

      return response;

    case CONST.API_METHOD.GET:
      responseJson = await fetch(url);
      response = await responseJson.json();

      return response;
  }
};
