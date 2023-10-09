import React from 'react';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format'

       const GetPOData = async (listname) => {
            const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?&$top=100&$orderby=ID%20desc')`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json; odata=verbose"
                },
            });
            let results = [];
            const data = await resp.json();
            //console.log(data.d.results)
            for (var i = 0; i <data.d.results.length; i++) {
            const Total = data.d.results[i].yyrh
            const Cuurency = `${JSON.parse(data.d.results[i].POJSONData).Currency} `
            const GT = Cuurency+Total
            const GT2 = (GT.replace(/"([^"]+(?="))"/g, '$1'));
            //console.log(GT2)
            results.push({TicketNumber:data.d.results[i].vwno,RespondedDate:data.d.results[i].RespondedDate, PONumber:data.d.results[i].chff,POMaker:data.d.results[i].j3xm,Department:data.d.results[i].ozud,GrandTotal:GT2
                
                ,RequestedDate:data.d.results[i].Created,RequestStatus:data.d.results[i].RequestStatus,ApprovalStatus:data.d.results[i].ApprovalStatus,PendingWith:data.d.results[i].PendingWith})
                //console.log(results)
            }
            return results;
         }
        export default GetPOData;