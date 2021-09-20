import React from 'react';
import './ClearCache.css'

import {Link} from 'react-router-dom';

export class ClearCache extends React.Component{

    clearCache(){
        localStorage.removeItem("editedArticleArray")
        localStorage.removeItem("filterOption")
        localStorage.removeItem("changedFullDatabaseCall")
        localStorage.removeItem("cleanDatabaseCall")
        localStorage.removeItem("cardStyleSetting")
        localStorage.removeItem("myData")
        
       
                
        // window.location.reload();
    }

    render(){
        return (
            // <button onClick={()=> this.clearCache()} id="clearCache">Unhide All</button>
            <div>            
            <Link to='/' onClick={()=> this.clearCache()}>
                <button id="clearCache"><span className="material-icons">
restart_alt
</span></button>
             </Link>
             </div>

        );
    }
}

export default ClearCache;

// Things that have been set

// articlesArray
// hiddenPosts
// myData
// CardStyleSetting
// savedCardOptionsPosition
// DarkMode (Disabled)
// 