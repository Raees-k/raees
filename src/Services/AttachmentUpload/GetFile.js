const GetFile = async (title,path) => {
 const resp = await fetch(`https://po-webapi.alrashidabetong.com/api/Attachment/Getfile?title=${title}&path=${path}`, {
     headers: {
         'Content-Type': 'application/json',
         "Accept": "application/json; odata=verbose"
     },
 });
 const data = await resp.json();
 console.log("Attachment Commit Status",data);
 //console.log("Length of data from SQL",data == null);
 return data;
 
}
export default GetFile;