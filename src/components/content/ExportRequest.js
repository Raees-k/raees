import React from 'react';
import MaterialTable from 'material-table';
import GetPOItems from '../../Services/SharePoint/GetListItems'
import { Component } from 'react';
import moment from 'react-moment';
import { Row,Col,Card,Spinner, FormGroup,Input,Label } from 'reactstrap';
import './NewRequest.css';
import { forwardRef } from 'react';
import GetPOData from '../../Services/SharePoint/GetPOData'
import GetPODataInBetween from '../../Services/SharePoint/GetPOInBetween'
import FilterComponent from './ExportDateFilter'
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format'
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import swal from 'sweetalert';
let Jdata;
let results;
let PODetails;
let fromDate;
let TODate;
let Table;
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
    
  
export default class ExportPORequest extends Component{
    constructor(props, contex) {
        super(props, contex);    
        this.state = {
            loaded:false,
            PODetails: [],

          }
    }
    GrandTotalFormatter = (props)=>{
      return <NumberFormat style={{textAlign: 'right'}} value={props.value || 0} displayType={'text'} thousandSeparator={true} prefix={`${JSON.parse(PODetails.dependentValues.POJSONData).Currency} `}/>
  }
   
    componentDidMount() {
      this.getdata()
      } 
      PeriodData = ()=> {
        console.log (this.state.fromDate);
        console.log (this.state.TODate);
        if(this.state.fromDate === undefined ){
          swal("Provide From Date");
        }
        else if(this.state.TODate === undefined){
          swal("Provide To Date");
        }
        else{
        GetPODataInBetween('PMO',this.state.fromDate,this.state.TODate).then(r =>
          this.setState({
            PODetails:r
        })
        )
        
      }
      
      }  
      getdata = ()=>{
        GetPOData('PMO').then(r =>
          this.setState({
            PODetails:r
        })
        )
      }
      
    render() {  
      const tableContainer = {width:"100%"};
      const headerStyle = {display:"flex"};
      const parentcontainer = {minWidth:"100%",maxWidth:"100%"};
      const JsonData = [this.state.PODetails]
      console.log(this.state.PODetails)
        let Table = <MaterialTable
        icons={tableIcons}
        title=""
      
      columns={[
        { title: 'Ticket Number', field: 'TicketNumber' },
        { title: 'PO Number', field: 'PONumber' },
        { title: 'PO Maker', field: 'POMaker' },
        { title: 'Department', field: 'Department' },
        { title: 'Grand Total', field: 'GrandTotal',formatter:this.GrandTotalFormatter },
        { title: 'Requested Date', field: 'RequestedDate', filterComponent: FilterComponent },      
        { title: 'Request Status', field: 'RequestStatus' },
        { title: 'Approval Status', field: 'ApprovalStatus' },
        { title: 'Pending with', field: 'PendingWith' },
        { title: 'Responded Date', field: 'RespondedDate', }
      ]}
      data={this.state.PODetails}   
      options={{
        exportButton: true,
        pageSize: 50,
        isLoading: true,
        exportAllData: true,
      }}
      />
    
    
     
  
return (
 
 <div style={parentcontainer}>
    <Card style={tableContainer}>
                    <Row>
                    <p id="Expo">Export PO with in dates</p>
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
                        <button ref="Btn" className="btn btn-sm btn-success mr-2 ml-2 btn-cancel" onClick={this.PeriodData} type="button">Search</button>
                        <button className="btn btn-sm btn-danger" onClick={this.getdata} type="button">Reset</button>
                        </Col>
                    </Row>

                    
                </Card><br></br>
  
   {Table}</div>

)
}
}