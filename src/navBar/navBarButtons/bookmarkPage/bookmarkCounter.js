import React from 'react';

export const BookmarkCounter = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.bookmarked === true ?
        <div className="uiBarItem" id="bookmarkCountIndicator">
            <div>
                {props.bookmarkNumber === 1 ?
                    <p> {props.bookmarkNumber} Bookmark</p>
                :
                    <p> {props.bookmarkNumber} Bookmarks</p>
                }
            </div>
        </div> 

        :
        null
        }
    </>
)
}

export default BookmarkCounter;