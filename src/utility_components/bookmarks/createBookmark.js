import '../bookmarks/createBookmark.css';

export const createBookmarks = (id) =>{
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
}

export default createBookmarks;

