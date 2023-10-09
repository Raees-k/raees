const DeleteAttachment = async (refId,title,path) => {
 const resp = await fetch(`https://po-webapi.alrashidabetong.com/api/Attachment/deletefile?refId=${refId}&title=${title}&path=${path}`, {
     method:'DELETE',
     headers: {
         'Content-Type': 'application/json',
         "Accept": "application/json; odata=verbose"
     },
 });
 const data = await resp.json();
 console.log("Attachment DELETION Status",data);
 //console.log("Length of data from SQL",data == null);
 return data;
 
}
export default DeleteAttachment;