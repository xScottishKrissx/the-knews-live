import React,{Component} from 'react';

import "../bookmarks/bookmarks.css";
import RenderCard from '../renderCard/renderCard.js';

class Bookmarks extends Component {
    render(){
        const database = JSON.parse(localStorage.getItem("cleanDatabaseCall"))
        return(
            <RenderCard database={database}/>
        )
    }
}

export default Bookmarks;