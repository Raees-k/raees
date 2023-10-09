import React, { Component } from 'react'
import { Row,Col,Card, FormGroup,Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import TaskTable from './MyTasksTable'
import GetTaskListitem from '../../Services/SharePoint/GetListItems'
import GetTasks from '../../Services/SharePoint/GetTaskListitem'
import GetCompletedTask from '../../Services/SharePoint/GetCompletedTask'
import GetCurrentUserid from '../../Services/SharePoint/GetCurrentLoinUserID'
import GetCurrentUser from '../../Services/SharePoint/GetCurrentLoginUser'
import './NewRequest.css'
export default class MyTasks extends Component {
    constructor(props, contex) {
        super(props, contex);
        this.state = {
            loaded:false,
            TaskDetails: null,
            PONumber:"",
            CurrentUserID:"1",
            CurrentStatus:"All",
            DataValue: "True",
            DepartmentFilter:"All",
        };
        
    }

    componentDidMount() {
     this.GetTaskDetails();
     //this.intervalID = setInterval(this.GetTaskDetails, 1000);
    // setInterval(this.GetTaskDetails, 100000);
    }
    
    GetTaskDetails = ()=>{

        GetCurrentUserid().then(u => 
            this.setState({
            CurrentUserID:u,
           // CurrentStatus: document.getElementById('exampleSelect').value    
            })
        );

        GetTasks('Workflow Tasks',this.state.CurrentUserID).then(r => 
           
            this.setState({
                TaskDetails:r,
                CurrentStatus:"In Progress",
             })  ,
             
             
        )
        
        
     
    }
    
    

    async filterItems(requestData) {
        
        let result = [];
        for(let item of this.state.TaskDetails) {
          if(item.PONumber.indexOf(requestData.PONumber) > -1) {
            result.push(item);
          }
        }
        return Promise.resolve(result);
      }

    handleSearchInput = (event)=>{
        this.setState({PONumber: event.target.value});
    }

    searchData =() => {
        this.filterItems({ PONumber: this.state.PONumber}).then(items => {
            this.setState({
                TaskDetails: items,
                CurrentStatus:"",
            });
        });
    }

    resetSearch = (event)=>{
        this.setState({
            CurrentStatus: document.getElementById('exampleSelect').value
        })  
        this.GetTaskDetails();
        //alert(this.state.CurrentStatus  )
    }
    

    filterStatus = (event)=>{
        this.setState({
            CurrentStatus:document.getElementById('exampleSelect').value,
            loaded:false,
            TaskDetails: null,
            PONumber:"",
            
           
        })  
    }
    

    render() {
        //console.log("Task Details in grid", this.state.TaskDetails);
        //console.log("Currnet User in state", this.state.CurrentUserID);
        //console.log("Currnet Status", this.state.CurrentStatus);
        //console.log(this.state.CurrentUserID)
        const tableContainer = {width:"100%"};
        const headerStyle = {display:"flex"};
        const parentcontainer = {minWidth:"100%",maxWidth:"100%"};
        let TaskDetails = this.state.TaskDetails;
        
        
        if(this.state.CurrentStatus === "In Progress"){
            GetTasks('Workflow Tasks',this.state.CurrentUserID).then(r => 
                this.setState({
                    TaskDetails:r.filter(item => item.AssignedToId === this.state.CurrentUserID),
                    CurrentStatus:"",
                 })    
            )
         }
         if(this.state.CurrentStatus === "Completed"){
          //  clearInterval(this.intervalID);
            GetCompletedTask('Workflow Tasks',this.state.CurrentUserID).then(r => 
                this.setState({
                    TaskDetails:r.filter(item => item.AssignedToId === this.state.CurrentUserID ),
                    CurrentStatus:"",
                 })    
            )
         }
         
       
        return (
            
        <div style={parentcontainer}>    
            <Card style={tableContainer} className="mb-3">
                <Row>
                        <Col style={headerStyle} className="form-header-container" md={12}>
                            <FontAwesomeIcon icon={faSearch} className="mr-2"/>
                            <h5 className="form-header">Filter My Tasks</h5>
                        </Col>
                </Row>
                <form className="form-horizontal">
                            <FormGroup row>
                            <div className="col-md-4">
                                <Label for="exampleSelect" className="mt-2">Filter by Status</Label>                                  
                                <Input type="select" name="select" id="exampleSelect" 
                                onChange={this.filterStatus}>
                                        
                                        <option>In Progress</option>
                                        <option value="Completed">Tasks completed recently</option>
                                </Input>
                            </div> 
                                 
                            <div className="col-md-4">
                                    <Label for="exampleSelect" className="mt-2">Search PO</Label>                                    
                                    <div className="input-group-append">
                                    <Input type="text" placeholder="Enter PO Number" value={this.state.PONumber} onChange={this.handleSearchInput}/>
                                        <button className="btn btn-sm btn-success mr-2 ml-2 btn-cancel" onClick={this.searchData} type="button">Search</button>
                                        <button className="btn btn-sm btn-danger" onClick={this.resetSearch} type="button">Reset</button>
                                    </div>
                            </div>                               
                            </FormGroup>
                        </form>     
                </Card>
                
            <TaskTable TaskDetails={TaskDetails}></TaskTable>
                
        </div>
        )
    }
}
