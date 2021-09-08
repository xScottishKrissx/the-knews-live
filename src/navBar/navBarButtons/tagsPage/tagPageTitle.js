import React from 'react';
// styles in navbar.css

export const TagPageTitle = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showTagPageTitle === true ?
            <div className="uiBarItem" id="tagPageTitle"> 
                <div>           
                {/* For Tags */}
                {props.tagPageTitle === "tag" ? <p>Tag: <strong>{props.tagPageTitle2}</strong></p> :null }

                {/* For Author */}
                {/* {props.tagPageTitle === "author" ? <p>Author: <strong>{props.tagPageTitle2}</strong></p> :null } */}
                </div>              
            </div>
        :
            null
        }
    </>
)
}

export default TagPageTitle;