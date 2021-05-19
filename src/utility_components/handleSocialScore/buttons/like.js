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

    handleClick(x,y){

        // const updateDatabase = {}
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
        console.log(updateArray)
        // Save New Score to Main Array
        var changeDatabase = database.map(el => {
            if(el.id === this.props.id)
                return Object.assign({}, el, {likes:updateArray, liked:liked})
                return el
        });
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))

        // Update Database
        if(liked){
            console.log("Update Database")
            
        }
        // updateDatabase[this.props.databaseId + "/likes/"] = this.props.likes + 1;
        // fire.database().ref("items").update(updateDatabase);
    }
    componentWillUnmount(){
        fire.database().ref("items").off(); 
       
        
    }
    updateToDatabase =(x) => {
        console.log("Update Database " + x)
        // const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        // var changeDatabase = database.map(el => {
        //     if(el.id === this.props.id)
        //         console.log(el.likes)
        //         return el
        // });

        const dbRef = fire.database().ref("items").orderByKey().equalTo(this.props.databaseId);
        console.log(dbRef)

        dbRef.on('value', (snapshot) => {
            let dbObjects = snapshot.val();
            let newState = [];
            for (let dbObject in dbObjects){
              newState.push({
                likes:dbObjects[dbObject].likes,               
              })
            }
            const thing = newState;
            console.log(thing[0].likes)
            
        const updateDatabase = {} 
        const thing2 = thing[0].likes + 1
        updateDatabase[this.props.databaseId + "/likes/"] = thing2;
        console.log(updateDatabase)
        fire.database().ref("items").update(updateDatabase);
        })

   

        // const updateDatabase = {} 
        // updateDatabase[this.props.databaseId + "/likes/"] = this.props.likes + 1;
        // fire.database().ref("items").update(updateDatabase);
    }

    render(){
        console.log(this.props.likes)
        const likes = this.state.likeCounter;
        return(
            <div>
                 {this.state.liked === false ?
                    <button onClick={()=>this.handleClick("vote")}>
                        {/* <span className="large material-icons">thumb_up</span> */}
                        Click To Like | {" " + likes + " likes"}
                    </button>   
                    :
                    <button onClick={()=>this.handleClick("undo")}>
                        {/* <span className="large material-icons">thumb_down</span> */}
                        Click To Dislike | 
                        {" " + likes + " likes"}
                    </button>   
                 }
                     
            </div>
        )
    }
}

export default Like;