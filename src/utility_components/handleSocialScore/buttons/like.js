import React from 'react';
import fire from '../../../fire';


export class Like extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            likes:this.props.likes,
            voted:false,
            // testing
            liked:this.props.liked
        }
    }
    componentDidMount(){
        if(this.state.liked === undefined){
            // this.setState({liked:false})
            console.log(undefined)
        }
    }
    handleClick(x,y){

        const updateDatabase = {}
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        var updateArray = {}
        var liked = {}
        this.setState({liked:y})
        console.log(this.state.liked)
        
        
        // Increase Score
        if(x === "vote" ){
            console.log("Vote")
            this.setState({likes:this.state.likes + 1, voted:true,liked:true})
            updateArray = this.state.likes + 1;
            liked = true;
            // console.log(this.state.liked)
        
        }

        if(x === "undo" ){
            console.log("Undo Vote")
            this.setState({likes:this.state.likes - 1, voted:false,liked:false})
            updateArray = this.state.likes - 1;
            liked = false;
     
        }

        // Save New Score to Main Array
        var changeDatabase = database.map(el => {
            if(el.id === this.props.id)
                return Object.assign({}, el, {likes:updateArray, liked:liked})
                return el
        });
        console.log(changeDatabase)
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))

        // Update Database
        // updateDatabase[this.props.databaseId + "/likes/"] = this.props.likes + 1;
        // fire.database().ref("items").update(updateDatabase);
    }
    componentWillUnmount(){
        fire.database().ref("items").off(); 
    }
    render(){
        // console.log(this.props.id)
        console.log(this.state.liked)
        // console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))
        // console.log(this.state.likes)
        const likes = this.state.likes;
        return(
            <div>
                 {this.state.liked === false ?
                    <button onClick={()=>this.handleClick("vote",true)}>
                        <span className="large material-icons">thumb_up</span>{likes}
                    </button>   
                    :
                    <button onClick={()=>this.handleClick("undo",false)}>
                        <span className="large material-icons">thumb_down</span>{likes}
                    </button>   
                 }
                     
            </div>
        )
    }
}

export default Like;