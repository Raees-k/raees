import React, { Component } from 'react'
import { Row,Col,Card, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBars, faBorderNone } from '@fortawesome/free-solid-svg-icons';
import ReactDataGrid from 'react-data-grid';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';


export default class MyTasksTable extends Component {
    constructor(props, contex) {
        super(props, contex);
        this.initColumnDefs();
    }

    formatDate(data) {
        return <Moment format="DD-MM-YYYY  hh:mm">
                {data}
            </Moment>;
      }
     

    itemViewFormatter =(props) => {
        return <a className="table-anchor" target="_self"  rel="noopener noreferrer" href={`/sites/apps/PMO/Lists/ttt%20Tasks/EditForm.aspx?ID=${props.dependentValues.Id}`}>{props.value}</a>    
    };
    GrandTotalFormatter = (props)=>{
        if(props.dependentValues.Currency === null){
            return <NumberFormat style={{textAlign: 'right'}} value={props.value || 0} displayType={'text'} thousandSeparator={true} prefix={"SAR"}/>
    
        }
        else{
        return <NumberFormat style={{textAlign: 'right'}} value={props.value || 0} displayType={'text'} thousandSeparator={true} prefix={`${props.dependentValues.Currency} `}/>
    
    }}
    DateFormatter = props => (
        <div className="text-center py-2">
            <span>{this.formatDate(props.value)}</span>
        </div>
    )
    CheckPriority = (props)=>{
        if(props.value === "High"){
        return (<div style={{background: 'rgba(220, 53, 69,0.7)', color: 'white',fontWeight:'bold',textAlign:'center'}}>{props.value}</div>)
    }
    else{
        return (<div>{props.value}</div>)
    }
}
    

    initColumnDefs = () => {
        this._columns = [
            {
                key: 'Id',
                name: 'Task ID',
                width:'5%'
            },
            {
                key: 'PONumber',
                name: 'PO Number',
                width:'10%',
                formatter: this.itemViewFormatter,
                getRowMetaData: (row) => row
            },
            {
                key: 'InitiatorName',
                name: 'Initiator Name',
                width:'15%'
            },
            {
                key: 'Department',
                name: 'Department',
                width:'15%'
            },   
            {
                key: 'Created',
                name: 'Assigned Date',
                width:'15%',
                formatter: this.DateFormatter    
            },
            {
                key: 'DueDate',
                name: 'Due Date',
                width:'15%',
                formatter: this.DateFormatter    
            },
            {
                key: 'GrandTotal',
                name: 'Grand Total',
                width:'10%',
                formatter: this.GrandTotalFormatter,
                getRowMetaData: (row) => row
            },
            {
                key: 'Status',
                name: 'Status',
                width:'15%'
            },
            {
                key: 'ReviwalStatus',
                name: 'Reviewal Status',
                width:'15%'
            },
            {
                key: 'RespondedDate',
                name: 'RespondedDate',
                width:'15%'
            },
            {
                key: 'POPriority',
                name: 'Priority',
                width:'15%',
                formatter: this.CheckPriority,
                getRowMetaData: (row) => row,
                
            }            
            
        ];
    };
    
    rowGetter = (i) => {
        
        return this.props.TaskDetails[i];
    }
    
      

    render() {
        
        const tableContainer = {width:"100%"};
        const headerStyle = {display:"flex"};
        let TaskDetailsTable;
        if (this.props.TaskDetails) {
            TaskDetailsTable =<ReactDataGrid
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.props.TaskDetails.length} 
             minHeight={1000} 
             isScrolling={false}
             sortColumn={true}
            />
        }else{
            TaskDetailsTable = <div className="text-center">
                <Spinner className="mr-3" animation="border" variant="secondary" />
                <span>Loading Task Details ...</span>
                </div> ;
        }
        return (
            <>
                <Card style={tableContainer}>
                    <Row>
                        <Col style={headerStyle} className="form-header-container" md={12}>
                            <FontAwesomeIcon icon={faBars} className="mr-2"/>
                            <h5 className="form-header">My Completed Tasks</h5>
                        </Col>
                        <Col md={12}>                                            
                            {TaskDetailsTable}
                        </Col>
                    </Row>                 
                </Card>   
            </>
        )
    }
}
