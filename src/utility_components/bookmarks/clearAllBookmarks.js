import '../bookmarks/clearAllBookmarks.css';

export const clearAllBookmarks = () =>{
        
        const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))

        if(database){
                var clearAllBookmarks = database.map(el => {
                if(el.bookmarked === true && el != null )
                        return Object.assign({}, el, {bookmarked:false})
                        return el
                });

                localStorage.setItem("bookmarkArray", JSON.stringify(clearAllBookmarks))
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(clearAllBookmarks))
                console.log("Bookmarks Cleared")
        }
        else{console.log("No Bookmarks to Clear")}
}

export default clearAllBookmarks;

