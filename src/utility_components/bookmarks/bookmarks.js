import React,{Component} from 'react';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

class Bookmarks extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmarks:[]  
        }
    }
    componentDidMount(){
        const database = JSON.parse(localStorage.getItem("bookmarkArray"))
        // console.log(database)

        if(database === null){
            this.setState({bookmarks:[]})
        }else{
            const getBookmarks = database.filter(obj => obj.bookmarked === true) 
            this.setState({bookmarks:getBookmarks})
        }

    }
    render(){


        return(
            <div id="bookmarkWrapper">
            <h1>Bookmarks</h1>
            {this.state.bookmarks.length === 0 ?
            <p>You haven't bookmarked anything yet :(</p>
            :
            <RenderCard database={this.state.bookmarks}/>
            }
            
            </div>
        )
    }
}

export default Bookmarks;