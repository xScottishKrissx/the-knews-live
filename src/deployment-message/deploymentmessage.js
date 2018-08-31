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
        <h3>Deployed V5 - 31 August 2018 </h3>
        <h5>you can temporarily hide this message by clicking it. Refresh the page to get it back</h5>
        <p>Keep an eye out for constant updates as I tinker and add new features regularly: <a href="https://christopherdunne.co.uk/portfolio/react-project-3-the-knews/">HERE</a></p>
            <ul>
                <li>This is a project that I have chosen to deploy while still under construction.</li>
                <li>Being deployed to a live server helps me test React related things as well as letting any potential visitor know what I'm up to</li>
                <li>I am building a sort of news website that will display items all at once in the form of tiles. I want it to feel big and bold,responsive to different resolutions, with lots of images but also room for large bodies of text because as a news site the actual text should be priority.</li>
                <li>To build it I am using React for the front end and Google Firebase for the database</li>
                <li>Check out the repo for this project <a href="https://github.com/xScottishKrissx/react-project-3" target="_new">here</a></li>
                <li>It's a WIP but I'm proud of my progress so far. I also plan on updating it with a new version daily.</li>
                <li>KNOWN BUG: If you refresh on a news article you will get a 404 error.</li>
            </ul>
        </div>
    )
}

export default DeploymentMessage;