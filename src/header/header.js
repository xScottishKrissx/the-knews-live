import React from 'react';
import './header.css';

import {Link} from 'react-router-dom';

export const Header = () => {
    
    return (
        <div id="header" className='header-container'>
            <div className="header-wrapper">
             <span className="brand"><Link id="header-text" to="/">theKnews</Link></span>
            </div>
        </div>
    )
}

export default Header;