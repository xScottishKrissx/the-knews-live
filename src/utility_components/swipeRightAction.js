// swipeRightAction(id){   
//     // console.log("Post Disappearing is Post:: " + id)
//     // console.log(this.state.postsArray)
//     document.getElementById(id).style.display = "none";
//     this.state.postsArray.push(id)
//     localStorage.setItem("hiddenPostList", this.state.postsArray);
//     // console.log(localStorage.getItem("hiddenPostList"));
// }
import HideArticle from '../utility_components/hide-article/hide-articlev2.js';
export const swipeRightAction = (id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall) =>{
    document.getElementById(id).style.display = "none";
    // postsArray.push(id)
    // localStorage.setItem("hiddenPostList", postsArray);

    HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);


    // Display unhide btn if cache isn't empty
    if(localStorage.getItem("hiddenPostList") != null && document.getElementById("clearCache")){
        document.getElementById("clearCache").style.visibility = "visible";
    }
}

export default swipeRightAction;