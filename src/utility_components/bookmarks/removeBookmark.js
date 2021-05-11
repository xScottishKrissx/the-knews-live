export const removeBookmark = (id) =>{
        console.log("Bookmark "+ id +" removed")
        // console.log("Mark " + id + " as read")

        const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkArray"));

        var setBookmarkFalse = currentBookmarks.map(el => {
            if(el.id === id && el != null )
                return Object.assign({}, el, {bookmarked:false})
                return el
        });

        localStorage.setItem("bookmarkArray", JSON.stringify(setBookmarkFalse))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(setBookmarkFalse))
        document.getElementById(id + "bookmarkIcon").classList.remove('bookmarkStyle')
        // document.getElementById(id).classList.add('markAsRead')
        // console.log(JSON.parse((localStorage.getItem("bookmarkArray"))))
}

export default removeBookmark;

