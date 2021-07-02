import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CustomCardSize from '../../utility_components/custom-tile-size/custom-card-sizeV2';


export const CardStyleButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.cardStyleButtonOn === true ?  
            <div className="uiBarItem" title="Change Card Size" id="changeCardSizeDropdown">
                <DropdownButton 
                    id="changeCardBtn" 
                    title={ 
                        <div className="dropdownBtnTitle">
                            <span className="material-icons">view_module</span>
                            <p>{props.cardStyle}</p>
                        </div>
                    }>
                    <CustomCardSize getCardSizeToParent={props.getCardSize} />
                </DropdownButton>
            </div>
        :
            null
        }
    </>
)
}

export default CardStyleButton;