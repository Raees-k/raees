export const VAR = {
  //============== BASE URL =============================
  BASE_URL: "https://isdb.sharepoint.com/sites/ssc",
  // BASE_URL: "http://localhost:3000",
  // BASE_URL: "http://localhost:3456",
  REACT_APP_BUILD_URL: "/quality/IDBSocialClub",
  //====+==================================================

  //============== MAIN APIs PART ===========================
  API: {
    USER: "/_api/sp.userprofiles.peoplemanager/getmyproperties",
    LIST: (listName) => `/_api/web/lists/GetByTitle('${listName}')/items`,
    QUERY: (cloumnName) => `?$select=${cloumnName}`,
    ATTACHMENT: `&$expand=AttachmentFiles`,
    FILTER: (columnName, filterItem) =>
      `&$filter= ${columnName} eq '${filterItem}'`,
  },
  //========================================================

  //=================== API METHODS =========================
  API_METHOD: {
    GET: "GET",
    POST: "POST",
  },
  //===========================================================

  //=================== GOOGLE MAP API KEY =======================
  GOOGLE_MAP_API_KEY: `AIzaSyDSLbXVrXqjCnTtNWh1BbrH-B04EFJdqNg`,
  //==========================================================

  //=================== MELLI  APIs  =======================
  MELLI_BASE_URL: `https://sscstrapifile-uat.isdb.org`,
  // MELLI_INDEX: `IsDB`,
  //==========================================================
};
// https://sscstrapifile-uat.isdb.org/api/search/
