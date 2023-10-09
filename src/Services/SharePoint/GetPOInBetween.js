import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format'

       const GetPODataInBetween = async (listname,fromDate01,TODate01) => {
            const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$select=*&$filter=(Created ge datetime'${fromDate01}') and (Created le datetime'${TODate01}')`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json; odata=verbose"
                },
            });
            let results = [];
            const data = await resp.json();
            console.log(data.d.results)
            for (var i = 0; i <data.d.results.length; i++) {
            results.push({TicketNumber:data.d.results[i].vwno, PONumber:data.d.results[i].chff,POMaker:data.d.results[i].j3xm,Department:data.d.results[i].ozud,GrandTotal:
                <NumberFormat style={{textAlign: 'right'}} value={data.d.results[i].yyrh || 0} displayType={'text'} thousandSeparator={true} prefix={`${JSON.parse(data.d.results[i].POJSONData).Currency} `}/>
                ,RequestedDate:data.d.results[i].Created,RequestStatus:data.d.results[i].RequestStatus,ApprovalStatus:data.d.results[i].ApprovalStatus,PendingWith:data.d.results[i].PendingWith})
                //console.log(results)
            }
            return results;
         }
        export default GetPODataInBetween;