import React from 'react';
import fire from '../../../fire';

export class Dislike extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            dislikeCounter:this.props.dislikes,
            disliked:this.props.disliked,
        }
    }

    handleClick(x){
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        var updateArray = {}
        var disliked = {}
               
        // Increase Score
        if(x === "vote" && this.props.disliked === false){
            console.log("Vote")
            this.setState({dislikeCounter:this.state.dislikeCounter + 1, disliked:true })
            updateArray = this.state.dislikeCounter + 1;
            disliked = true;        
        }

        if(x === "undo" && this.props.disliked === true){
            console.log("Undo Vote")
            this.setState({dislikeCounter:this.state.dislikeCounter - 1, disliked:false})
            updateArray = this.state.dislikeCounter - 1;
            disliked = false;     
           
        }

        // Save New Score to Main Array
        var changeDatabase = database.map(el => {
            if(el.id === this.props.id)
                return Object.assign({}, el, {dislikes:updateArray, disliked:disliked, liked:this.props.liked})
                return el
        });
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))

        var updateState = this.props.getLikes;
        updateState(updateArray,false)

        this.updateDatabase(updateArray);

    }

    updateDatabase = (updateArray) => {
        const updateDatabase = {} 
        updateDatabase[this.props.databaseId + "/dislikes/"] = updateArray;
        fire.database().ref("items").update(updateDatabase);
    }
    componentWillUnmount(){fire.database().ref("items").off();}

    render(){
        const dislikes = this.state.dislikeCounter;
        return(
            <div>
                 {this.props.disliked === false ?
                    <button onClick={()=>this.handleClick("vote")}>
                        <span className="large material-icons">thumb_down_off_alt</span>
                        {" | " + dislikes + " dislikes"}
                    </button>   
                    :
                    <button onClick={()=>this.handleClick("undo")}>
                        <span className="large material-icons">thumb_down_alt</span> 
                        {" | " + dislikes + " dislikes"}
                    </button>   
                 }
            </div>
        )
    }
}

export default Dislike;