import React,{Component} from 'react';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

class Bookmarks extends Component {
    render(){
        const database = JSON.parse(localStorage.getItem("cleanDatabaseCall"))
        const editedArray = JSON.parse(localStorage.getItem("editedArticleArray"));
        const mainArray = editedArray || database;

        const bookmarks = JSON.parse(localStorage.getItem("bookmarks"))



        return(
            <RenderCard database={database}/>
        )
    }
}

export default Bookmarks;