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
        <h1>The Knews </h1>
        <h3>Deployed V9 - 16 October 2020 - </h3>
        <h5>you can temporarily hide this message by clicking it. Refresh the page to get it back</h5>
        <p>Check out my blog for this in progress project where I post updates and detail what I am doing: <a href="https://christopherswebdevdiary.wordpress.com/">HERE</a></p>
        <p>Known Bug:: If you hit F5, you will get an error. Remove the /home from the url to get back.</p>
        <p>Known Bug:: Every time you load an article, you will see text flash briefly. </p>
        </div>
    )
}

export default DeploymentMessage;