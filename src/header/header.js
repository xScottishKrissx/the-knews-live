import React from 'react';
import './header.css';

import {Link} from 'react-router-dom';

export const Header = () => {
    return (
        <div id="header" className='header-container'>
            <div className="header-wrapper">
                <div className="nav-controls">
                    <span className="brand"><Link to="/theKnews/home">the Knews</Link></span>
                    <div className="nav-icons back-button"><Link to='/theKnews' ><p className="large material-icons">arrow_back</p></Link></div>
                    <div className="nav-icons home-button"><Link to='/theKnews' ><p className="large material-icons">home</p></Link></div>
                    <div className="nav-icons next-button"><Link to='/theKnews' ><p className="large material-icons">arrow_next</p></Link></div>
                </div>
                
                {/* <nav>
                    <ul>
                        <li>
                            <Link to="/theKnews/home">the Knews</Link>
                        </li>

                        <li>
                            <Link to="/theKnews">categories</Link>
                        </li>

                        <li>
                            <Link to="/theKnews">filters</Link>
                        </li>

                        <li>
                            <Link to="/theKnews/myKnews">my Knews</Link>
                        </li>
                    </ul>
                </nav> */}
            </div>
        </div>
    )
}

// export class Header extends React.Component{
//     render(){
//         return(
//             <div id="header" className='header-container'>

//                 <span className="brand">the Knews</span>
                
//                 <nav>                    
//                     <ul>
//                         <li> <Link to="/theKnews">theKnews</Link></li>
//                         <li>Categories</li>
//                         <li>Filters</li>
//                         <li>Sign In / Register</li>
//                     </ul>
//                 </nav>

//             </div>
//         )
//     }
// }

export default Header;