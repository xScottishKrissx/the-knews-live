import createBookmarks from "./bookmarks/createBookmark.js";

export const swipeLeftAction = (id,database,changedFullDatabaseCall) =>{
    createBookmarks(id,database,changedFullDatabaseCall)

    // I think in order to update the bookmark icon, this needs to be a part of a stateful component in renderCard. It's the only way I can think of to make this work.
    
    const otherthing = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
    console.log(otherthing)
}

export default swipeLeftAction;

