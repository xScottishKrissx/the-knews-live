import React from 'react';
import './header.css';

import {Link} from 'react-router-dom';
import TagBar from '../tags/tag-bar';


export const Header = () => {
    
    return (
        <div id="header" className='header-container'>
            <div className="header-wrapper">
            <span className="brand"><Link id="header-text" to="/theKnews/home">theKnews</Link></span>
            {/* <DarkModeToggle /> */}
            
            <TagBar />
                {/* <div className="nav-controls">
                <span className="brand"><Link to="/theKnews/home">the Knews</Link></span>
                <span className="icons-wrapper">
                        <div className="nav-icons home-button"><Link to='/theKnews' ><p className="large material-icons">home</p><span>Home</span></Link></div>
                        <div className="nav-icons back-button"><Link to='/theKnews' ><p className="large material-icons">arrow_back</p><span>Prev Article</span></Link></div>
                        <div className="nav-icons next-button"><Link to='/theKnews' ><p className="large material-icons">arrow_forward</p><span>Next Article</span></Link></div>
                </span>
                </div> */}
            </div>
        </div>
    )
}

export class HeaderStyle extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            style: "",            
        }
    }
    
    render(){
        return(
            <p>Thing</p>
        )
    }
}

export default Header;