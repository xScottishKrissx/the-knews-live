import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

export const HomeBtn = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.homeButtonOn === true ?
            <div className="uiBarItem" title="Return Home" id="homeBtn">
                <Button title="Home">
                    <Link to='/theKnews/home'>
                    <div className="dropdownBtnTitle">
                        <span className="material-icons">home</span>
                        <p>Home</p>
                    </div>
                    </Link>
                </Button>
            </div>
        :
            null
        }
    </>
)
}

export default HomeBtn;