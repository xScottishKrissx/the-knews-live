import React from 'react';
import fire from '../../fire';

import '../handleSocialScore/handleLike.css';
export class HandleLike extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            likeCounter:this.props.likes,
            dislikeCounter:this.props.dislikes,

            liked:this.props.liked,
            disliked:this.props.disliked
        }
    }


    handleClick = (choice) => {
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        const liked = this.state.liked 
        const disliked = this.state.disliked 

        var updateArrayLikes = {}
        var updateLiked = {}

        var updateArrayDislikes = {}
        var updateDisliked = {}

        if(choice === "like"){
            // Like Button Permutations ->
            // Nothing Selected -> +1 to like, liked === true
            if(liked === false && disliked === false){
                console.log("Liked -> Option 1")
                this.setState({likeCounter:this.state.likeCounter + 1, liked:true})
                updateArrayLikes = this.state.likeCounter + 1;
                updateLiked = true;
                updateArrayDislikes = this.state.dislikeCounter;
                updateDisliked = disliked;
            }
            //Liked -> -1 to like, liked === false
            if(liked === true){
                console.log("Liked -> Option 2")
                this.setState({likeCounter:this.state.likeCounter - 1, liked:false})
                updateArrayLikes = this.state.likeCounter - 1;
                updateLiked = false;
                updateArrayDislikes = this.state.dislikeCounter;
                updateDisliked = disliked;
            }
            // disliked -> +1 to like, -1 to dislike, liked = true, disliked = false
            if(disliked === true){
                console.log("Liked -> Option 3")
                this.setState({likeCounter:this.state.likeCounter + 1, dislikeCounter:this.state.dislikeCounter - 1, disliked:false, liked:true})
                updateArrayLikes = this.state.likeCounter + 1;
                updateLiked = true;
                updateArrayDislikes = this.state.dislikeCounter - 1;
                updateDisliked = false;
            }
        }

        
        if(choice === "dislike")
        {
            // Dislike Button ->
            // Nothing Selected - > +1 to dislike, disliked === true
            if(disliked === false && liked === false){
                this.setState({dislikeCounter:this.state.dislikeCounter + 1, disliked:true})
                updateArrayDislikes = this.state.dislikeCounter + 1;
                updateDisliked = true;
                updateArrayLikes = this.state.likeCounter;
                updateLiked = liked;
            }
            // disliked - > -1 to dislike, disliked === false
            if(disliked === true){
                this.setState({dislikeCounter:this.state.dislikeCounter - 1, disliked:false})
                updateArrayDislikes = this.state.dislikeCounter - 1;
                updateDisliked = false;
                updateArrayLikes = this.state.likeCounter;
                updateLiked = liked;
            }
            // liked -> +1 to dislike, -1 to like, liked === false, disliked = true
            if(liked === true){
                this.setState({dislikeCounter:this.state.dislikeCounter + 1, likeCounter:this.state.likeCounter - 1, liked:false, disliked:true})
                updateArrayDislikes = this.state.dislikeCounter + 1;
                updateDisliked = true;
                updateArrayLikes = this.state.likeCounter - 1;
                updateLiked = false;
            }
        }

        // Update Main Website Array
        var changeDatabase = database.map(el => {
            if(el.id === this.props.id)
                return Object.assign({}, el, {likes:updateArrayLikes, liked:updateLiked, dislikes:updateArrayDislikes, disliked: updateDisliked})
                return el
        });
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))

        // Update Database Values
        const updateDatabase = {}
            updateDatabase[this.props.databaseId + "/likes/"] = updateArrayLikes;
            updateDatabase[this.props.databaseId + "/dislikes/"] = updateArrayDislikes;
        fire.database().ref("items").update(updateDatabase);
    }
   


    componentWillUnmount(){ fire.database().ref("items").off(); }

    render(){
        return(
            
            <div className="socialScoreWrapper">
                <div>
                    <button  onClick={()=>this.handleClick("like","dislike")}>
                        {this.state.liked === true ? 
                        <span className="animateVote">
                            <span  className="large material-icons">thumb_up_alt</span>
                            <p>{this.state.likeCounter}</p>
                        </span>
                        :
                        <span >
                            <span className="large material-icons">thumb_up_off_alt</span>
                            <p>{this.state.likeCounter}</p>
                        </span>
                        }
                    </button>         

                    <button onClick={()=>this.handleClick("dislike","like")}>
                        {this.state.disliked === true ? 
                        <span className="animateVote">
                            <span className="large material-icons">thumb_down_alt</span>
                            <p>{this.state.dislikeCounter}</p>
                        </span>
                        :
                        <span >
                            <span className="large material-icons">thumb_down_off_alt</span>
                            <p>{this.state.dislikeCounter}</p>
                        </span>
                        }
                        
                    </button>   
                </div>
            </div>
        )
    }
}

export default HandleLike;