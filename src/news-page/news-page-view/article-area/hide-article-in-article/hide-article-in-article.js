import React from 'react';

export class HideArticle extends React.Component{
    constructor(props){
        super(props);
        this.hideArticle = this.hideArticle.bind(this);

    }

    hideArticle(value){
        console.log("Hide Article Button Pressed");
        console.log(localStorage.getItem("hiddenPostList"));

        // This isn't setup yet...

        const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
        const checkExist = setInterval(function() {
            if (!!localStorageHiddenPosts && document.getElementById(value.id)) {
            console.log("Exists!");
            clearInterval(checkExist);
            const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)

                for(var i = 0; i < formattedPostsArray.length; i++){
                    if(!!formattedPostsArray && formattedPostsArray[i].toString() === value.id.toString()){
                        // console.log("Hidden Post Identified")
                        document.getElementById(value.id).style.display = "none";
                        console.log("Success: " + value.id + " hidden");
                        console.log(formattedPostsArray[i]);
                    }
                }        

            }
        }, 100); // check every 100ms

    }
    render(){
        
        return(
            <div>
                <button onClick={()=> this.hideArticle(7)}>Hide Article</button>
            </div>
        )
    }
}

export default HideArticle;