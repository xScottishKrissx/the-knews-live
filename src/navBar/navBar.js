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
        // console.log(this.props.fullDatabaseCall)
        // console.log(this.props.getArticleBy)
        return(
            <div className="newUIBarWrapper">






{/************** Filter */}          
            <div className="uiBarItem" title="Filter By Tag" id="filterDropdown">
                    <DropdownButton 
                        id="filterBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <div id="filterOptionDisplay">
                                    {this.props.getArticleBy === "All" ?                                         
                                        <span>
                                            <span class="material-icons">filter_alt</span>
                                            <p>No Filter</p>
                                        </span>                                           
                                        :                                   
                                        <span>
                                            <span id="filterActive" class="material-icons">filter_alt</span>
                                            <p className="filterIsActive">Filter: { this.props.getArticleBy}</p>
                                        </span>                                        
                                    }
                                </div>
                            </div>
                        }>
                        {this.props.bookmarked === true ? 
                            <FilterOptions 
                                fullDatabaseCall = {this.props.fullDatabaseCall} 
                                getFilteredArticles = {this.props.getFilteredArticles}
                                bookmarked={true}
                            />
                        :
                            <FilterOptions 
                                fullDatabaseCall = {this.props.fullDatabaseCall} 
                                getFilteredArticles = {this.props.getFilteredArticles}
                            />
                        }
                    </DropdownButton>
                </div>


























{/************** Card Size */}
                <div className="uiBarItem" title="Change Card Size" id="changeCardSizeDropdown">
                    <DropdownButton 
                        id="changeCardBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <span class="material-icons">view_module</span>
                                <p>Card Style</p>
                            </div>
                        }>
                        <CustomCardSize getCardSizeToParent={this.props.getCardSize} />
                    </DropdownButton>
                </div>

{/************** Divider */}
                {/* <div class="uiBarDivider"> | </div> */}

{/************** liteKnews */}
                {this.props.liteKnews === false ? 
                null
                :
                <div className="uiBarItem" title="Start Lite Knews" onClick={this.props.showArticle} >
                    <DropdownButton 
                        id="liteKnewsBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <span class="material-icons">bolt</span>
                                <p>liteKnews</p>
                            </div>
                        }>                        
                    </DropdownButton>
                </div>
                }

{/************** Bookmarks */}
                {this.props.bookmarks === false ?
                null
                :                
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
                }
{/************** Options Menu */}
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