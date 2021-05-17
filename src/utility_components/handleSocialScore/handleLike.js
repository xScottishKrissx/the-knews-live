import { database } from 'firebase';
import React from 'react';
import fire from '../../fire';

import '../handleSocialScore/handleLike.css';
export class HandleLike extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            likes:this.props.likes
        }
    }

    componentDidMount(){
    // console.log(this.props.likes)
    // console.log(this.state.likes)
    }
    handleClick(){
        const updateDatabase = {}
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        this.setState({likes:this.state.likes + 1})

        var changeDatabase = database.map(el => {
            if(el.id === this.props.id)
            console.log("Correct")
                return Object.assign({}, el, {likes:this.props.likes + 1})
                return el
        });

        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeDatabase))
        console.log(JSON.parse((localStorage.getItem("changedFullDatabaseCall"))))
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
        
        const database = JSON.parse((localStorage.getItem("changedFullDatabaseCall")));
        const filterThing = database.filter(obj => obj.id === this.props.id)
        // console.log(this.props.likes)
        // console.log(this.state.likes)
        // const thing = filterThing.map((value) => {
        //     return(
        //         <div>
        //         <button onClick={()=>this.handleClick()}>
        //             <span className="large material-icons">thumb_up</span>
        //             {value.likes}
        //         </button>                       
        //         {/* <button><span className="large material-icons">thumb_down</span></button> */}
        //         </div>
        //     )
        // })
        return(
            
            <div className="socialScoreWrapper">
                {/* {thing} */}
                <div>
                    <button onClick={()=>this.handleClick()}>
                        <span className="large material-icons">thumb_up</span>
                        {this.state.likes}
                    </button>                       
                    {/* <button><span className="large material-icons">thumb_down</span></button> */}
                </div>
            </div>
        )
    }
}

export default HandleLike;