// swipeRightAction(id){   
//     // console.log("Post Disappearing is Post:: " + id)
//     // console.log(this.state.postsArray)
//     document.getElementById(id).style.display = "none";
//     this.state.postsArray.push(id)
//     localStorage.setItem("hiddenPostList", this.state.postsArray);
//     // console.log(localStorage.getItem("hiddenPostList"));
// }
import React from 'react';
export const ShowArticleTest = (id,title) =>{

    console.log("ShowArticleTest " + id)
    return(
        <div>
            <h1>Title: {id}</h1>
        </div>
    )




}

export default ShowArticleTest;