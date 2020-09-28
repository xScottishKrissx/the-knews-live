import React from 'react';
import {Link} from 'react-router-dom';
import '../utility_components/navControls.css';

export class NavControls extends React.Component{

    render(){
        return (
            <div className="nav-controls">
            <span className="icons-wrapper">
                    <div className="nav-icons home-button"><Link to='/theKnews' ><p className="large material-icons">home</p><span>Home</span></Link></div>
                    <div className="nav-icons back-button"><Link to='/theKnews' ><p className="large material-icons">arrow_back</p><span>Prev Article</span></Link></div>
                    <div className="nav-icons next-button"><Link to='/theKnews' ><p className="large material-icons">arrow_forward</p><span>Next Article</span></Link></div>
            </span>
            </div>
        )
    }
}



export default NavControls;