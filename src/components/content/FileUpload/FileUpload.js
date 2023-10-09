import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {Row, Col, Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSpinner } from '@fortawesome/free-solid-svg-icons'
import FileBase64 from 'react-file-base64';
import { v1 as uuidv1 } from 'uuid';
import UploadAttachment from '../../../Services/AttachmentUpload/AttchmentUpload'
import GetAllAttachments from '../../../Services/AttachmentUpload/GetAllAttachments'
import DeleteAttachment from '../../../Services/AttachmentUpload/DeleteAttachment'
import './FileUpload.css'

class FileUpload extends Component {
 constructor(props) {
  super(props);
  this.state = {
   selectedFiles: null,
   selected:false,
   RefID:null,
   uploadedFiles:[],
   uploading:false,
   deleting:false
   }
 }

 componentDidMount(){
  
  if(this.props.mode === 'view' ||this.props.mode === 'ArchivedPOview' ||this.props.mode === 'Taskview' ){
   console.log("RefID View Mode", this.props.AttachmentRefID)
   this.setState({RefID:this.props.AttachmentRefID},this.UpdateAttachmentDetailsInView)
  }else{
     const RefID = uuidv1();
     this.setState({RefID:RefID});
  }
 }

 UpdateAttachmentDetailsInView = ()=>{
    GetAllAttachments(this.state.RefID)
    .then(d => {
       console.log("All Attachments in View Mode",JSON.parse(d));
       // const uploadedFiles = [...this.state.uploadedFiles];
       // uploadedFiles.push(JSON.parse(d));
       this.setState({
        uploadedFiles:JSON.parse(d)
       })
    })
 }

getFiles(files){ 
 this.setState({ selectedFiles: files,selected:true })
}

handleAttachmentTable = () =>{
    const path = `C:\\POAttachments\\${this.state.RefID}\\Attachments\\${this.state.selectedFiles.name}`;
    const title = this.state.selectedFiles.name;
    const size = this.state.selectedFiles.size;
    const obj = {"Title":title,"Path":path,"FileSize":size};
    const uploadedFiles = [...this.state.uploadedFiles];
    uploadedFiles.push(obj);
    this.setState({uploadedFiles:uploadedFiles}, this.UpdateStateInForm)
    
}

FileUploadHanler(){
 ReactDOM.findDOMNode(this.refs.form).disabled = true;
 const fileData = {"Filebase":this.state.selectedFiles.base64,
                   "Title": this.state.selectedFiles.name,
                   "RefID":this.state.RefID,
                   "ApplicationName":"POApprovalApp",
                   "AttachmentType":"attachment",
                   "uploadStatus":"draft"
                  };
this.setState({uploading:true})                 
 UploadAttachment(fileData)
 .then(r => this.setState({uploading:false,selected:false},this.handleAttachmentTable)
 )
 ReactDOM.findDOMNode(this.refs.form).value = "";
}

UpdateStateInForm = ()=>{
 this.props.handleFileCommit(this.state.RefID);
 ReactDOM.findDOMNode(this.refs.form).disabled = false;
}

deleteAttachment = (deletedItem)=>{
 //console.log("delete event",deletedItem);
 this.setState({deleting:true})
 DeleteAttachment(this.state.RefID, deletedItem.Title, deletedItem.Path)
 .then(this.setState({deleting:false},this.UpdateAttachmentDetailsInView) )
}

 render() {
  console.log("Delete State", this.state)
  console.log("File Reference", this.state.RefID)
  console.log("Uploaded Files",this.state.uploadedFiles);
  console.log("FileUpload Property Passed", this.props);

 

  let attachmentTable;
  let attachmentControl
  let uploadButton;
  if (this.state.uploadedFiles.length > 0){
   attachmentTable= this.state.uploadedFiles.map((item,index) =>
        <tr key={index}>
        <td><a className="attachment-link" rel="noopener noreferrer" 
        href={`https://po-webapi.alrashidabetong.com/api/Attachment/Getfile?title=${item.Title}&path=${item.Path}`} target="_blank">{item.Title}</a></td>
        <td>{item.FileSize}</td>
       {(this.props.mode === 'new') ?  <td className="attachment-delete">
        {(!this.state.deleting) ?<Button type="button" 
        onClick={() => this.deleteAttachment(item)} className="btn btn-danger attach-del-btn">Delete</Button>
        : <FontAwesomeIcon icon={faSpinner}></FontAwesomeIcon>}
        </td>:<td></td>}
      </tr>
       );
  }else{
   attachmentTable = <tr className="text-center"><td colSpan="3">No Attachment Added</td></tr>
  }

  if(this.state.uploading){
   uploadButton = <div><FontAwesomeIcon icon={faSpinner} className="mt-4 mr-4  file-upload-btn"/>
   File Uploading</div>
  }else{
   uploadButton = <Button className="Primary file-upload-btn" type="button" 
   onClick={this.FileUploadHanler.bind(this)} disabled={!this.state.selected}>Upload</Button>
  }

  if(this.props.mode === 'new'){
   attachmentControl =    <Row>
   <Col md={12}><label className="AttachmentLabel">Upload Supporting Documents </label></Col>
    <Col md={6}>
         <div className="files color">                
               {/* <Input type="file" className="form-control" multiple="false" onChange={this.onChangeHandler}/>                 */}
               <FileBase64 ref="form" className="form-control" multiple={ false }
                onDone={this.getFiles.bind(this) } />
         </div>
    </Col>

    <Col md={2} > 
       {uploadButton}
    </Col>
    
  </Row>
  }
  return (
   <>

    {attachmentControl}
   <Row>
    <Col md={6}>
    <Table striped className="mt-2">
      <thead>
        <tr>
          <th>Attachment Name</th>
          <th>Size</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {attachmentTable}
      </tbody>
   </Table>
    </Col>
   </Row>
   </>
  );
 }
}



export default FileUpload;