import React,{Component} from 'react';

import "../bookmarks/bookmarks.css";


// Bookmarks
import MarkAsRead from '../bookmarks/markAsRead.js';
import swipeLeftAction from '../../utility_components/swipeLeftAction.js';

// Hiding
import HideArticle from '../../utility_components/hide-article/hide-articlev2.js';
import hideArticleFeedback from '../hide-article/hideArticleFeedback.js';
import removeBookmark from './removeBookmark';

class OnCardBookMarkControls extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmarks:[],
            toggle:false,
    }
}
markAsRead(id,fullDatabaseCall){
    // removeBookmark(id)
    MarkAsRead(id,fullDatabaseCall)
}

hideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall){
    HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);
    // console.log(arrayFromDatabase.length)
    // handleHideArticleFeedback();
    hideArticleFeedback()

}

toggle(id){
    // console.log("toggle " + id)
    
    if(this.state.toggle === false){
        this.setState({
            toggle: true
        })
        document.getElementById(id + "bookmarkIcon").classList.add('bookmarkStyle')
        console.log("Bookmark Created")
        swipeLeftAction(this.props.id,this.props.fullDatabaseCall)
    }

    if(this.state.toggle === true){
        this.setState({
            toggle: false
        })
        document.getElementById(id + "bookmarkIcon").classList.remove('bookmarkStyle')
        console.log("Bookmark Removed")
        removeBookmark(id)
    }
    
}



render(){
    // console.log(this.state.toggle)
    return(
        <div className="onCardControls">
                    
        {/* <button onClick={() => updateStateTest('someVar')}></button> */}

        <div className="markAsReadButtonWrapper">
            <button title="Mark As Read" onClick={()=>this.markAsRead(this.props.id)}> 
                <span class="material-icons" >done</span>
            </button>
        </div>  

        <div className="testButton">
            <button title="Mark As Read" onClick={()=>this.toggle(this.props.id)}> 
                <span class="material-icons" >done</span>
            </button>
        </div>  

        <div className="bookmarkButtonWrapper">
            <button title="Bookmark Article" onClick={()=>this.toggle()}>
                <span  class="material-icons" id={this.props.id + "bookmarkIcon"}>turned_in_not</span>           
            </button>
        </div>  

        <div className="hideArticleButtonWrapper">
            <button title="Hide Article" onClick={() => this.hideArticle(this.props.id,this.props.postsArray,this.props.arrayFromDatabase,this.props.leftoverArticles,this.props.fullDatabaseCall)}>
                <span class="material-icons">visibility_off</span>
            </button>
        </div>  
    </div>
    )
}
}

export default OnCardBookMarkControls;