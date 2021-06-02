import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Link } from 'react-router-dom';
import CustomCardSize from '../utility_components/custom-tile-size/custom-card-sizeV2';
import FilterOptions from '../utility_components/filterOptions/filterOptions';
import OptionsMenu from '../utility_components/optionsMenu/optionsMenu';

import './navBar.css'

export class NavBar extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div className="newUIBarWrapper">
                
            <div className="uiBarItem" title="Filter By Tag" id="filterDropdown">
                    <DropdownButton 
                        id="filterBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                {/* <span class="material-icons">local_offer</span> */}
                                {/* <p>Filter</p> */}

                                <div id="filterOptionDisplay">
                                    {this.props.getArticleBy === "All" ? 
                                        // <p>Displaying<span>{this.props.getArticleBy}</span> Articles</p>
                                        <span>
                                            <span class="material-icons">filter_alt</span>
                                            <p>Filter</p>
                                        </span>                                           
                                        :
                                        // <p>Displaying {renderToPage.length + " "}<span>{ this.props.getArticleBy}</span> Articles</p>
                                        <span>
                                            <span id="filterActive" class="material-icons">filter_alt</span>
                                            <p className="filterIsActive">Filter: { this.props.getArticleBy}</p>
                                        </span>
                                        
                                    }

                                </div>
                            </div>
                        }>
                        <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.props.getFilteredArticles}/>
                    </DropdownButton>
                </div>

                <div className="uiBarItem" title="Change Card Size" id="changeCardSizeDropdown">
                    <DropdownButton 
                        id="changeCardBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <span class="material-icons">view_module</span>
                                <p>Card Style</p>
                            </div>
                        }>
                        <CustomCardSize getCardSizeToParent={this.getCardSize} />
                    </DropdownButton>
                </div>

                {/* <div class="uiBarDivider"> | </div> */}
                
                <div className="uiBarItem" title="Start Lite Knews" onClick={() => this.showArticle()} >
                    <DropdownButton 
                        id="liteKnewsBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <span class="material-icons">bolt</span>
                                <p>liteKnews</p>
                            </div>
                        }>
                        {/* DropDown Content */}
                        <h1>Content</h1>
                    </DropdownButton>
                </div>


                <div className="uiBarItem" title="View Bookmarks">
                <Link to={{ pathname:'home/bookmarks', state:{ fullDatabaseCall:this.props.fullDatabaseCall}}}>
                    <DropdownButton  
                        id="bookmarkBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <span class="material-icons">bookmarks</span>
                                <p>Bookmarks</p>
                            </div>
                        }> 
                    </DropdownButton>
                </Link> 
                </div>


                <div className="uiBarItem" title="Settings" id="settingsDropdown">
                    <DropdownButton 
                        id="settingsBtn" 
                        title={ <span class="material-icons">settings</span>}>
                        <OptionsMenu urlInfo={window.location.pathname}/>
                    </DropdownButton>
                </div>
                
            </div>
        )
    }
}

export default NavBar;