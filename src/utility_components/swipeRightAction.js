// swipeRightAction(id){   
//     // console.log("Post Disappearing is Post:: " + id)
//     // console.log(this.state.postsArray)
//     document.getElementById(id).style.display = "none";
//     this.state.postsArray.push(id)
//     localStorage.setItem("hiddenPostList", this.state.postsArray);
//     // console.log(localStorage.getItem("hiddenPostList"));
// }

export const swipeRightAction = (id, postsArray) =>{
    document.getElementById(id).style.display = "none";
    postsArray.push(id)
    localStorage.setItem("hiddenPostList", postsArray);

    // Display unhide btn if cache isn't empty
    if(localStorage.getItem("hiddenPostList") != null && document.getElementById("clearCache")){
        document.getElementById("clearCache").style.visibility = "visible";
    }
}

export default swipeRightAction;