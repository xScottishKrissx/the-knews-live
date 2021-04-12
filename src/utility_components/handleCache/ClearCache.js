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
        

        // const thingymajig = JSON.parse(localStorage.getItem("articlesArray"));
        // console.log(thingymajig)

        // const index4 = value;
        // var newData = thingymajig.map(el => {
        //     if(el.hidden == true)
        //         return Object.assign({}, el, {hidden:false})
        //             return el
        // });
        // console.log(newData)
        // localStorage.setItem('articleArray8', JSON.stringify(newData));

        // localStorage.removeItem("newLeftOverArticles")

        
        window.location.reload();
    }

    componentDidMount(){
        // if(localStorage.getItem("hiddenPostList") === null)document.getElementById("clearCache").style.visibility = "visible";
    }

    render(){
        // console.log(localStorage.getItem("hiddenPostList"))
        return (
            // <button onClick={()=> this.clearCache()} id="clearCache">Unhide All</button>
            <div>            
            <Link to='/home' onClick={()=> this.clearCache()}>
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