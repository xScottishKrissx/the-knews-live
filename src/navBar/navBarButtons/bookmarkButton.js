import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link } from 'react-router-dom';
// styles in navbar.css

export const BookmarkButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showBookmarkButton === true ?                            
            <div className="uiBarItem" title="View Bookmarks">
                <Link 
                    to={{ 
                        pathname:'/theKnews/home/bookmarks', 
                        state:{ fullDatabaseCall:props.fullDatabaseCall}
                    }}
                >

                    <DropdownButton  
                        id="bookmarkBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <span className="material-icons">bookmarks</span>
                                <p>Bookmarks<span className="bookmarkCounter">{props.bookmarkCounter}</span></p>
                            </div>
                        }> 
                    </DropdownButton>
                </Link> 
            </div>
        :
            null
        }
    </>
)
}

export default BookmarkButton;