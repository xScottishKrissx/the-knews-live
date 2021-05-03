import '../bookmarks/createBookmark.css';

export const createBookmark = (id) =>{
    document.getElementById(id).classList.add('bookmarkStyle')
    // document.getElementById("articlePopupBackground"  + id).style.display = "block";
    // document.body.style.overflow = "hidden";      
    console.log("Add " + id + " to bookmarks") 






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
    const database = JSON.parse(localStorage.getItem("cleanDatabaseCall"))
    const editedArray = JSON.parse(localStorage.getItem("editedArticleArray"));
    const mainArray = editedArray || database;
    console.log(database)

    var markArticleForRemoval = database.map(el => {
        if(el.id === id && el != null )
            return Object.assign({}, el, {bookmarked:true})
            return el
    });

    const bookmarkArray = markArticleForRemoval.filter(obj => obj.bookmarked === true);
    const thing = JSON.parse(localStorage.getItem("bookmarkArray")) || []
    thing.push(bookmarkArray[0])
    console.log(thing)
    
    // remove duplicates
    const filterForDuplicate2 = Array.from(new Set(thing))
    console.log(filterForDuplicate2)
    
    localStorage.setItem("bookmarkArray", JSON.stringify(thing));
    console.log(JSON.parse(localStorage.getItem("bookmarkArray")))
}

export default createBookmark;

