import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import OnCardBookMarkControls from '../../utility_components/bookmarks/onCardBookmarkControls';
// styles in navbar.css



export const BookmarkControlButtons = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showBookmarkControlButtons === true ?
        <div className="uiBarItem" id="bookmarkControls">
            {/* <span>jefefb</span> */}
            <Button title="Bookmark article" >
                <OnCardBookMarkControls 
                    bookmarkedStatus={props.bookmarkedStatus}
                    fullDatabaseCall={props.fullDatabaseCall}
                    id={props.id}
                    readStatus={props.readStatus}
                    showMarkAsReadButton={props.showMarkAsReadButton}
                    arrayFromDatabase={props.arrayFromDatabase}
                    leftoverArticles={props.leftoverArticles}

                    hidePressed={props.hidePressed}
                    updateProp={props.updateArticle}
                />
            </Button>
        </div> 
        :
        null       
        }
    </>
)
}

export default BookmarkControlButtons;