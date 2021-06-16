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
            <h3>Deployed Version 12.10.1.3 - 16/6/2021</h3>

            <h5>you can temporarily hide this message by pressing it. Refresh the page/click the full website reset button in the options menu to get it back</h5>

            <p>Check out my blog for this in progress project where I post updates and detail what I am doing: <a href="https://christopherswebdevdiary.wordpress.com/">HERE</a></p>
            
            <hr />
            <p>Notice: 12.10.1 is the first in a series of updates to theKnews focused on reworking the User Interface across the entire project. So as a result some things may not look "right" and other things might appear out of place. This release focuses on the navigation bar at the top of each page.</p>
            <p>KNOWN ISSUE - If there are 2 or less articles on the page when you attempt to reload, you may get an error. Resetting the page using the full website reset button in the options menu at the top right of this page will "fix" the issue and return to page to a default state.</p>
            <p>Known Issue - Firefox(89.0): Dragging cards on the home page is not working correctly. I would avoid interacting with this for now.</p>
            <p>Known Issue - clicking "theKnews" in liteKnews is currently not doing anything. Press the "x" to leave liteKnews</p>
            <p>Potential Issue - Edge(91.0.864.48) - If you get a blank page on load, hit the full website reset button in the options menu. This might solve the problem.</p>
            <p>Known Issue - Hiding an article using the hide article button may not work and the article will still be on the page on refresh.</p>
            <p>Potential Issue - On mobile, the dropdown menu's may not appear in the correct position.</p>
            <p>Dev Note: Card Styles all look pretty bad when it's only one card on screen. This will be addressed in an upcoming update.</p>

            <p>Tip: The "Full Website Reset" button in the options menu is your friend. This is very much a WIP and, while I do try my best to make sure there are 0 bugs and everything works, I can't guarantee you won't see a blank page or elements doing things you wouldn't expect. </p>

            <p>If you have any feedback or want to get in touch: chrisdunne66@gmail.com</p>
        </div>
    )
}

export default DeploymentMessage;