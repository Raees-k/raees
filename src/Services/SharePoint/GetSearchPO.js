const SearchPO = async (listname,PONumber) => {
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$filter=chff eq '${PONumber}'`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    //console.log(data.d.results);
    return data.d.results;
 }
export default SearchPO;