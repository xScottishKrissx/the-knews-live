import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link } from 'react-router-dom';
import BookmarkOptionsMenu from '../../../utility_components/bookmarks/bookmarkOptionsMenu';
import OptionsMenu from '../../../utility_components/optionsMenu/optionsMenu';


// styles in navbar.css

export const BookmarkOptionsMenuButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showBookmarkOptionsMenu === true ?

            <div className="uiBarItem" id="bookmarkOptionsMenu">
            <DropdownButton 
                title={
                    <div className="dropdownBtnTitle">
                            <span className="material-icons">settings</span> 
                            {/* <p>Options </p> */}
                            {/* <span> ({this.props.bookmarkNumber})</span> */}
                    </div>
                }>
                    <OptionsMenu 
                        clearBookmarks={props.clearBookmarks}
                        currentCardArray={props.currentCardArray}
                        markAllUnread={props.markAllUnread} 
                        markAllRead={props.markAllRead} 
                        hideAllArticles={props.hideAllArticles}
                    />
                </DropdownButton>
            </div>

        :

            null    

        }
    </>
)
}

export default BookmarkOptionsMenuButton;