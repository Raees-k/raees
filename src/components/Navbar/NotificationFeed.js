import React, { Component } from 'react'
import { NavLink } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../Navbar/NotificationFeed.css'

export default class NotificationFeed extends Component {
 constructor(props) {
  super(props);
  this.state = {
   isNotificationOpen:false,
  };
}

toggleNotification =() =>{
 const currentOpen =this.state.isNotificationOpen
  this.setState({isNotificationOpen:!currentOpen})
}

 render() {
  const imgStyle = {width:"50%"};
  return (
   <div className="notification-wrapper">
   <div className="notification_wrap">
   <div class="notification_icon" onClick={this.toggleNotification.bind(this)}>
   <FontAwesomeIcon icon={faBell} className="mr-2"/><span className="task-count">12</span>
		</div>
  {this.state.isNotificationOpen ?
    <div className="dropdown-wrapper">
    <div className="dropdown" >
     <div className="notify_item">
      <div className="notify_img">
       <img src="images/not_1.png" alt="profile_pic" style={imgStyle}/>
      </div>
      <div className="notify_info">
       <p>Alex commented on<span>Timeline Share</span></p>
       <span className="notify_time">10 minutes ago</span>
      </div>
     </div>
     <div className="notify_item">
      <div className="notify_img">
       <img src="images/not_2.png" alt="profile_pic" style={imgStyle}/>
      </div>
      <div className="notify_info">
       <p>Ben hur commented on your<span>Timeline Share</span></p>
       <span className="notify_time">55 minutes ago</span>
      </div>
     </div>
     <div className="notify_item">
      <div className="notify_img">
       <img src="images/not_3.png" alt="profile_pic" style={imgStyle}/>
      </div>
      <div className="notify_info">
       <p>Meryn trant liked your<span>Cover Picture</span></p>
       <span className="notify_time">2 hours ago</span>
      </div>
     </div>
     </div></div>:null}
    </div>
   </div>
  
  )
 }
}
