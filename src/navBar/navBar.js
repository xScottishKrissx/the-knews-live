import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/esm/Button';
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
        // console.log(this.state.getArticleBy)
        // console.log(this.props.getArticleBy)
        const getArticle = this.props.getArticleBy || "All";
        // const getArticle = "All"
        console.log(this.props.bookmarkArray)
        return(
            <div className="newUIBarWrapper">






{/************** Filter */}        
<div id="siteWideNavBar">  
            <div className="uiBarItem" title="Filter By Tag" id="filterDropdown">
                    <DropdownButton 
                        id="filterBtn" 
                        title={ 
                            <div className="dropdownBtnTitle">
                                <div id="filterOptionDisplay">
                                    {getArticle === "All" ?                                         
                                        <span>
                                            <span className="material-icons">filter_alt</span>
                                            <p>No Filter</p>
                                        </span>                                           
                                        :                                   
                                        <span>
                                            <span id="filterActive" class="material-icons">filter_alt</span>
                                            <p className="filterIsActive">Filter: { getArticle }</p>
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



            {this.props.bookmarked === true ?
                <div id="bookmarkUIBar" >
                    {/* <div className="uiBarItem">Bookmarks</div> */}
                    {/* <div className="uiBarItem" id="pageHeader"><h2>Bookmarks {this.props.bookmarkNumber}</h2></div> */}
                    <div className="uiBarItem" title="Remove All Bookmarks" onClick={this.props.clearBookmarks}>
                        <Button variant="link"> 
                            <div className="navBarButton">
                                <span class="material-icons">bookmark_remove</span>
                                <p>Remove All Bookmarks</p>
                            </div>
                        </Button>
                    </div>

                    <div className="uiBarItem" title="Mark All Unread" onClick={this.props.markAllUnread}>
                        <Button variant="link"> 
                            <div className="navBarButton">
                                <span class="material-icons">remove_done</span>
                                <p>Mark All As Unread</p>
                            </div>
                        </Button>
                    </div>

                    <div className="uiBarItem" title="Mark All Read" onClick={this.props.markAllRead}>
                        <Button variant="link"> 
                            <div className="navBarButton">
                                <span class="material-icons">done_all</span>
                                <p>Mark All As Read</p>
                            </div>
                        </Button>
                    </div>

                    <div className="uiBarItem" title="Remove and Hide All" onClick={this.props.hideAllArticles}>
                        <Button variant="link"> 
                            <div className="navBarButton">
                                <span class="material-icons">delete_sweep</span>
                                <p>Remove and Hide All</p>
                            </div>
                        </Button>
                    </div>

                    {/* <div class="uiBarDivider"> | </div>  */}
                </div>
                 
            :
            null    
            }
</div>
        )
    }
    
}

export default NavBar;