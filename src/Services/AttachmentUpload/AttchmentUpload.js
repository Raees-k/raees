
const AttachmentUpload = async (attachmentdata) => {
 const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept':'application/json; odata=verbose',
  },
  body: JSON.stringify(attachmentdata)
}
 const resp = await fetch(`https://po-webapi.alrashidabetong.com/api/attachment/Upload`, requestOptions);
 const data = await resp.json();
 console.log("Attachment Upload Response API",data);
 return data;
 
}
export default AttachmentUpload;