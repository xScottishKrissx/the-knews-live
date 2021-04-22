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
        <h3>Deployed Version 11.5.3 - 22/4/2021</h3>
        <h5>you can temporarily hide this message by pressing it. Refresh the page/click the unhide all button to get it back</h5>
        <p>Check out my blog for this in progress project where I post updates and detail what I am doing: <a href="https://christopherswebdevdiary.wordpress.com/">HERE</a></p>
        <p>I am currently in the process of (in a very backwards step) writing a full blog post and release notes for the portfolio page.</p>
        <p>However, there are some bugs in this released version and I will be updating this list as I catch/solve them</p>
        <p>KNOWN ISSUE - If there are 2 or less articles on the page when you attempt to reload, you may get an error. Resetting the page using the button at the very top right will "fix" this and return the website to it's default state.</p>
        <p>KNOWN ISSUE - Changing card size and then attempting to hide articles is currently not working </p>
        </div>
    )
}

export default DeploymentMessage;