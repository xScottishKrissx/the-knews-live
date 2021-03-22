import React from 'react';
import './hide-article.css';

export class HideArticle extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            postsArray:[],
            articleId:props.articleId,
            articleHidden:""
        }
        this.hideArticle = this.hideArticle.bind(this);
    }

    componentDidMount(){
        // console.log(this.state.articleId)
        // console.log(this.props.test1)
        
    }
    hideArticle(value){
        console.log("Hide Article Button Pressed");
        // console.log(localStorage.getItem("hiddenPostList"));
        console.log("Post Disappearing is Post:: " + value)
        // console.log(this.state.postsArray)

        const getLatestPostArray = localStorage.getItem("articleArray8");
        const parsedLatestPostArray = JSON.parse(getLatestPostArray);
        console.log(parsedLatestPostArray)

        const index4 = value;
        var newData = parsedLatestPostArray.map(el => {
            if(el.id == index4)
                return Object.assign({}, el, {hidden:true})
                    return el
        });
        console.log(newData)
        localStorage.setItem('articleArray8', JSON.stringify(newData));
        // I can now load an array from local storage, change an property of that array and then return that changed array to the database. 
        // Next, I need to use that array in the initial page load if available.
        console.log(JSON.parse(localStorage.getItem("articleArray8")))



        const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");

        if(localStorageHiddenPosts != null){
            const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
            console.log(formattedPostsArray)
            // formattedPostsArray.push(value)
            // console.log(formattedPostsArray)
    
            // localStorage.setItem("hiddenPostList", formattedPostsArray);
            console.log(localStorage.getItem("hiddenPostList"));
        }else{
            // localStorage.setItem("hiddenPostList", value);
        }

    //    if(document.getElementById(value))document.getElementById(value).style.display = "none";
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
                {this.state.articleHidden === true ?
                <button>You won't see this article again :)</button>

                :
                <div className="hideArticleButtonWrapper ">
                    <button id={this.state.articleId} onClick={()=> this.hideArticle(this.props.articleId)}>Hide Article</button>
                </div>
                }
            </div>
        )
    }
}

export default HideArticle;
