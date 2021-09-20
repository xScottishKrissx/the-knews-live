export const createBookmark = (id,database,changedFullDatabaseCall) =>{
      
    // Set initial array
    const arrayThing = JSON.parse(localStorage.getItem("bookmarks")) || []
    // Push card to array
    arrayThing.push(id);

    // remove duplicates
    const filterForDuplicate = Array.from(new Set(arrayThing))

    // push array to localstorage for use elsewhere
    localStorage.setItem("bookmarks", JSON.stringify(filterForDuplicate));

    const cleanDB = database;
    const currentBookmarks = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        // console.log(currentBookmarks)
    const mainArray = currentBookmarks || cleanDB;
   
    const setBookmarkTrue = mainArray.map(el => {
        if(el.id === id && el != null && el.bookmarked === false )
            return Object.assign({}, el, {bookmarked:true, hidden:false, markedforhide:false})
            return el
    });    

    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(setBookmarkTrue))


}

export default createBookmark;

