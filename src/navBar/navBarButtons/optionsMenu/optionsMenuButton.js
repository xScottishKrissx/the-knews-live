import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link } from 'react-router-dom';
import OptionsMenu from '../../../utility_components/optionsMenu/optionsMenu';
// styles in navbar.css



export const OptionsMenuButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showOptionsMenuButton === true ?
            <div className="uiBarItem" title="Settings" id="settingsDropdown">
                <DropdownButton 
                    id="settingsBtn" 
                    title={ <span className="material-icons">settings</span>}>
                    <OptionsMenu urlInfo={window.location.pathname}/>
                </DropdownButton>
            </div>
        :
            null
        }
    </>
)
}

export default OptionsMenuButton;