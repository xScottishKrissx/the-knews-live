import HideArticle from '../utility_components/hide-article/hide-articlev2.js';
import removeBookmark from '../utility_components/bookmarks/removeBookmark.js';
export const swipeRightAction = (id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall,bookmarked) =>{
    document.getElementById(id).style.display = "none";
    // postsArray.push(id)
    

    if(bookmarked === true){
        console.log("Hide Bookmark")
        HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall,bookmarked);
        removeBookmark(id)
    }else{
        console.log("Hide Everywhere Else")
        HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall,bookmarked);
    }
    
}

export default swipeRightAction;