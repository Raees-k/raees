import React from 'react';
import {Pie, Doughnut} from 'react-chartjs-2';
import PMRequest from '../../Services/SharePoint/PMRequest';
import DMRequest from '../../Services/SharePoint/DMRequestCount';
import AGMRequest from '../../Services/SharePoint/AGMRequestCount';
import PMInBetweenRequest from '../../Services/SharePoint/PMInBetweenRequest';
import AGMCountInBetween from '../../Services/SharePoint/AGMCountInBetween';
import DMInBetweenRequest from '../../Services/SharePoint/DMInBetweenRequest';
import ApprovalInBetween from '../../Services/SharePoint/ApprovalCountInBetween';
import TotalCountInBetween from '../../Services/SharePoint/TotaLCountInBetween';
import RejectedInBetween from '../../Services/SharePoint/RejectedInBetween';
import GMInBetweenRequest from '../../Services/SharePoint/GMInBetweenRequest';
import GMRequest from '../../Services/SharePoint/GMRequestCount';
import ApprovedRequest from '../../Services/SharePoint/ApprovalCount';
import RejectedRequest from '../../Services/SharePoint/RejectedCount';
import TotalRequest from '../../Services/SharePoint/TotalCount';
import {Row, Col,Card, Form, FormGroup, Label, Input, Button,Table,form } from 'reactstrap';
import './NewRequest.css'
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert';

const dateNow = new Date(); // Creating a new date object with the current date and time
const year = dateNow.getFullYear(); // Getting current year from the created Date object
const monthWithOffset = dateNow.getUTCMonth() + 1; // January is 0 by default in JS. Offsetting +1 to fix date for calendar.
const month = // Setting current Month number from current Date object
  monthWithOffset.toString().length < 2 // Checking if month is < 10 and pre-prending 0 to adjust for date input.
    ? `0${monthWithOffset}`
    : monthWithOffset;
const date =
  dateNow.getUTCDate().toString().length < 2 // Checking if date is < 10 and pre-prending 0 if not to adjust for date input.
    ? `0${dateNow.getUTCDate()}`
    : dateNow.getUTCDate();

const materialDateInput = `${year}-${month}-${date}`; 

export default class Dashboard extends React.Component {
    constructor(props, contex) {
        super(props, contex);
        this.state = {
            PMPending:"",
            DMPending:"",
            GMPending:"",
            AGMPending:"",
            Approved:"",
            Rejected:"",
            Total:"",
            RequestDuration:"All",
            fromDate:"",
            TODate:"",
            
        }
    }
    componentDidMount() {
        this.Dash();
        
       }
       Dash = ()=>{
        TotalRequest('PMO').then(r =>
          this.setState({
              Total:r
          })
         );
         PMRequest('PMO').then(r =>
            this.setState({
                PMPending:r
            })
           );
           AGMRequest('PMO').then(r =>
            this.setState({
                AGMPending:r
            })
           );
           DMRequest('PMO').then(r =>
            this.setState({
                DMPending:r, 
            }) 
           );
           GMRequest('PMO').then(r =>
            this.setState({
                GMPending:r,
            }) 
           );
           ApprovedRequest('PMO').then(r =>
            this.setState({
                Approved:r,
            }) 
            );
            RejectedRequest('PMO').then(r =>
              this.setState({
                  Rejected:r,
               
              }) 
              );       
       }
       
    getdata = ()=>{
      TotalRequest('PMO').then(r =>
        this.setState({
            Total:r
        })
        
      )
      ApprovedRequest('PMO').then(r =>
        this.setState({
            Approved:r,
        }) 
        );
        RejectedRequest('PMO').then(r =>
          this.setState({
              Rejected:r,
           
          }) 
          );  
          PMRequest('PMO').then(r =>
            this.setState({
                PMPending:r
            })
           );
           DMRequest('PMO').then(r =>
            this.setState({
                DMPending:r, 
            }) 
           );
           GMRequest('PMO').then(r =>
            this.setState({
                GMPending:r,
            }) 
           );
    }
    PeriodData = ()=> {
      if(this.state.fromDate  === "")
      {
        swal("Please choose From Date")
      }
      else if(this.state.TODate  === "")
      {
        swal("Please choose End Date")
      }
      else{  
      console.log (this.state.fromDate);
      console.log (this.state.TODate);
      ApprovalInBetween('PMO',this.state.fromDate,this.state.TODate).then(r =>
        this.setState({
          Approved:r,
      })
      )
      RejectedInBetween('PMO',this.state.fromDate,this.state.TODate).then(r =>
        this.setState({
          Rejected:r,
        }) 
       );
      TotalCountInBetween('PMO',this.state.fromDate,this.state.TODate).then(r =>
        this.setState({
          Total:r,
        }) 
       )
       PMInBetweenRequest('PMO',this.state.fromDate,this.state.TODate).then(r =>
        this.setState({
          PMPending:r,
        }) 
       );
       DMInBetweenRequest('PMO',this.state.fromDate,this.state.TODate).then(r =>
        this.setState({
          DMPending:r,
        }) 
       );
       GMInBetweenRequest('PMO',this.state.fromDate,this.state.TODate).then(r =>
        this.setState({
          GMPending:r,
        }) 
       );
       AGMCountInBetween('PMO',this.state.fromDate,this.state.TODate).then(r =>
        this.setState({
          AGMPending:r,
        }) 
       );
     
      }
    }  
       
