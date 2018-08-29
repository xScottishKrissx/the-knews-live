import React from 'react'

import fire from "../../../fire.js";

export class HandleLike extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            clickedid:"0",
            // likeGraphic: require('./assets/like.png'),
            likeGraphic: 'https://christopherdunne.co.uk/react-cards-project/static/media/like.df7ce1e7.png',
            currentLikes:this.props.likes,
            currentDislikes: this.props.dislikes,
            newLikes: "",
            isLike:false,
            currentID: this.props.id
        }
        this.clicked = this.clicked.bind(this); 
    }
    componentWillMount(){
        console.log(this.state.currentLikes)
        console.log(this.state.currentID);

        // const currentID = this.state.currentID
        // const dbRef = fire.database().ref("items").orderByKey().equalTo(currentID);

        // const updateLikes = {};
        // updateLikes[currentID + "/likes/"] = this.state.currentLikes + 1;

        // fire.database().ref("items").update(updateLikes);

    }
    clicked(e){
        e.preventDefault();
        console.log("Clicked")
        const getButtonClicked = document.getElementById(e.currentTarget.id).id;
        console.log(getButtonClicked);

        const currentID = this.state.currentID
        const dbRef = fire.database().ref("items").orderByKey().equalTo(currentID);

        const updateLikes = {};

        if (getButtonClicked === "likeBtn"){
            console.log("UpVote")
            this.setState({currentLikes: this.state.currentLikes + 1})
            updateLikes[currentID + "/likes/"] = this.state.currentLikes + 1;
        }else if(getButtonClicked === "dislikeBtn"){
            console.log("Downvote")
            this.setState({currentDislikes: this.state.currentDislikes - 1})
            updateLikes[currentID + "/dislikes/"] = this.state.currentDislikes - 1;
        }else{
            console.log("Do Nothing");
        }

        
        // // When clicked update the database likes by +1


        console.log(updateLikes)

        fire.database().ref("items").update(updateLikes);
    }

    componentWillUnmount(){
        console.log("Unmounting handle-like.js");
        fire.database().ref("items").off();
    }

    render(){
        return (
            <div>
                <p id="likeBtn" onClick={this.clicked}>Like: {this.state.currentLikes}</p>
                <p id="dislikeBtn" onClick={this.clicked}>Dislikes: {this.state.currentDislikes}</p>
                {/* <button onClick={this.clicked}>UpClick</button> */}
            </div>
        )
    }
}

export default HandleLike;