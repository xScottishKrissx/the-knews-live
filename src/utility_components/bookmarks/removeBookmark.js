import '../bookmarks/removeBookmark.css';

export const removeBookmark = (id) =>{
        // console.log("Mark " + id + " as read")

        const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkArray"));

        var setBookmarkFalse = currentBookmarks.map(el => {
            if(el.id === id && el != null )
                return Object.assign({}, el, {bookmarked:false})
                return el
        });

        localStorage.setItem("bookmarkArray", JSON.stringify(setBookmarkFalse))
        
        document.getElementById(id).classList.add('markAsRead')
}

export default removeBookmark;

