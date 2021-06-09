import Button from "react-bootstrap/esm/Button";


export const BookmarkOptionsMenu = (props) =>{
    return(
    <div id="bookmarkOptionsMenuDropdown">             


        <button onClick={props.clearBookmarks}><span class="material-icons">bookmark_remove</span>Remove All Bookmarks</button>
        <button onClick={props.clearBookmarks}><span class="material-icons">done_all</span>Mark All As Read</button>
        <button onClick={props.clearBookmarks}><span class="material-icons">remove_done</span>Mark All As Unread</button>
        <button onClick={props.clearBookmarks}><span class="material-icons">delete_sweep</span>Remove and Hide All</button>

        {/* <div className="" title="Remove All Bookmarks" onClick={props.clearBookmarks}>
            <Button variant="link"> 
                <div className="navBarButton">
                    <span class="material-icons">bookmark_remove</span>
                    <p>Remove All Bookmarks</p>
                </div>
            </Button>
        </div> 
        
        <div className="" title="Mark All Unread" onClick={props.markAllUnread}>
            <Button variant="link"> 
                <div className="navBarButton">
                    <span class="material-icons">remove_done</span>
                    <p>Mark All As Unread</p>
                </div>
            </Button>
        </div>

        <div className="" title="Mark All Read" onClick={props.markAllRead}>
            <Button variant="link"> 
                <div className="navBarButton">
                    <span class="material-icons">done_all</span>
                    <p>Mark All As Read</p>
                </div>
            </Button>
        </div>

        <div className="" title="Remove and Hide All" onClick={props.hideAllArticles}>
            <Button variant="link"> 
                <div className="navBarButton">
                    <span class="material-icons">delete_sweep</span>
                    <p>Remove and Hide All</p>
                </div>
            </Button>
        </div> */}
    </div>
    )
}

export default BookmarkOptionsMenu;