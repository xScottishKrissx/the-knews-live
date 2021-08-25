import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
// styles in navbar.css

export const Reload = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.reload === true ?
            <div className="uiBarItem" title="Force Reload" id="reloadBtn">
                <Button title="Update Page">
                <span onClick={props.forceReload}>
                    <span class="material-icons">refresh</span>
                    {/* <p className="navButtonText">Refresh</p> */}
                </span>
                </Button>
            </div>
        :
            null
        }
    </>
)
}

export default Reload;