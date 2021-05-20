import { database } from 'firebase';
import React from 'react';
import fire from '../../fire';

import '../handleSocialScore/handleLike.css';
import Dislike from './buttons/dislike';
import Like from './buttons/like';
export class HandleLike extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            // likes:this.props.likes,
            // dislikes:this.props.dislikes,
            // // voted:false
            // lockLike:false,
            // lockDislike:false
            likeCounter:this.props.likes,
            dislikeCounter:this.props.dislikes,
            removeDislike:{},

            // test
            activeButton:this.props.liked || this.props.disliked,
            liked:this.props.liked,
            disliked:this.props.disliked
            
        }
    }

    componentDidMount(){
        console.log("Handle Like Mounted")
//         console.log("Render HandleLike.js")
//     // console.log(this.props.likes)
//     // console.log(this.state.likes)
//     const testTrue = localStorage.getItem("testTrue")
//     console.log(testTrue)
//   const convert = (testTrue === 'true')
//   console.log(convert)
//   this.setState({lockLike:convert})

    }
    handleClick(choice){
        // const updateDatabase = {}
        // const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        
        // const increaseLike = this.state.likes + 1;
        // const decreaseLike = this.state.likes - 1;

        // const dislikeAction = this.state.dislikes + 1;


        // // if choice => like
        //     // {add a like}
        //     // {lock dislike}
        // console.log(this.state.lockLike)
        // if(choice.includes("postive") && this.state.lockLike === false){
        //     this.setState({likes:increaseLike, lockDislike:true})
        //     localStorage.setItem("testTrue", true)

        //     // Saving to main array
        //     var changeDatabase = database.map(el => {
        //         if(el.id === this.props.id)
        //         // console.log("Correct")
        //             return Object.assign({}, el, {likes:increaseLike})
        //             return el
        //     });
        //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))



            
        // }
        //     // Remove like if dislike is locked, then unlock dislike.
        //     if(choice.includes("postive") && this.state.lockDislike === true || this.state.lockLike === true){
        //         this.setState({likes:decreaseLike, lockDislike: false, lockLike:false})
        //         localStorage.setItem("testTrue", false)

        //                     // Saving to main array
        //     var changeDatabase = database.map(el => {
        //         if(el.id === this.props.id)
        //         // console.log("Correct")
        //             return Object.assign({}, el, {likes:decreaseLike})
        //             return el
        //     });
        //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))

               
        //     }


        // if choice => dislike
            // {{add a dislike}}
            // {disable like}
        // if(choice.includes("negative") && this.state.lockDislike === false){
        //     this.setState({dislikes:dislikeAction, lockLike: true})
        // }
        //     // Remove Dislike if like is locked, then unlock like.
        //     if(choice.includes("negative") && this.state.lockLike === true){
        //         this.setState({dislikes:this.state.dislikes - 1, lockLike: false})
        //     }






































       
        // // const votedStatus = (localStorage.getItem("voted") === 'true')
        // const likeIncreaseLock = (localStorage.getItem("likeIncreaseLock") === 'true')
        // const dislikeIncreaseLock = (localStorage.getItem("dislikeIncreaseLock") === 'true')
        // const undoLike = (localStorage.getItem("undoLike") === 'true')
        // const undoDislike = (localStorage.getItem("undoLike") === 'true')
        
        

        // console.log(votedStatus === true)



        // Like
        // console.log(votedStatus)
        // console.log(this.state.voted)
        // if(choice.includes("postive") && likeIncreaseLock === false){
        //     // console.log(choice)
        //     this.setState({likes:likeAction, voted:true})

        //     var changeDatabase = database.map(el => {
        //         if(el.id === this.props.id)
        //         // console.log("Correct")
        //             return Object.assign({}, el, {likes:likeAction})
        //             return el
        //     });
        //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))
        //     // localStorage.setItem("voted", true)
        //     localStorage.setItem("likeIncreaseLock", true)
        //     localStorage.setItem("undoLike", true)
            
        // }

        //         // Undo Vote
        //         if(choice.includes("postive") && likeIncreaseLock === true && undoLike === true ){
        //             // console.log("Undo Vote")
        //             // console.log(undoVote)
        //             this.setState({likes:this.state.likes - 1, voted:false})
        
        //             var changeDatabase = database.map(el => {
        //                 if(el.id === this.props.id)
        //                 // console.log("Correct")
        //                     return Object.assign({}, el, {likes:this.state.likes - 1})
        //                     return el
        //             });
        
        //             localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))
        //             // localStorage.setItem("voted", false)
        //             localStorage.setItem("undoLike", false)

        //             localStorage.setItem("likeIncreaseLock", false)
        //         }



        // // Dislike
        // console.log(votedStatus)
        // console.log(this.state.voted)
        // if(choice.includes("negative")  && dislikeIncreaseLock === false){
        //     // console.log(choice)
        //     this.setState({dislikes:dislikeAction, voted:true})

        //     var changeDatabase = database.map(el => {
        //         if(el.id === this.props.id)
        //         // console.log("Correct")
        //             return Object.assign({}, el, {dislikes:dislikeAction})
        //             return el
        //     });
        //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))
        //     // localStorage.setItem("voted", true)
        //     localStorage.setItem("undoDislike", true)
        //     localStorage.setItem("dislikeIncreaseLock", true)
        // }

        // //         // // Undo Vote
        //         if(choice.includes("negative") && undoDislike === true  && dislikeIncreaseLock === true){
        //             // console.log("Undo Vote")
        //             // console.log(undoVote)
        //             this.setState({dislikes:this.state.dislikes - 1, voted:false})
        
        //             var changeDatabase = database.map(el => {
        //                 if(el.id === this.props.id)
        //                 // console.log("Correct")
        //                     return Object.assign({}, el, {dislikes:this.state.dislikes - 1})
        //                     return el
        //             });
        
        //             localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))
        //             // localStorage.setItem("voted", false)
        //             localStorage.setItem("undoDislike", false)
        //             localStorage.setItem("dislikeIncreaseLock", false)
        //         }



        // console.log(JSON.parse((localStorage.getItem("changedFullDatabaseCall"))))
        // console.log(this.state.likes)


        // updateDatabase[this.props.id + "/likes/"] = this.props.likes + 1;
        // fire.database().ref("items").update(updateDatabase);
    }
   


