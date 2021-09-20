import HideArticle from './hide-article/hide-article.js';
import removeBookmark from './bookmarks/bookmarkFunctions/removeBookmark.js';
export const swipeRightAction = (id,bookmarked) =>{

    document.getElementById(id).style.display = "none";    

    if(bookmarked === true){
        console.log("Hide Bookmark")
        HideArticle(id);
        removeBookmark(id)
    }else{
        console.log("Hide Everywhere Else")
        HideArticle(id);
    }
    
}

export default swipeRightAction;