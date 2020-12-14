import React from 'react';

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
        console.log(localStorage.getItem("hiddenPostList"));
        console.log("Post Disappearing is Post:: " + value)
        console.log(this.state.postsArray)
        // document.getElementById(value).style.display = "none";
        this.state.postsArray.push(value)
        localStorage.setItem("hiddenPostList", this.state.postsArray);
        console.log(localStorage.getItem("hiddenPostList"));


    }
    render(){
        console.log("Hide Article -> " + this.props.articleId)
        return(
            <div>
                <button onClick={()=> this.hideArticle(this.props.articleId)}>Hide Article</button>
            </div>
        )
    }
}

export default HideArticle;