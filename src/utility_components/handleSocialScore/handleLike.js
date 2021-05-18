import { database } from 'firebase';
import React from 'react';
import fire from '../../fire';

import '../handleSocialScore/handleLike.css';
export class HandleLike extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            likes:this.props.likes,
            dislikes:this.props.dislikes,
            voted:false
        }
    }

    componentDidMount(){
    // console.log(this.props.likes)
    // console.log(this.state.likes)
    }
    handleClick(choice){
        const updateDatabase = {}
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        
        const likeAction = this.state.likes + 1;
        const dislikeAction = this.state.dislikes + 1;


        






































       
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


    render(){
        // console.log(this.props.likes)
        // console.log(this.state.likes)
        // console.log(JSON.parse((localStorage.getItem("changedFullDatabaseCall"))))

        return(
            
            <div className="socialScoreWrapper">
                {/* {thing} */}
                <div>
                    <button onClick={()=>this.handleClick("postive")}>
                        <span className="large material-icons">thumb_up</span>
                        {this.state.likes}
                    </button>         

                    <button onClick={()=>this.handleClick("negative")}>
                        <span className="large material-icons">thumb_down</span>
                        {this.state.dislikes}
                    </button>  
                </div>
            </div>
        )
    }
}

export default HandleLike;