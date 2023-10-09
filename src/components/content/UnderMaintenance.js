import React, { Component } from 'react'
import { Row, Col, Card, FormGroup, Input, Label } from 'reactstrap';


export default class UnderMaintenance extends Component {

    constructor(props, contex) {
        super(props, contex);
    }
    componentDidMount() {
        
    }


    render() {
        const tableContainer = {width:"100%"};
        const headerStyle = {display:"flex"};
        const parentcontainer = {minWidth:"100%",maxWidth:"100%"};
        return (


            <div style={parentcontainer}>    
                <Card style={tableContainer} className="mb-3">
                <Row>
                        <Col style={headerStyle} className="form-header-container" md={12}>
                         
                            <h5 id="maint" className="form-header">This page is under maintenance, Will publish it soon!</h5>
                        </Col>
                </Row>
                </Card>
                </div>
            
        )
    }
}       