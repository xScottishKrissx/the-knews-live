import React from 'react';
import './hide-article.css';

export class HideArticle extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            postsArray:[],
            articleId:props.articleId,
            articleHidden:"",

            //testing
            filteredPostArray:[],
        }
        this.hideArticle = this.hideArticle.bind(this);
    }

    componentDidMount(){
        // console.log(this.state.articleId)
        // console.log(this.props.test1)
        
        
    }
    hideArticle(value){
        // console.log("Hide Article Button Pressed");
        // console.log(localStorage.getItem("hiddenPostList"));
        // console.log("Post Disappearing is Post:: " + value)
        // console.log(this.state.postsArray)

        // console.log(this.props.arrayFromDatabase)
        const editedArray = JSON.parse(localStorage.getItem("editedArticleArray"));
        const mainArray = editedArray || this.props.arrayFromDatabase;
        
        const index = value;
        var hideObjectInArray = mainArray.map(el => {
            if(el.id === index)
                return Object.assign({}, el, {hidden:true})
                return el
        });
        // console.log(hideObjectInArray)

        // Check for Articles marked as hidden -> then remove from array
        const key = true
        const arrayWithArticlesRemoved = hideObjectInArray.filter(obj => obj.hidden !== key);
        console.log(arrayWithArticlesRemoved)


        // Array with articles marked as hidden:true
            // localStorage.setItem("editedArticleArray",JSON.stringify(hideObjectInArray))

        // Array with hidden articles removed from array
        localStorage.setItem("editedArticleArray",JSON.stringify(arrayWithArticlesRemoved))

        console.log(JSON.parse(localStorage.getItem("editedArticleArray")))





        // This is for hiding the article in UI - Might remove later 24/3/2021
        const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");

        if(localStorageHiddenPosts != null){
            // const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
            // console.log(formattedPostsArray)
            // formattedPostsArray.push(value)
            // console.log(formattedPostsArray)
    
            // localStorage.setItem("hiddenPostList", formattedPostsArray);
            // console.log(localStorage.getItem("hiddenPostList"));
        }else{
            // localStorage.setItem("hiddenPostList", value);
        }

       if(document.getElementById(value))document.getElementById(value).style.display = "none";
    //    if(document.getElementById("btn"+value))document.getElementById("btn"+value).style.display = "block";
       


       // Display unhide btn if cache isn't empty
       if(localStorage.getItem("hiddenPostList") != null && document.getElementById("clearCache")){
           document.getElementById("clearCache").style.visibility = "visible";
       }


       this.setState({
           articleHidden: true
       })
    }


    render(){
        

        return(
            <div>
                {/* {this.state.articleHidden === true ?
                <button>You won't see this article again :)</button> */}

                {/* // : */}
                <div className="hideArticleButtonWrapper ">
                    <button id={this.state.articleId} onClick={()=> this.hideArticle(this.props.articleId)}>Hide Article</button>
                </div>
                {/* // } */}
            </div>
        )
    }
}

export default HideArticle;
