import React from 'react';
import '../utility_components/ClearCache.css';

import {Route, Redirect, Switch} from 'react-router-dom';
import { useHistory } from "react-router-dom";


import Home from '../home-page/home.js';

function HomeButton() {
    const history = useHistory();
  
    function handleClick() {
        // window.location.reload();
      history.push("/theKnews/home");
      localStorage.removeItem("hiddenPostList")
      // localStorage.removeItem("articleArray8")
      // localStorage.removeItem("articlesArray")
      localStorage.removeItem("editedArticleArray")
      localStorage.removeItem("editedLeftoverArticlesArray")
      localStorage.removeItem("testNewArticlesOnRender")
      console.log("hiddenPostList -- Removed.")
      
    }
  
    return (
      <button id="clearCache" type="button" onClick={handleClick}>ClearCache</button>
    );
  }


export class ClearCache extends React.Component{

    clearCache(){
        // localStorage.clear();
        localStorage.removeItem("hiddenPostList")
        // localStorage.removeItem("articleArray8")
        // localStorage.removeItem("articlesArray")
        localStorage.removeItem("editedArticleArray")
        localStorage.removeItem("editedLeftoverArticlesArray")
        localStorage.removeItem("testNewArticlesOnRender")
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
        // const history = useHistory();

        // function HomeButton() {
        //     let history = useHistory();
        //     history.push('/home');
        //   };

        
        window.location.reload();
    }

    componentDidMount(){
        if(localStorage.getItem("hiddenPostList") === null)document.getElementById("clearCache").style.visibility = "visible";
    }

    render(){
        // console.log(localStorage.getItem("hiddenPostList"))
        return (
            <div onClick={()=> this.clearCache()} id="clearCache">Clear Cache</div>
            // <div onClick={()=> this.clearCache()} id="clearCache"><HomeButton /></div>

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