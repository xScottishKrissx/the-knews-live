import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
// styles in navbar.css

export const LiteKnewsButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showLiteKnewsButton === true ? 
            <div className="uiBarItem" title="Start Lite Knews" onClick={props.showArticle} >
                <DropdownButton 
                    id="liteKnewsBtn" 
                    title={ 
                        <div className="dropdownBtnTitle">
                            <span className="material-icons">bolt</span>
                            {/* <p>liteKnews</p> */}
                        </div>
                    }>                        
                </DropdownButton>
            </div>
        :
            null
        }
    </>
)
}

export default LiteKnewsButton;