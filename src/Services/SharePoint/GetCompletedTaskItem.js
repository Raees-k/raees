const GetTaskListItems = async (listname,CurrentUserID) => {
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$top=3000`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    //console.log(data.d.results);
    return data.d.results;
 }
export default GetTaskListItems;