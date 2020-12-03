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
        <h3>Deployed Version 10 - Implementing Swipe - 3rd December 2020</h3>
        <h5>you can temporarily hide this message by clicking it. Refresh the page/click the unhide all button to get it back</h5>
        <p>Check out my blog for this in progress project where I post updates and detail what I am doing: <a href="https://christopherswebdevdiary.wordpress.com/">HERE</a></p>
        <p>Known Bug:: If you hit F5, you will get an error. Remove the /home from the url to get back.</p>
        <p>Known Bug:: Every time you load an article, you will see text flash briefly. </p>
        <p>Also, swiping is a bit buggy on desktop. I had considered disabling it for mobile but I decided to enable it on desktop because why not.</p>
        <p>Also, there's no UI indicator for it yet, but you can swipe the cards to do various things:</p>
        <p>Swiping Left will show you the article without needing to actually click onto the page. It's a bit basic right and not actually formatted correctly, but you get the idea.</p>
        <p>Swiping Right will hide the card from view until you unhide it using the button at the top of the page.</p>
        </div>
    )
}

export default DeploymentMessage;