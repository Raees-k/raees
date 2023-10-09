const GetDigest = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept':'application/json; odata=verbose',
      }
    }
    const response = await fetch(`/sites/apps/PMO/_api/contextinfo`, requestOptions); 
    const data = await response.json();
   // console.log("The context is",data.d.GetContextWebInformation.FormDigestValue);
    return data.d.GetContextWebInformation.FormDigestValue;
  }

  export default GetDigest;