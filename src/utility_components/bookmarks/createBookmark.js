import '../bookmarks/createBookmark.css';

export const createBookmark = (id,database,changedFullDatabaseCall) =>{
    // console.log(id)
    // console.log(database)
    // console.log(changedFullDatabaseCall)
    console.log("Bookmark created with article " + id)

    // document.getElementById(id + "bookmarkIcon").classList.add('bookmarkStyle')
    // document.getElementById(id).classList.remove('markAsRead')

    document.getElementById(id + "bookmarkIcon").classList.add('bookmarkStyle')
    document.getElementById(id).classList.remove('markAsRead')
    
    // Set initial array
    var arrayThing = JSON.parse(localStorage.getItem("bookmarks")) || []
    // Push card to array
    arrayThing.push(id);

    // remove duplicates
    const filterForDuplicate = Array.from(new Set(arrayThing))

    // push array to localstorage for use elsewhere
    localStorage.setItem("bookmarks", JSON.stringify(filterForDuplicate));

    const cleanDB = database
     
    const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkArray"));
        console.log(currentBookmarks)
    const mainArray = currentBookmarks || cleanDB;
   
    var setBookmarkTrue = mainArray.map(el => {
        if(el.id === id && el != null && el.bookmarked === false )
            return Object.assign({}, el, {bookmarked:true})
            return el
    });


    

    localStorage.setItem("bookmarkArray", JSON.stringify(setBookmarkTrue))
    // console.log(JSON.parse((localStorage.getItem("bookmarkArray"))))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(setBookmarkTrue))
    // changedFullDatabaseCall
}

export default createBookmark;

