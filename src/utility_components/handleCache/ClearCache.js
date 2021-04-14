import React from 'react';
import './ClearCache.css'

import {Link} from 'react-router-dom';

export class ClearCache extends React.Component{

    clearCache(){
        // localStorage.clear();
        localStorage.removeItem("hiddenPostList")
        // localStorage.removeItem("articleArray8")
        // localStorage.removeItem("articlesArray")
        localStorage.removeItem("editedArticleArray")
        localStorage.removeItem("editedLeftoverArticlesArray")
        localStorage.removeItem("testNewArticlesOnRender")
        localStorage.removeItem("filterOption")
        localStorage.removeItem("changedFullDatabaseCall")
        
       
        console.log("hiddenPostList -- Removed.")
                
        // window.location.reload();
    }

    componentDidMount(){
        // if(localStorage.getItem("hiddenPostList") === null)document.getElementById("clearCache").style.visibility = "visible";
    }

    render(){
        // console.log(localStorage.getItem("hiddenPostList"))
        return (
            // <button onClick={()=> this.clearCache()} id="clearCache">Unhide All</button>
            <div>            
            <Link to='/' onClick={()=> this.clearCache()}>
                <button id="clearCache">Unhide All</button>
             </Link>
             </div>

        );
    }
}

export default ClearCache;

// Things that have been set

// articlesArray
// hiddenPosts
// hiddenPostList
// myData
// CardStyleSetting
// savedCardOptionsPosition
// DarkMode (Disabled)
// 