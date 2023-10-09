import React, { useState , useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft,faUser,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../../alrashid-logo.png'
import GetCurrentUser from '../../Services/SharePoint/GetCurrentLoginUser'

export default props => {
  const [isOpen, setOpen] = useState(false)
  const [CurrentUser, setCurrentLoginUser] = useState("")
  // const [isNotificationOpen, setNotificationOpen] = useState(false)
  const toggle = () => setOpen(!isOpen)
  // const toggleNotification = () => {
  //  alert();
  //  setNotificationOpen(!isNotificationOpen)
  // }
  useEffect(() => {
    GetCurrentUser()
    .then(d =>setCurrentLoginUser(`Welcome, ${d.Title}`))
  },[]);

    const welcomeStyle = {fontWeight:'500'}
    const BellNotificationStyle = {color:"rgb(35,86,151)",fontSize:"22px",marginTop:"-4px"}
  return (
   <>
    <Navbar color="light" light className="navbar shadow-lg p-3 mb-3 bg-white rounded" expand="md">
      <Button color="secondary"className="btn-toggle-nav" onClick={props.toggle}>
        <FontAwesomeIcon icon={faAlignLeft}/>
      </Button>
      <NavbarToggler className="nav-toggler" onClick={toggle} />
      <img className="logo" src="https://alrashidabetong.sharepoint.com/sites/apps/PMO/SiteAssets/PO_App/alrashid-logo.b498335f.png" alt="AL RASHID ABETONG LOGO"></img>
      <Collapse isOpen={isOpen} navbar>
      
        <Nav className="ml-auto" navbar>        
        <NavItem>
            <NavLink style={BellNotificationStyle} >
           {/* <NotificationFeed></NotificationFeed>          */}
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink tag={Link} to={'/'}>
            <FontAwesomeIcon icon={faHome} className="mr-2"/>
              Home</NavLink>
          </NavItem> */}
          
          <NavItem>
          <NavLink style={welcomeStyle}>
          <FontAwesomeIcon icon={faUser} className="mr-2"/>
            {CurrentUser}</NavLink>
          </NavItem>
          <NavItem>
          <NavLink style={welcomeStyle} href="https://alrashidabetong.sharepoint.com/sites/apps/PMO/_layouts/15/SignOut.aspx">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2"/>Sign Out
          </NavLink>
          </NavItem>
      </Nav>
      </Collapse>
    </Navbar>

       
    </>
  );
}



