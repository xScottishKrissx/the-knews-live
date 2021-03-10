import React from 'react';
import '../utility_components/ClearCache.css';

export class ClearCache extends React.Component{

    clearCache(){
        // localStorage.clear();
        localStorage.removeItem("hiddenPostList")
        // localStorage.removeItem("articlesArray")
        console.log("hiddenPostList -- Removed.")
        window.location.reload();
    }

    componentDidMount(){
        if(localStorage.getItem("hiddenPostList") === null)document.getElementById("clearCache").style.visibility = "hidden";
    }

    render(){
        // console.log(localStorage.getItem("hiddenPostList"))
        return (
            <button onClick={()=> this.clearCache()} id="clearCache">Unhide All</button>
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