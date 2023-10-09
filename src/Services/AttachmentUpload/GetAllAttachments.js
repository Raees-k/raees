const GetAllAttachments = async (refId) => {
 const resp = await fetch(`https://po-webapi.alrashidabetong.com/api/Attachment/GetAttach?refId=${refId}`, {
     headers: {
         'Content-Type': 'application/json',
         "Accept": "application/json; odata=verbose"
     },
 });
 const data = await resp.json();
 //console.log("Attachment Commit Status",data);
 return data;
 
}
export default GetAllAttachments;