import createBookmarks from "./bookmarks/createBookmark.js";

export const swipeLeftAction = (id,database,changedFullDatabaseCall) =>{
    createBookmarks(id,database,changedFullDatabaseCall)
}

export default swipeLeftAction;

