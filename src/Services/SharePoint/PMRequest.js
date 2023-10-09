const PMRequest = async (listname) => {
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$select=*&$filter=PendingWith eq 'Purchase MGR'&$top=10000&$orderby=ID%20desc`, 
    {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    return data.d.results.length;
 }

export default PMRequest;