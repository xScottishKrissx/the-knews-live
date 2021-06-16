import React from 'react';
import './deploymentmessage.css';

class DeploymentMessage extends React.Component{
    constructor(props){
    super(props);
    this.state = {
        hidden: false,
        style:{
            color:"red",
            display:"block"
        }
    }
    
    this.hideMessage = this.hideMessage.bind(this);
    }
    
    hideMessage(){
        console.log("Hide Message");
        this.setState({style:{color:"blue", display:"none"}});
    }

    render(){
        return (
            
            <div className="message-wrapper" onClick={this.hideMessage} style={this.state.style}>
                <MessageBody />
            </div>
        );
    }
}

export const MessageBody = () =>{
    return(

        <div>
            <h1>theKnews </h1>
            <h3>Deployed Version 12.10.1 - 16/6/2021</h3>

            <h5>you can temporarily hide this message by pressing it. Refresh the page/click the full website reset button in the options menu to get it back</h5>

            <p>Check out my blog for this in progress project where I post updates and detail what I am doing: <a href="https://christopherswebdevdiary.wordpress.com/">HERE</a></p>
            
            <hr />
            <p>Notice: 12.10.1 is the first in a series of updates to theKnews focused on reworking the User Interface across the entire project. So as a result some things may not look "right" and other thigs might appear out of place. This release focuses on the navigation bar at the top of each page.</p>
            <p>KNOWN ISSUE - If there are 2 or less articles on the page when you attempt to reload, you may get an error. Resetting the page using the full website reset button in the options menu at the top right of this page will "fix" the issue and return to page to a default state.</p>
            <p>Known Issue - Hiding an article using the hide article button may not work and the article will still be on the page on refresh.</p>
            <p>Potential Issue - On mobile, the dropdown menu's may not appear in the correct position.</p>
            <p>Tip: The "Full Website Reset" button in the options menu is your friend.</p>
        </div>
    )
}

export default DeploymentMessage;