componentWillUnmount(){
    // console.log("Unmounting handleLike.js");
    fire.database().ref("items").off();
}

componentDidUpdate(){

}

updateLikes = (x,activeButton) =>{
    // console.log(x)
    // console.log(activeButton)
    this.setState({
        likeCounter:x,
        dislikeCounter:x,
        activeButton:activeButton
    })
}

    render(){
        // const likes = this.state.likes || this.props.likes;
        // console.log(this.props.likes)
        // console.log(this.state.likes)
        // console.log(JSON.parse((localStorage.getItem("changedFullDatabaseCall"))))
        // console.log("Liked = " + this.props.liked)
        // console.log("Disliked = " + this.props.disliked)

                console.log(this.props.liked)
        console.log(this.state.liked)
        return(
            
            <div className="socialScoreWrapper">
                {/* {thing} */}
                <div>
                    {this.props.liked ? <p>Liked</p> : <p>Not Liked</p>}
                    {this.props.disliked ? <p>Disliked</p> : <p>Not Disliked</p>}
                    <p>Like Counter  - {this.state.likeCounter}</p>

                    {this.state.activeButton === true ? 
                    <span>
                        {this.props.liked === true? 
                        <span>
                        <button ><span className="large material-icons">thumb_up_alt</span></button>  
                        <button ><span className="large material-icons">thumb_down_off_alt</span></button>
                        </span>
                        :
                        <span>
                        <button ><span className="large material-icons">thumb_up_off_alt</span></button>  
                        <button ><span className="large material-icons">thumb_down_off_alt</span></button>
                        </span>
                        } 
                         
                    </span>
                    :
                    <span>
                        {this.props.disliked === true ? 
                        <span>
                        <button ><span className="large material-icons">thumb_up_off_alt</span></button>  
                        <button ><span className="large material-icons">thumb_down_alt</span></button>
                        </span>
                        :
                        <span>
                        <button ><span className="large material-icons">thumb_up_off_alt</span></button>  
                        <button ><span className="large material-icons">thumb_down_off_alt</span></button>
                        </span>
                        } 
                    </span>
                    }
 
                    
                    <Like 
                        getLikes={this.updateLikes} 
                        likes={this.state.likeCounter} 
                        databaseId={this.props.databaseId} 
                        id={this.props.id} 
                        liked={this.props.liked}  
                        disliked={this.props.disliked}
                        activeButton={this.state.activeButton}
                    />

                    <Dislike 
                        getLikes={this.updateLikes} 
                        dislikes={this.state.dislikeCounter} 
                        databaseId={this.props.databaseId} 
                        id={this.props.id} 
                        liked={this.props.liked}
                        disliked={this.props.disliked} 
                        activeButton={this.state.activeButton}
                        
                    />




                    {/* <Like likes={this.props.likes} databaseId={this.props.databaseId} id={this.props.id} liked={this.props.liked}  disliked={this.props.disliked}/>
                    <Dislike dislikes={this.props.dislikes} databaseId={this.props.databaseId} id={this.props.id} disliked={this.props.disliked} liked={this.props.liked}/> */}



                    {/* <Dislike /> */}
                    {/*
                     <button onClick={()=>this.handleClick("postive")}>
                        <span className="large material-icons">thumb_up</span>
                        {this.state.likes}
                    </button>         

                    <button onClick={()=>this.handleClick("negative")}>
                        <span className="large material-icons">thumb_down</span>
                        {this.state.dislikes}
                    </button>   
                    */}
                </div>
            </div>
        )
    }
}

export default HandleLike;