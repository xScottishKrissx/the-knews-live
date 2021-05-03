import '../bookmarks/createBookmark.css';

export const createBookmark = (id,database) =>{
    document.getElementById(id).classList.add('bookmarkStyle')
    // document.getElementById("articlePopupBackground"  + id).style.display = "block";
    // document.body.style.overflow = "hidden";      
    console.log("Add " + id + " to bookmarks")
    console.log(database)





    // Set initial array
    var arrayThing = JSON.parse(localStorage.getItem("bookmarks")) || []
    // Push card to array
    arrayThing.push(id);

    // remove duplicates
    const filterForDuplicate = Array.from(new Set(arrayThing))
    console.log(filterForDuplicate)

    // push array to localstorage for use elsewhere
    localStorage.setItem("bookmarks", JSON.stringify(filterForDuplicate));
    console.log(localStorage.getItem("bookmarks"))



    // 
    // const cleanDB = JSON.parse(localStorage.getItem("cleanDatabaseCall"))
    const cleanDB = database
        console.log(cleanDB)
    const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkArray"));
        console.log(currentBookmarks)
    const mainArray = currentBookmarks || cleanDB;
    

    var setBookmarkTrue = mainArray.map(el => {
        if(el.id === id && el != null )
            return Object.assign({}, el, {bookmarked:true})
            return el
    });
    console.log(setBookmarkTrue)
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(setBookmarkTrue))
    localStorage.setItem("bookmarkArray", JSON.stringify(setBookmarkTrue))

    console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))
    console.log(JSON.parse(localStorage.getItem("bookmarkArray")))


    // const bookmarkArray = setBookmarkTrue.filter(obj => obj.bookmarked === true);
    // console.log(bookmarkArray)

    // const thing = JSON.parse(localStorage.getItem("bookmarkArray")) || []
    // thing.push(bookmarkArray[0])
    // console.log(thing)

    // // remove duplicates
    // const filterForDuplicate2 = Array.from(new Set(thing))
    // console.log(filterForDuplicate2)
    
    // localStorage.setItem("bookmarkArray", JSON.stringify(thing));
    // console.log(JSON.parse(localStorage.getItem("bookmarkArray")))
}

export default createBookmark;

