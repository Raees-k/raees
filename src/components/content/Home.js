import React, { Component } from 'react'
import  { Redirect } from 'react-router-dom' 

export default class Home extends Component {
    
    
    render() {
        
        //localStorage.setItem('POHomeURL',"/po-request/view/68");
        let viewform;
        const redirecturl = localStorage.getItem('POHomeURL');
        console.log(redirecturl);
        if (redirecturl !== null){
            viewform = <Redirect to={`${redirecturl}`}/>
            localStorage.removeItem('POHomeURL');
        }
        
        return (
            
            <div>
                {viewform}
            </div>
        )
    }
}
