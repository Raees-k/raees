import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Row,Col,Card, Spinner } from 'reactstrap'
import ReactDataGrid from 'react-data-grid'
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faBars,faFilePdf } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format'
import ReactExport from "react-data-export";
import { Button } from 'reactstrap';



const pdftdStyle = {color:"red",marginLeft:"40%",fontSize:"20px"}
const GTStyle = {padding: "10%"}

export default class MyRequestTable extends Component {
    constructor(props, contex) {
        super(props, contex);
        this.initColumnDefs();
        
    }

    formatDate(data) {
        return <Moment format="MM/DD/YYYY hh:mm">
                {data}
            </Moment>;
      }

    itemViewFormatter =(props) => {
        this.test()
        return <Link className="table-anchor" to={`/po-request/view/${props.dependentValues.Id}`}>POTN{props.value}</Link>    
    };
    test = ()=>{
        console.log("Testing")
    }
     itemPDFViewFormatter =(props) =>{
         let poPDFUrl = "";
         if(props.value === "Approved"){
          poPDFUrl= <a  style={pdftdStyle} target="_blank" rel="noopener noreferrer"
          href={`https://alrashidabetong.sharepoint.com/sites/apps/PMO/GeneratedPurchaseOrders/${props.dependentValues.chff}-${props.dependentValues.POVersion}.pdf`}>
            <FontAwesomeIcon icon={faFilePdf} className="mr-2"/>
           </a>    
         }
         return poPDFUrl;
     }
     SOitemPDFViewFormatter =(props) =>{
        let poPDFUrl = "";
        if(props.value === "Approved"){
         poPDFUrl= <a  style={pdftdStyle} target="_blank" rel="noopener noreferrer"
         href={`https://alrashidabetong.sharepoint.com/sites/apps/PMO/SupplierPOReport/${props.dependentValues.chff}-${props.dependentValues.POVersion}.pdf`}>
           <FontAwesomeIcon icon={faFilePdf} className="mr-2"/>
          </a>    
        }
        return poPDFUrl;
    }
    GetNextPagePO(){
        return(
            console.log('100')
        )
     
    }
    DateFormatter = props => (
        <div className="text-center py-2">
            <span>{this.formatDate(props.value)}</span>
        </div>
    )
    
    GrandTotalFormatter = (props)=>{
        return <NumberFormat style={GTStyle} value={props.value || 0} displayType={'text'} thousandSeparator={true} prefix={`${JSON.parse(props.dependentValues.POJSONData).Currency} `}/>
    }

    initColumnDefs = () => {
        this._columns = [
            {
                key: 'Id',
                name: 'Ticket Number',
                formatter: this.itemViewFormatter,
                getRowMetaData: (row) => row,
                width:'5%',
                Id: this.props.value
            },
            {
                key: 'chff',
                name: 'PO Number',
                width:'5%'
            },
            {
                key: 'j3xm',
                name: 'PO Maker',
                width:'5%'

            },
            {
                key: 'ozud',
                name: 'Department',
                width:'5%'
            },
            {
                key: 'yyrh',
                name: 'Grand Total',
                width:'10%',
                textAlign:'right !important',
                formatter: this.GrandTotalFormatter,
                getRowMetaData: (row) => row,
                
            },
            {
                key: 'Created',
                name: 'Requested Date',
                width:'5%',
                formatter: this.DateFormatter,
                
            },
            {
                key: 'RequestStatus',
                name: 'Request Status',
                width:'25%'  
            },
            {
                key: 'ApprovalStatus',
                name: 'Approval Status',
                width:'25%'
            },
            {
                key: 'RespondedDate',
                name: 'Responded Date',
                width:'25%'  
            },
            {
                key: 'PendingWith',
                name: 'Pending With',
                width:'25%'  
            },
            {
             key: 'POStatus',
             name: 'IPOC',
             formatter: this.itemPDFViewFormatter,
             width:'1%'  ,
             getRowMetaData: (row) => row
         },
         {
            key: 'POStatus',
            name: 'SPOC',
            formatter: this.SOitemPDFViewFormatter,
            width:'1%'  ,
            getRowMetaData: (row) => row
        }              
        ];
    };
   
    rowGetter = (i) => {
        return this.props.PODetails[i];
    }


    render() {
        
        const tableContainer = {width:"100%"};
        const headerStyle = {display:"flex"};
        let PODetailsTable;
        let JsonData;
        
        if (this.props.PODetails) {
            console.log(JsonData)
            PODetailsTable = <ReactDataGrid
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this.props.PODetails.length} 
             minHeight={1000} 
             isScrolling={false}
             sortColumn={true}
             width={100}
             
            />
        }else{
            PODetailsTable = <div className="text-center">
                <Spinner className="mr-3" animation="border" variant="secondary" />
                <span>Loading PO Details ...</span>
                </div> ;
        }

        return (
                <Card style={tableContainer}>
                    <Row>
                        <Col style={headerStyle} className="form-header-container" md={12}>
                            <FontAwesomeIcon icon={faBars} className="mr-2"/>
                            <h5 className="form-header">Purchase Order Requests</h5>
                           
                        </Col>
                       
                        
                        <Col md={12}>                                            
                            {PODetailsTable}
                        </Col>
                    </Row>

                    
                </Card>
        )
    }
}
