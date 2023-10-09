
const GetPODetailsbyNumber = async (ponumber) => {
    const resp = await fetch(`https://po-webapi.alrashidabetong.com/api/PODetails?PONumber=${ponumber}`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const response = await resp;
    //console.log("response", response)
    if (response.ok){
        const data = await resp.json();
        return JSON.parse(data);
    }else{
      alert("Purchase Order Fetching API is not working. Please check with your IT Support.");
    }
    
 }
export default GetPODetailsbyNumber;