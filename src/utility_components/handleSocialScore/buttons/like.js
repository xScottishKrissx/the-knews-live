import React from 'react';
import fire from '../../../fire';

export class Like extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            likeCounter:this.props.likes,
            liked:this.props.liked
        }
    }
    componentWillMount(){      
    }
    handleClick(x){
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        var updateArray = {}
        var liked = {}
               
        // Increase Score
        if(x === "vote" ){
            console.log("Vote")
            this.setState({likeCounter:this.state.likeCounter + 1, liked:true})
            updateArray = this.state.likeCounter + 1;
            liked = true;   
        }

        if(x === "undo" ){
            console.log("Undo Vote")
            this.setState({likeCounter:this.state.likeCounter - 1, liked:false})
            updateArray = this.state.likeCounter - 1;
            liked = false;
                 
        }
        // Save New Score to Main Array
        var changeDatabase = database.map(el => {
            if(el.id === this.props.id )
                return Object.assign({}, el, {likes:updateArray, liked:liked})
                return el
        });
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))
        
        var updateState = this.props.getLikes;
        updateState(updateArray,true)


        this.updateDatabase(updateArray);

    }

    updateDatabase = (updateArray) => {
        const updateDatabase = {} 
        updateDatabase[this.props.databaseId + "/likes/"] = updateArray;
        fire.database().ref("items").update(updateDatabase);
    }
    componentWillUnmount(){fire.database().ref("items").off();}

    render(){
       
      const likes = this.state.likeCounter;
      
      return(
               
            <div>
                 {this.props.liked === false ?
                    <button onClick={()=>this.handleClick("vote")}>
                        <span className="large material-icons">thumb_up_off_alt</span>
                        {" | " + likes + " likes"}
                    </button>   
                    :
                    <button onClick={()=>this.handleClick("undo")}>
                        <span className="large material-icons">thumb_up_alt</span> 
                        {" | " + likes + " likes"}
                    </button>   
                 }
                     
            </div>
        )
    }
}

export default Like;