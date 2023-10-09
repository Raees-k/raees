import React  from 'react';
import * as momentImported from 'moment'; const moment = momentImported;
const GM10DaysRequest = async (listname,fromDate,TODate) => {
    
     
     
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$select=*&$filter=PendingWith eq 'General MGR' and Created ge datetime'${fromDate}' and Created le datetime'${TODate}'&$top=10000&$orderby=ID%20desc'`, 
    {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    //console.log(data.d.results.length);
    return data.d.results.length;
 }

export default GM10DaysRequest;