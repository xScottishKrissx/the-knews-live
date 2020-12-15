import React from 'react';
import '../utility_components/ClearCache.css';

export class ClearCache extends React.Component{

    clearCache(){
        localStorage.clear();
        console.log("Local Storage Cleared.")
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