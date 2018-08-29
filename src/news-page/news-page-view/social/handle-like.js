import React from 'react'

import fire, {auth, provider} from "../../../fire.js";

export class HandleLike extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            clickedid:"0",
            // likeGraphic: require('./assets/like.png'),
            likeGraphic: 'https://christopherdunne.co.uk/react-cards-project/static/media/like.df7ce1e7.png',
            currentLikes:this.props.likes,
            currentDislikes: this.props.dislikes,
            loggedIn: false,
            newLikes: "",
            isLike:false,
            currentID: this.props.id,
            user: null
        }
        this.clicked = this.clicked.bind(this); 
    }
    componentDidMount(){
        console.log(this.state.currentLikes)
        console.log(this.state.currentID);
        // const checkUser = fire.auth().currentUser;
    //    console.log(fire.auth().currentUser.displayName)

       if(fire.auth().currentUser){
           console.log("User Logged In")
           this.setState({
               loggedIn: true
           })
       }else{
           console.log("Not logged in")
           this.setState({
               loggedIn: false
           })
       }

        // const currentID = this.state.currentID
        // const dbRef = fire.database().ref("items").orderByKey().equalTo(currentID);

        // const updateLikes = {};
        // updateLikes[currentID + "/likes/"] = this.state.currentLikes + 1;

        // fire.database().ref("items").update(updateLikes);


        // auth.signInWithPopup(provider).then((result) => {
        //     const user = result.user;
        //     this.setState({
        //       user
        //     });
        //   })
        // auth.onAuthStateChanged((user) => {
        //     if(user){
        //       this.setState({user});
        //     }
        //   }) 
        //   console.log(this.state.user.displayName);
    }
    clicked(e){
        e.preventDefault();
        console.log("Clicked")
        const getButtonClicked = document.getElementById(e.currentTarget.id).id;
        console.log(getButtonClicked);

        const currentID = this.state.currentID
        const dbRef = fire.database().ref("items").orderByKey().equalTo(currentID);

        const updateLikes = {};

        if(this.state.loggedIn === true){
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
        }else{
            console.log("Please Log In to Use the Page Score Function")
            alert("Please Log-In to use Page Score Functionality")
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
                <div className="article-likes">                
                    <p className="social-score pos" id="likeBtn" onClick={this.clicked}>Like: {this.state.currentLikes}</p>
                </div>

                <div className="article-dislikes">
                    <p className="social-score neg" id="dislikeBtn" onClick={this.clicked}>Dislikes: {this.state.currentDislikes}</p>
                </div>
            </div>
        )
    }
}

export default HandleLike;