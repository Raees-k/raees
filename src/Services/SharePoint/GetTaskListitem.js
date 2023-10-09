import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
const GTStyle = {padding: "10%"}
const GetTaskListItems = async (listname,CurrentUserID) => {
    const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items?$filter=TaskOutcome eq null and AssignedTo eq '${CurrentUserID}'`, {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json; odata=verbose"
        },
    });
    const data = await resp.json();
    console.log(data.d.results);
    // const TaskDetails = []
    // for (var i = 0; i < data.d.results.length; i++) {
    //     console.log(data.d.results[i].Title)
    //     const ParentItemID =data.d.results[i].Title
      
    //     const resp2 = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('PMO')/items?$filter=Id eq '${ParentItemID}'`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Accept": "application/json; odata=verbose"
    //         },
    //     });
    //     const data2 = await resp2.json();
    //     console.log(data2.d.results[0])
    //     const Amount =  data2.d.results[0].yyrh
    //     const Curency =  data2.d.results[0].Currency
    //     const GT01 =  data2.d.results[0].Currency + data2.d.results[0].yyrh
    //    let  GT = GT01.replace(/"/g,"");
    //      console.log(GT)
    //     TaskDetails.push({
    //         ParentId:data.d.results[i].Title,
    //         Id:data.d.results[i].Id,
    //         AssignedToId:data.d.results[i].AssignedToId,
            
    //         Created:data.d.results[i].Created,
    //         DueDate:data.d.results[i].DueDate,
    //         Status:data.d.results[i].Status,
    //         ReviewalStatus:data.d.results[i].ReviewalStatus,
    //         RespondedDate:data.d.results[i].Modified,
    //         PONumber:data2.d.results[0].chff,
    //         InitiatorName:data2.d.results[0].j3xm,
    //         Department:data2.d.results[0].ozud,
    //         GrandTotal:GT,
    //         POJSONData:data2.d.results[0].POJSONData

    //     })
        
        
    // }
    // console.log("OldData",data.d.results )
    // console.log("Newdetails",TaskDetails)
    return data.d.results;
 }
export default GetTaskListItems;