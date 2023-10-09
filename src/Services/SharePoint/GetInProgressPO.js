const GetInProgressPO = async (listname) => {
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$orderby=ID desc`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    //console.log(data.d.results[0].Id);
    return data.d.results;
 }
export default GetInProgressPO;