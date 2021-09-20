import toggleBookmark from "./bookmarks/bookmarkFunctions/toggleBookmark.js";

export const swipeLeftAction = (id,database,changedFullDatabaseCall) =>{
    toggleBookmark(id,database,changedFullDatabaseCall)
}

export default swipeLeftAction;

