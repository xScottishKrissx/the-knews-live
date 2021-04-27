import HideArticle from '../utility_components/hide-article/hide-articlev2.js';
export const swipeRightAction = (id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall) =>{
    document.getElementById(id).style.display = "none";
    // postsArray.push(id)
    HideArticle(id, postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall);
}

export default swipeRightAction;