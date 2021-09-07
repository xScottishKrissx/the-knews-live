export const Bookmark = (props) =>{
    
return (
    <>
        <div className="onCardBookmarkedButton">
            {props.bookmarked === false ? 
                <button title="Click to bookmark this article" onClick={props.handleClick}>
                    <span  class="material-icons" id={props.id + "bookmarkIcon"}>turned_in_not</span>                    
                </button>
                :
                <button title="Click to un-bookmark this article" className="animateScale" onClick={props.handleClick}>
                    <span class="material-icons increaseCardBookmarkOpacity" id={props.id + "bookmarkIcon"}>turned_in</span>              
                </button>   
            }
        </div>
    </>
)
}

export default Bookmark;