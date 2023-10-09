const GetCurrentLoginUser = async () => {
    const resp = await fetch(`/sites/apps/pmo/_api/web/CurrentUser`, {
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    console.log("Current logged in user",data.d);
    return data.d;
 }
export default GetCurrentLoginUser;