import React from 'react';
import './header.css';

import {Link} from 'react-router-dom';

export const Header = () => {
    return (
        <div id="header" className='header-container'>
            <div className="header-wrapper">
                <span className="brand">the Knews</span>
                <nav>
                    <ul>
                        <li>
                            <Link to="/theKnews">the Knews</Link>
                        </li>

                        <li>
                            <Link to="/theKnews">categories</Link>
                        </li>

                        <li>
                            <Link to="/filters">filters</Link>
                        </li>

                        <li>
                            <Link to="/myKnews">my Knews</Link>
                        </li>
                    </ul>
                </nav>
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