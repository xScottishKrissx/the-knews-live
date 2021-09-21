export const toggleBookmark = (id,database,toggleBookmark) =>{
    // console.log(toggleBookmark + " Bookmark")
    const cleanDB = database;
    const currentBookmarks = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
    const mainArray = currentBookmarks || cleanDB;
   
    let updateBookmark;
    if(toggleBookmark.includes("create")){
        updateBookmark = mainArray.map(el => {
        if(el.id === id && el != null && el.bookmarked === false )
            return Object.assign({}, el, {bookmarked:true, hidden:false, markedforhide:false})
            return el
    });  
    }

    if(toggleBookmark.includes("remove")){
        updateBookmark = mainArray.map(el => {
        if(el.id === id && el != null && el.bookmarked === true )
            return Object.assign({}, el, {bookmarked:false})
            return el
    });  
    }

    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(updateBookmark))
}

export default toggleBookmark;

