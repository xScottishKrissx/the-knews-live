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
        <h1>The Knews Part 1</h1>
        <h5>you can temporarily hide this message by clicking it. Refresh the page to get it back</h5>
            <ul>
                <li>This is the first part of the project that I have chosen to deploy while still under construction. </li>
                <li>Being deployed to my website helps me test React related things as well as letting any potential visitor know what I'm up to</li>
                <li>I am building a sort of news website that will display links all at once in tiles. I want it be big and bold,responsive to different resolutions, with lots of images but also room for large bodies of text.</li>
                <li>The second part of this is a form that will allow you to enter articles have them appear on the website. Basically a custom cms for authorised users just like an actual news website.</li>
                <li>To build it I am using React for the front end and Firebase for the database although I may switch to another database if I find something I like.</li>
                <li>Check out the repo for this project <a href="https://github.com/xScottishKrissx/react-project-3" target="_new">here</a></li>
                <li>It's a WIP but I'm proud of my progress so far. I also plan on updating it with a new version daily.</li>
            </ul>
        </div>
    )
}

export default DeploymentMessage;