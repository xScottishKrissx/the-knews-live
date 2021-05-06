import '../bookmarks/createBookmark.css';

export const createBookmark = (id,database) =>{
    console.log("Bookmark created with article " + id)
    document.getElementById(id).classList.add('bookmarkStyle')
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
    const mainArray = currentBookmarks || cleanDB;
   
    var setBookmarkTrue = mainArray.map(el => {
        if(el.id === id && el != null )
            return Object.assign({}, el, {bookmarked:true})
            return el
    });

    localStorage.setItem("bookmarkArray", JSON.stringify(setBookmarkTrue))

}

export default createBookmark;

