import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CustomCardSize from '../../utility_components/custom-tile-size/custom-card-sizeV2';
// styles in navbar.css

export const CardStyleButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.cardStyleButtonOn === true ?  
            <div className="uiBarItem" title={"Current Card Style: " + props.cardStyle + ", click to change"} id="changeCardSizeDropdown">
                <DropdownButton 
                    id="changeCardBtn" 
                    title={ 
                        <div className="dropdownBtnTitle">
                            <span className="material-icons">view_module</span>
                            {props.cardStyle.includes("Standard") ? null : <p>{props.cardStyle}</p>}
                            {/* <p>{props.cardStyle}</p> */}
                        </div>
                    }>
                    <CustomCardSize getCardSizeToParent={props.getCardSize} updatePageLayout={props.getPageLayout}/>
                </DropdownButton>
            </div>
        :
            null
        }
    </>
)
}

export default CardStyleButton;