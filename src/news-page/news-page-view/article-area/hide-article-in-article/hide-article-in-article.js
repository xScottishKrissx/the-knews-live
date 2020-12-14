import React from 'react';

export class HideArticle extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            postsArray:[],
        }
        this.hideArticle = this.hideArticle.bind(this);


    }
    componentDidMount(){
        console.log("Article Page Hidden Post List -> " + localStorage.getItem("hiddenPostList"));


    }

    hideArticle(value){
        // console.log("Hide Article Button Pressed");
        console.log(localStorage.getItem("hiddenPostList"));
        console.log("Post Disappearing is Post:: " + value)
        console.log(this.state.postsArray)
        // document.getElementById(value).style.display = "none";
        // this.state.postsArray.push(value)

        const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
        // const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)

        if(localStorageHiddenPosts != null){
            const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
            console.log(formattedPostsArray)
            formattedPostsArray.push(value)
            console.log(formattedPostsArray)
    
            localStorage.setItem("hiddenPostList", formattedPostsArray);
            console.log(localStorage.getItem("hiddenPostList"));
        }else{
            localStorage.setItem("hiddenPostList", value);
        }

       if(document.getElementById(value)) {
        document.getElementById(value).style.display = "none";
       }



        // console.log(formattedPostsArray)
        // formattedPostsArray.push(value)
        // console.log(formattedPostsArray)

        // localStorage.setItem("hiddenPostList", formattedPostsArray);
        console.log(localStorage.getItem("hiddenPostList"));



        // const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
        // const checkExist = setInterval(function() {
        //     if (!!localStorageHiddenPosts && document.getElementById(value.id)) {
        //     console.log("Exists!");
        //     clearInterval(checkExist);
        //     const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
            
        //         for(var i = 0; i < formattedPostsArray.length; i++){
        //             if(!!formattedPostsArray && formattedPostsArray[i].toString() === value.id.toString()){
        //                 // console.log("Hidden Post Identified")
        //                 // document.getElementById(value.id).style.display = "none";
        //                 console.log("Success: " + value.id + " hidden");
        //                 console.log(formattedPostsArray[i]);
        //             }
        //         }        

        //     }
        // }, 100); // check every 100ms
    }
    render(){
        

        return(
            <div>
                <button onClick={()=> this.hideArticle(this.props.articleId)}>Hide Article</button>
            </div>
        )
    }
}

export default HideArticle;