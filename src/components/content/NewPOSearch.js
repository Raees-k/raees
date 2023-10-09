import React, { Component } from 'react'
import { Col,Card, Form, FormGroup, Input, Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './NewRequest.css'
import swal from 'sweetalert'
import swal1 from '@sweetalert/with-react';
import Moment from 'react-moment'
import  { Redirect } from 'react-router-dom' 
import GetPODetailsbyNumber from '../../Services/GetPODetails/GetPODetailsbyNumber'
import GetListItemByPONumber from '../../Services/SharePoint/GetListItemByPONumber'
import SendOTP from '../../Services/GetPODetails/SendOTP'

const POTablePopup = {fontSize:"12px"}

export default class NewPOSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput:null,
            searchInputValid:true,
            POLoading:false,
            POLoaded:false,
            OTPValid:false,
            PODetails:{},
            RejectedItems:{}         
        }       
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    }

    SearchPO =()=>{
        if(this.validateSearchInput()){
            this.setState({
                POLoading:true
            },this.validateExistingPO(this.state.searchInput))

        }        
    }

    validateExistingPO = (POInput) =>{
     GetListItemByPONumber("PMO",POInput)
     .then(d =>{
      
      
        if(d.length > 0){
             let InProgressPO = [];
             let ApprovedPO = [];
             let RejectedPO = [];
             for(let item of d) {
               if (item.POStatus !== null){
                 if(item.POStatus.indexOf("InProgress") > -1) {
                    InProgressPO.push(item);
                 }
                 if(item.POStatus.indexOf("Approved") > -1){
                    ApprovedPO.push(item)
                 }
                 if(item.POStatus.indexOf("Rejected") > -1){
                  RejectedPO.push(item);
               }
               }
             }             
             if(InProgressPO.length > 0){
              const InprogressBody = InProgressPO.map((item,index) =>
               <tr key={index}>
                  <td>{item.vwno}</td>
                  <td>{item.chff}</td>
                  <td>{item.POVersion}</td>
                  <td>{item.POStatus}</td>
                  <td><Moment format="DD-MM-YY hh:mm">{item.Created}</Moment></td>
              </tr>
              )
              const InprogressTable = <Table striped size="sm" responsive style={POTablePopup}>
               <thead>
                <tr>
                 <th>Ticket Number</th>
                 <th>PO Number</th>
                 <th>Revision</th>
                 <th>Request Status</th>
                 <th>Created Date</th>
                 </tr>
               </thead>
               <tbody>
                  {InprogressBody}
               </tbody>
              </Table>
              swal1({
               text: "Below PO Requests are already in Progress. You cannot Submit another request Now",
               buttons: {
                 Ok:{
                  text:"Ok",
                  value:"Ok"
                 }
               },
               content: (
                 <div>
                   {InprogressTable}
                 </div>
               )
             }).then((value)=>{
                 if (value === "Ok"){
                   this.setState({                    
                      POLoading:false                   
                   })
                 }
             })
             }
             if(RejectedPO.length > 0){
              const ApprovedTableBody = ApprovedPO.map((item,index) =>
              <tr key={index}>
                 <td>{item.vwno}</td>
                 <td>{item.chff}</td>
                 <td>{item.POVersion}</td>
                 <td>{item.POStatus}</td>
                 <td><Moment format="DD-MM-YY hh:mm">{item.Created}</Moment></td>
                 
             </tr>
             
             )
             
             swal1({
              text: "Request has been rejected before, Do you want to continue?",
              buttons: {
                Yes: {
                 text:"Yes",
                 value:"Yes"
                },No:{
                 text:"No",
                 value:"No"
                } 
              },
             
            })
            .then((value) => {
             switch (value) {       
               case "Yes":
                 GetPODetailsbyNumber(this.state.searchInput)
                 .then(PODetails => 
                     this.loadPODetails(PODetails)
                 )
                 .catch(err=>
                  console.error("API Error",err)
                 )
                 
                 break;        
               case "No":
                 this.setState({                    
                  POLoading:false                   
                 })
                 break;
               default:
                 swal("Something is wrong!!");
             }
            })
               
             }
             if(ApprovedPO.length > 0 && InProgressPO.length < 1){
              
              const ApprovedTableBody = ApprovedPO.map((item,index) =>
              <tr key={index}>
                 <td>{item.vwno}</td>
                 <td>{item.chff}</td>
                 <td>{item.POVersion}</td>
                 <td>{item.POStatus}</td>
                 <td><Moment format="DD-MM-YY hh:mm">{item.Created}</Moment></td>
             </tr>
             )
             const ApprovedTable = <Table striped size="sm" responsive style={POTablePopup}>
              <thead>
               <tr>
                <th>Ticket Number</th>
                <th>PO Number</th>
                <th>Revision</th>
                <th>Request Status</th>
                <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                 {ApprovedTableBody}
              </tbody>
             </Table>
             swal1({
              text: "Below PO Requests are already Approved. Do you want to re-process?",
              buttons: {
                Yes: {
                 text:"Yes",
                 value:"Yes"
                },No:{
                 text:"No",
                 value:"No"
                } 
              },
              content: (
                <div>
                  {ApprovedTable}
                </div>
              )
            })
            .then((value) => {
             switch (value) {       
               case "Yes":
                 GetPODetailsbyNumber(this.state.searchInput)
                 .then(PODetails => 
                     this.loadPODetails(PODetails)
                 )
                 break;        
               case "No":
                 this.setState({                    
                  POLoading:false                   
                 })
                 break;
               default:
                 swal("Something is wrong!!");
             }
          })

         }

         //console.log("IN Progress", InProgressPO)
         //console.log("Approved", ApprovedPO)
        } else {
             GetPODetailsbyNumber(this.state.searchInput)
             .then(PODetails => 
                 this.loadPODetails(PODetails)
             )
        }
     })

    }
    
    loadPODetails = async (PODetails) => {
        if(PODetails.PONumber == null){
            swal("There is no record with this PO Number");
            this.setState({                    
                POLoading:false                   
            }) 
        }else {
            this.setState({
                PODetails:PODetails,
                POLoading:false                                
            }, this.OTPValidate)
        }
    }

    validateSearchInput(){
        let IsValid = true;
        if ( this.state.searchInput === null) {  
            IsValid = false;
            swal("Search Input is empty");             
        }
        return IsValid;
    }
   
    OTPValidate(){
        const OTP = Math.floor(100000 + Math.random() * 900000);
            console.log(OTP,this.state ); 
            SendOTP(this.state.PODetails.MakerEmail,this.state.PODetails.PONumber,OTP);
            localStorage.setItem('OTP',OTP);
            var swalField = document.createElement('input');
            swalField.setAttribute("placeholder", "6 Digit Code");
            swalField.setAttribute("ID", "OTP");
            swal( {
               title:"Enter OTP",
               text:"Enter the OTP sent to your email:",

               icon:"info",
               buttons:{
                ResendOTP:{
                  
                },
                 Confirm:{
                   Text:"Confirm",
                 }
              },
              content: swalField,
         })
             
             .then((value) => {
              let reason = swalField.value;
              console.log(reason);
              switch (value) {  
              case "Confirm":
               if (reason === "" || reason !== localStorage.getItem('OTP')){               
                   swal("You have entered invalid or empty OTP");
               }else if(reason === localStorage.getItem('OTP')){
                swal("You are sucessfully validated")  
                .then(this.setState({
                        OTPValid: true,
                        POLoading:false,
                        POLoaded:true 
                     }))                   
               }
               break;
               case "ResendOTP":
                localStorage.removeItem('OTP');
                this.OTPValidate()
                break;
              }
               
             });
             
             
            
    }
    

    
    handleSearchInputChange(event) {
         const target = event.target;
         const value = target.value;
         const name = target.name;    
         this.setState({[name]:value})
    }
    

    render() {
        const {POLoading} = this.state;
        const parentcontainer = {width:"100%"};
        let POSearch = null;
        if (this.state.POLoaded === false)
        POSearch = <Card className="">
        <Form>
                <FormGroup row className="form-header-container"> 
                    <FontAwesomeIcon icon={faSearch} className="mr-2"/>
                    <h5 className="form-header">Search by PO Number</h5>
                </FormGroup>
                <FormGroup row>
                    <Col className="search-input-col text-center">
                        
                        <Input type="number" name="searchInput" className="POSearchInput" placeholder="Enter PO Number to search" onChange={this.handleSearchInputChange}/> 
                        {/* <FontAwesomeIcon icon={faSearch} className="mr-2"/> */}
                        <Button type="button" color="success" className="btn-po-search mt-2" onClick={this.SearchPO} disabled={POLoading}>
                        {POLoading ? <FontAwesomeIcon icon={faSpinner} className="mr-2"/> : null}    
                        Search
                        </Button>                                                     
                    </Col>
                </FormGroup>                        
        </Form>
      </Card>;
        console.log("PO Detals in state is", this.state);
        return (
            <div style={parentcontainer}>
                {POSearch}
                {/* {this.state.POLoaded ? <NewRequest mode={this.props.match.params.mode} podetails={this.state.PODetails}/> :null} */}
                
                {this.state.POLoaded ?<Redirect to={
                    {pathname: "/po-request/new",
                    state: {podetails:this.state.PODetails}
                    }}/>:null}
            </div>
        )
    }
}
