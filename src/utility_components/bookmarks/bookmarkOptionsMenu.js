export const BookmarkOptionsMenu = (props) =>{
    return(
    <div id="bookmarkOptionsMenuDropdown">            
        <button onClick={props.clearBookmarks}><span class="material-icons">bookmark_remove</span>Remove All Bookmarks</button>
        <button onClick={props.markAllRead}><span class="material-icons">done_all</span>Mark All As Read</button>
        <button onClick={props.markAllUnread}><span class="material-icons">remove_done</span>Mark All As Unread</button>
        <button onClick={props.hideAllArticles}><span class="material-icons">delete_sweep</span>Remove and Hide All</button>
    </div>
    )
}

export default BookmarkOptionsMenu;