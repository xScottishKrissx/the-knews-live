import React from 'react';
import fire from '../../../fire';


export class Like extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            likes:this.props.likes,
            voted:false
        }
    }
    componentDidMount(){
        if(localStorage.getItem("likeVotingStatus") === null){
            localStorage.setItem("likeVotingStatus","yes")
        }
    }
    handleClick(x){

        const updateDatabase = {}
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        var updateArray = {}
 
        
        // Increase Score
        if(x === "vote" ){
            console.log("Vote")
            this.setState({likes:this.state.likes + 1, voted:true})
            updateArray = this.state.likes + 1;
            
        
        }

        if(x === "undo" ){
            console.log("Undo Vote")
            this.setState({likes:this.state.likes - 1, voted:false})
            updateArray = this.state.likes - 1;
        }

        // Save New Score to Main Array
        var changeDatabase = database.map(el => {
            if(el.id === this.props.id)
            console.log(this.state.likes)
                return Object.assign({}, el, {likes:updateArray})
                return el
        });
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))

        // Update Database
        // updateDatabase[this.props.databaseId + "/likes/"] = this.props.likes + 1;
        // fire.database().ref("items").update(updateDatabase);
    }
    componentWillUnmount(){
        fire.database().ref("items").off(); 
    }
    render(){
        console.log(this.state.likes)
        const likes = this.state.likes;
        return(
            <div>
                 {this.state.voted === false ?
                    <button onClick={()=>this.handleClick("vote")}>
                        <span className="large material-icons">thumb_up</span>{likes}
                    </button>   
                    :
                    <button onClick={()=>this.handleClick("undo")}>
                        <span className="large material-icons">thumb_down</span>{likes}
                    </button>   
                 }
                     
            </div>
        )
    }
}

export default Like;