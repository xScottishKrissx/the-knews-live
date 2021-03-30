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
        console.log("Hide Article Button Pressed");
        // console.log(localStorage.getItem("hiddenPostList"));
        console.log("Post Disappearing is Post:: " + value)
        // console.log(this.state.postsArray)


        const editedArray = JSON.parse(localStorage.getItem("editedArticleArray"));
        const mainArray = editedArray || this.props.arrayFromDatabase;
        const scrollCheckArticles = this.props.scrollCheckHide;
        console.log(scrollCheckArticles)
        
        // Filter Initial Load Articles
        const index = value;
        var markArticleForRemoval = mainArray.map(el => {
            if(el.id === index)
                return Object.assign({}, el, {hidden:true})
                
                return el
        });
        

        // Check for Articles marked as hidden -> then remove from array
        const key = true
        const arrayWithArticlesRemoved = markArticleForRemoval.filter(obj => obj.hidden !== key);
        console.log(arrayWithArticlesRemoved)

        // Get something to add to the reduced array
        const editedLeftoverArticlesArray = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray"))
        const arrayWithArticlesToBeAddedToMain = editedLeftoverArticlesArray || this.props.leftoverArticles;
        // console.log(arrayWithArticlesToBeAddedToMain)

        // Remove 1st element from leftoverArticles Array
            // !! Remember, the below console.log is actually changing the array.
        // console.log(arrayWithArticlesToBeAddedToMain.shift())

            // removed 1st element from leftover article array to reduced main array
            arrayWithArticlesRemoved.push(arrayWithArticlesToBeAddedToMain.shift());

        //Get Rest of leftoverArticles Array
        // console.log(arrayWithArticlesToBeAddedToMain.slice(0,30))

        // With 1st object removed, set remaining leftover article array into local storage.
        localStorage.setItem("editedLeftoverArticlesArray",JSON.stringify(arrayWithArticlesToBeAddedToMain))
        // console.log(localStorage.getItem("editedLeftoverArticlesArray"))
    
     
        // Array with articles marked as hidden:true
            // localStorage.setItem("editedArticleArray",JSON.stringify(markArticleForRemoval))

        // Array with hidden articles removed from array
            // localStorage.setItem("editedArticleArray",JSON.stringify(arrayWithArticlesRemoved))

        // Array with Articles added to reduced array
            localStorage.setItem("editedArticleArray",JSON.stringify(arrayWithArticlesRemoved))
        
            

        // Scroll Check Filter --> Check for ID in leftover articles array, remove and then return to local storage.
        console.log(JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")))
        console.log(this.props.articleId)
        const prepLeftoverArticlesForFilter = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray"));
        console.log(prepLeftoverArticlesForFilter)

        const index2 = value;
        var markScrollCheckArticleForRemoval = prepLeftoverArticlesForFilter.map(el => {
            if(el.id === index2)
                return Object.assign({}, el, {hidden:true})
                
                return el
        });
        console.log(markScrollCheckArticleForRemoval)

        // Check for Articles marked as hidden -> then remove from array
        const key2 = true
        const filteredLeftoverArticlesForScrollCheck = markScrollCheckArticleForRemoval.filter(obj => obj.hidden !== key2);
        console.log(filteredLeftoverArticlesForScrollCheck)

        // Set newly filtered leftover articles in storage.
        localStorage.setItem("editedLeftoverArticlesArray",JSON.stringify(filteredLeftoverArticlesForScrollCheck))






















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
                    <button id={this.state.articleId} onClick={()=> this.hideArticle(this.props.articleId)}>X</button>
                </div>
                {/* // } */}
            </div>
        )
    }
}

export default HideArticle;
