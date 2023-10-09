const GetListItemByPONumber = async (listname, ponumber) => {
 const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$select=ID,chff,POStatus,vwno,Created,POVersion&$orderby=ID desc&$filter=chff eq ${ponumber}`, 
 {
     headers: {
         'Content-Type': 'application/json',
         "Accept": "application/json; odata=verbose"
     },
 });
 const data = await resp.json();
 console.log("Data from list",data.d);
 return data.d.results;
}

export default GetListItemByPONumber;