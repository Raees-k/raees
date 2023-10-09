const GetListItemByID = async (listname, ID) => {
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items('${ID}')`, 
    {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    //console.log("ID",data.d);
    return data.d;
 }

export default GetListItemByID;