import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CustomCardSize from '../../utility_components/cardStyle/cardStyle';
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
                             {/* <i class="bi bi-grid-3x3"></i> */}
                            {props.cardStyle.includes("Slim") ?  <i class="bi bi-view-list"></i> : null}
                            {props.cardStyle.includes("Compact") ?  <i class="bi bi-grid-3x2"></i> : null}
                            {props.cardStyle.includes("Standard") ?  <i class="bi bi-grid-3x3"></i> : null}
                            {props.cardStyle.includes("Long") ?  <i class="bi bi-grid-1x2"></i> : null}
                            {props.cardStyle.includes("Thick") ?   <i class="bi bi-layout-split"></i> : null}
                            {props.cardStyle.includes("Big Squares") ?  <i class="bi bi-grid"></i> : null}
                            {/* <p>{props.cardStyle}</p> */}
                        </div>
                    }>
                    <CustomCardSize 
                        getCardSizeToParent={props.getCardSize} 
                        updatePageLayout={props.getPageLayout}
                    />
                </DropdownButton>
            </div>
        :
            null
        }
    </>
)
}

export default CardStyleButton;