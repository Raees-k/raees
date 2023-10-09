import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { NavItem, NavLink, Nav } from 'reactstrap';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import React, { Component } from 'react'
import GetTasks from '../../Services/SharePoint/GetTaskListitem'
import GetCompletedTask from '../../Services/SharePoint/GetCompletedTask'
import GetCurrentUserid from '../../Services/SharePoint/GetCurrentLoinUserID'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';  
import './sidebar.css';

let Count;
export default class SideBar extends Component {
  constructor(props) {
  super(props)
  this.state = {
    load:false
  }
}
  componentDidMount() {
    
  }
  
render() {

    return (
  <div id="ToggleNav" className={classNames('sidebar', {'is-open': this.props.isOpen})}>
        <div className="sidebar-header">
          <span color="info" onClick={this.props.toggle} style={{color: '#fff'}}>&times;</span>
          <h5>Purchase Order App</h5>
        </div>
        <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
            {/* <p>PO Application</p> */}
            
            <NavItem>
              <NavLink tag={Link} to={'/po-search'} >
                <FontAwesomeIcon icon={faListUl} className="mr-2"/>New Request
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={'/pages/my-requests'}>
                <FontAwesomeIcon icon={faListUl} className="mr-2"/>PO Requests
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={'/pages/ArchivedPO'}>
                <FontAwesomeIcon icon={faListUl} className="mr-2"/>Archived PO
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={'/pages/my-tasks'}>
                <FontAwesomeIcon icon={faListUl} className="mr-2"/>Pending Tasks
              </NavLink>
            </NavItem>
            
            
            <NavItem>
              <NavLink tag={Link} to={'/pages/Dashboard'}>
                <FontAwesomeIcon icon={faListUl} className="mr-2"/>Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to={'/pages/ExportPO'}>
                <FontAwesomeIcon icon={faListUl} className="mr-2"/>Export PO
              </NavLink>
            </NavItem>
          </Nav>        
        </div>
      </div>
    )
  }
}
