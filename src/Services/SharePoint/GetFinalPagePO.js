const FinalPagePO = async (listname,StartingFrom) => {
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('PMO')/items?%24skiptoken=Paged%3dTRUE%26p_ID%3d${StartingFrom}&%24top=2000&$filter=RequestStatus eq 'Completed'`, 
    {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    return data.d.results;
 }

export default FinalPagePO;