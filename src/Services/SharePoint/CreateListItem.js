const CreateListItem = async (listname, item,digest) => {
    const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json; odata=verbose',
            "X-RequestDigest":digest,
            'credentials':'same-origin'
          },
          body: JSON.stringify(item)
        }
        console.log(requestOptions);
        const resp = await fetch(`/sites/apps/PMO/_api/web/lists/GetByTitle('${listname}')/items`, requestOptions); 
        const data = await resp.json();
        //console.log("The created employee is",data);
        return data.d;
      }
export default CreateListItem;