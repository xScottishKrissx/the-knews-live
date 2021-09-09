export const clearAllBookmarks = () =>{
        console.log("Clear All Bookmarks")
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        if(database){
                const clearAllBookmarks = database.map(el => {
                if(el.bookmarked === true && el != null )
                        return Object.assign({}, el, {bookmarked:false})
                        return el
                });
                console.log(clearAllBookmarks)
                localStorage.setItem("bookmarkArray", JSON.stringify(clearAllBookmarks))
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(clearAllBookmarks))
                console.log("Bookmarks Cleared")
        }
        else{console.log("No Bookmarks to Clear")}
}

export default clearAllBookmarks;