  render() {
    const tableContainer = {width:"100%"};
    const tableContainer2 = {width:"100%"};
    const headerStyle = {display:"flex"};
    const parentcontainer = {minWidth:"100%",maxWidth:"100%"};
    
    
      

    return (
      
        

        <div style={parentcontainer}>    
        <Card style={tableContainer}>
                    <Row>
                    <p id="Expo">Filter PO Status</p>
                        <Col style={headerStyle} className="form-header-container" md={12}>
                        <TextField
                          id="date"
                          type="date"
                          
                          onChange={(event) => {
                            const fromDate01= (event.target.value) + 'T00:00:00.000Z'
                            this.setState({
                              fromDate:fromDate01
                           })
                            
                          }}     
                        />
                        <TextField
                          id="date"
                          type="date"
                         
                          onChange={(event) => {
                            const TODate01 = (event.target.value) + 'T00:00:00.000Z'
                            this.setState({
                              TODate:TODate01
                           })
                          
                          }}  
                        />
                        <button className="btn btn-sm btn-success mr-2 ml-2 btn-cancel" onClick={this.PeriodData} type="button">Search</button>
                        <button className="btn btn-sm btn-danger" onClick={this.getdata} type="button">Reset</button>
                        </Col>
                    </Row>

                    
                </Card><br></br>
        <Card style={tableContainer} className="mb-3"  >
            <div className= "row">
            <div className= "col-md-6 col-sm-6 col-lg-6">
            <div className= "col-md-12 col-sm-12 col-lg-12">
              <p className="DashboardName">Purchase Order Request</p>
            <div className=" col-md-6 col-sm-6 col-lg-6 " id="TotalRequest" >
             <p>Total Request</p>
            <p id="TR"><CountUp start={0} end={this.state.Total} /></p>
            </div>
            </div></div>
            <div className= "col-md-6 col-lg-6 col-sm-6 col-xs-6">
           
            <div style={parentcontainer}>  
        <Doughnut style={parentcontainer}
        
          data={{
            labels: ['Pendng with Purchase Manager', 'Pendng with Department Manager', 'Pendng with General Manager', 'Pendng with Asst.General Manager'],
            datasets: [
              {
                label: 'Request Status',
           backgroundColor: [
             '#B21F00',
             '#C9DE00',
             '#2FDE00',
           ],
           hoverBackgroundColor: [
           '#501800',
           '#4B5000',
           '#175000',
           ], 
          
           data: [this.state.PMPending,this.state.DMPending,this.state.GMPending,this.state.AGMPending]  
              }
            ]
              
          }}
          options={{
            title:{
              display:true,
              text:'',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </div> </div>  </div> 
       </Card> 
       <div className="row">

           <div className="col-md-4">
           <div style={parentcontainer}>    
         <Card style={tableContainer2} className="mb-3" id="DashTabs">
         
                <div className="StatusCoumn">
                    <p className="statusheading">Pending with Purchase Manager</p>
                    <p className="PMItems"><CountUp start={0} end ={this.state.PMPending}/></p>
             
                
                </div>
             </Card>
             </div>
           </div>
           <div className="col-md-4">
           <div style={parentcontainer}>    
         <Card style={tableContainer2} className="mb-3" id="DashTabs">
         
                <div className="StatusCoumn">
                    <p className="statusheading">Pending with Department Manager</p>
                    <p className="PMItems"><CountUp start={0} end ={this.state.DMPending}/></p>
             
                
                </div>
             </Card>
             </div>
           </div>
           <div className="col-md-4">
           <div style={parentcontainer}>    
         <Card style={tableContainer2} className="mb-3" id="DashTabs">
         
                <div className="StatusCoumn">
                    <p className="statusheading">Pending with General Manager</p>
                    <p className="PMItems"><CountUp start={0} end ={this.state.GMPending}/></p>
             
                
                </div>
             </Card>
             </div>
           </div>
       </div>
       <div className="row">

           <div className="col-md-4 ">
           <div style={parentcontainer}>    
         <Card style={tableContainer2} className="mb-3" id="DashTabs">
         
                <div className="StatusCoumn">
                    <p className="statusheading">Pending with Asst General Manager</p>
                    <p className="PMItems"><CountUp start={0} end ={this.state.AGMPending}/></p>
             
                
                </div>
             </Card>
             </div>
           </div>

           <div className="col-md-4 ">
           <div style={parentcontainer}>    
         <Card style={tableContainer2} className="mb-3" id="DashTabs">
         
                <div className="StatusCoumn">
                    <p className="statusheading">Approved PO</p>
                    <p className="PMItems"><CountUp start={0} end ={this.state.Approved}/></p>
             
                
                </div>
             </Card>
             </div>
           </div>

           <div className="col-md-4">
           <div style={parentcontainer}>    
         <Card style={tableContainer2} className="mb-3" id="DashTabs">
         
                <div className="StatusCoumn">
                    <p className="statusheading">Rejected PO</p>
                    <p className="PMItems"><CountUp start={0} end ={this.state.Rejected}/></p>
             
                
                </div>
             </Card>
             </div>
           </div>
           
       </div>
      </div>
         

    
    );
    
  }
}