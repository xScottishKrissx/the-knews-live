export const removeBookmark = (id) =>{
        // console.log("Bookmark "+ id +" removed")
        // console.log("Mark " + id + " as read")

        const currentBookmarks = JSON.parse(localStorage.getItem("changedFullDatabaseCall"));

        const setBookmarkFalse = currentBookmarks.map(el => {
            if(el.id === id && el != null )
                return Object.assign({}, el, {bookmarked:false})
                return el
        });

        localStorage.setItem("bookmarkArray", JSON.stringify(setBookmarkFalse))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(setBookmarkFalse))
        if(document.getElementById(id + "bookmarkIcon")){
                document.getElementById(id + "bookmarkIcon").classList.remove('bookmarkStyle')
        }


}

export default removeBookmark;

