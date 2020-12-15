import React from 'react';
import './hide-article.css';

export class HideArticle extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            postsArray:[],
        }
        this.hideArticle = this.hideArticle.bind(this);
    }

    hideArticle(value){
        console.log("Hide Article Button Pressed");
        // console.log(localStorage.getItem("hiddenPostList"));
        console.log("Post Disappearing is Post:: " + value)
        // console.log(this.state.postsArray)

        const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");

        if(localStorageHiddenPosts != null){
            const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
            // console.log(formattedPostsArray)
            formattedPostsArray.push(value)
            // console.log(formattedPostsArray)
    
            localStorage.setItem("hiddenPostList", formattedPostsArray);
            // console.log(localStorage.getItem("hiddenPostList"));
        }else{
            localStorage.setItem("hiddenPostList", value);
        }

       if(document.getElementById(value))document.getElementById(value).style.display = "none";
       


       // Display unhide btn if cache isn't empty
       if(localStorage.getItem("hiddenPostList") != null && document.getElementById("clearCache")){
           document.getElementById("clearCache").style.visibility = "visible";
       }

    }
    render(){
        

        return(
            <div className="hideArticleButtonWrapper ">
                <button onClick={()=> this.hideArticle(this.props.articleId)}>Hide Article</button>
            </div>
        )
    }
}

export default HideArticle;