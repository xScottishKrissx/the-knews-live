import createBookmarks from "./bookmarks/createBookmark.js";

export const swipeLeftAction = (id,database) =>{
    createBookmarks(id,database)
}

export default swipeLeftAction;

