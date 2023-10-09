import React from 'react';
import classNames from 'classnames';
import { Container, Row } from 'reactstrap';
import NavBar from '../Navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import NewPOSearch from './NewPOSearch'
import NewRequest from './NewRequest'
import MyRequests from './MyRequests'
import ArchivedPO from './ArchivedPO'
import MyTasks from './MyTasks'
import Home from './Home'
import Dashboard from './Dashboard'
import ExportPORequest from './ExportRequest'
import MyCompletedTasks from './MyCompletedTask'
import UnderMaintenance from './UnderMaintenance'
export default props => (
  
    <Container fluid={true} className={classNames('content', {'is-open': props.isOpen})}>
      <NavBar toggle={props.toggle}/>
      <Row  className="m-1 bg-white">
      <Switch>
      <Route exact path="/"  component={Home} />
        <Route exact path="/po-search"  component={NewPOSearch} />
        <Route exact path="/po-request/:mode"  component={NewRequest} />
        <Route exact path="/po-request/:mode/:id"  component={NewRequest} />
        <Route exact path="/po-request/:mode/:id/:TaskId"  component={NewRequest} />
        <Route exact path="/pages/my-tasks" component={MyTasks}/>
        <Route exact path="/pages/my-completed" component={MyCompletedTasks}/>
        <Route exact path="/pages/my-requests" component={MyRequests} />
        <Route exact path="/pages/ArchivedPO" component={ArchivedPO} />
        <Route exact path="/search-po" component={() => "Search PO" } />
        <Route exact path="/contact" component={() => "Contact" } />
        <Route exact path="/pages/Dashboard" component={Dashboard} />  
        <Route exact path="/pages/ExportPO" component={ExportPORequest} />               
      </Switch>
      </Row>

    </Container>
)
