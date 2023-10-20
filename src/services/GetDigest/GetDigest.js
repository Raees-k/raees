const getDigest = async () => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json; odata=verbose",
    },
  };
  const response = await fetch(`/_api/contextinfo`, requestOptions);
  const data = await response.json();
  return data.d.GetContextWebInformation.FormDigestValue;
};

export default getDigest;
