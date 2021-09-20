import HideArticle from './hide-article/hide-article.js';
import removeBookmark from '../utility_components/bookmarks/removeBookmark.js';
export const swipeRightAction = (id, postsArray,arrayFromDatabase,fullDatabaseCall,bookmarked) =>{
    document.getElementById(id).style.display = "none";
    // postsArray.push(id)
    

    if(bookmarked === true){
        console.log("Hide Bookmark")
        HideArticle(id, postsArray,arrayFromDatabase,fullDatabaseCall,bookmarked);
        removeBookmark(id)
    }else{
        console.log("Hide Everywhere Else")
        HideArticle(id, postsArray,arrayFromDatabase,fullDatabaseCall,bookmarked);
    }
    
}

export default swipeRightAction;