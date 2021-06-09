import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import BookmarkOptionsMenu from '../utility_components/bookmarks/bookmarkOptionsMenu';
import CustomCardSize from '../utility_components/custom-tile-size/custom-card-sizeV2';
import FilterOptions from '../utility_components/filterOptions/filterOptions';
import OptionsMenu from '../utility_components/optionsMenu/optionsMenu';
import HandleLike from "../utility_components/handleSocialScore/handleLike";


import './navBar.css'
import OnCardBookMarkControls from '../utility_components/bookmarks/onCardBookmarkControls';

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


        return(
<div className="headerWrapper">

    <div className="headerText"><Link to='/theKnews/home'><span>theKnews</span></Link></div>
    
    <div className="navWrapper">     
        <div className="newUIBarWrapper">

    {/************Bookmark Options Menu  */}
                {this.props.bookmarked === true ?

                    <div className="uiBarItem" id="bookmarkOptionsMenu">
                    <DropdownButton 
                        title={
                            <div className="dropdownBtnTitle">
                                    <span class="material-icons">bookmarks</span> 
                                    <p>Bookmarks </p>
                                    <span> ({this.props.bookmarkNumber})</span>
                            </div>
                        }>
                            <BookmarkOptionsMenu 
                                clearBookmarks={this.props.clearBookmarks}
                                markAllUnread={this.props.markAllUnread} 
                                markAllRead={this.props.markAllRead} 
                                hideAllArticles={this.props.hideAllArticles}
                            />
                        </DropdownButton>
                    </div>
                :
                    null    
                }

    {/************Score Buttons  */}
    {this.props.score === false ?
        null
        :
        <div className="uiBarItem" id="scoreButtons">
        <Button title="Score" >
                {/* <div className="dropdownBtnTitle">
                    <span class="material-icons">score</span> 
                    <p>Score </p>
                </div> */}
                <HandleLike 
                    id={this.props.id}
                    likes={this.props.likes}
                    dislikes={this.props.dislikes}
                    databaseId={this.props.databaseId}
                    liked={this.props.liked}
                    disliked={this.props.disliked}
                />
        </Button>
        </div> 
    }

        {/************Score Buttons  */}
        {this.props.bookmarkControls === false ?
        null
        :
        <div className="uiBarItem" id="bookmarkControls">
        <Button title="Bookmark Controls" >
                {/* <div className="dropdownBtnTitle">
                    <span class="material-icons">score</span> 
                    <p>Score </p>
                </div> */}
        <OnCardBookMarkControls 
                            bookmarkedStatus={this.props.bookmarkedStatus}
                            fullDatabaseCall={this.props.fullDatabaseCall}
                            id={this.props.id}
                            readStatus={this.props.readStatus}
                            showMarkAsReadButton={this.props.showMarkAsReadButton}
                            arrayFromDatabase={this.props.arrayFromDatabase}
                            leftoverArticles={this.props.leftoverArticles}
        />
        </Button>
        </div> 
    }



    {/************** Filter */}        
    <div id="siteWideNavBar">  

    {/************ Home Button */}
                    <div className="uiBarItem" title="Return Home" id="homeBtn">
                        <Button title="Home">
                            <Link to='/theKnews/home'>
                            <div className="dropdownBtnTitle">
                                <span class="material-icons">home</span>
                                <p>Home</p>
                            </div>
                            </Link>
                        </Button>
                    </div>

                {this.props.filter === false ?
                null
                :    
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
                                    bookmarked={false}
                                />
                            }
                        </DropdownButton>
                    </div>
                }


                

    {/************** Card Size */}
                    {this.props.cardStyle === false ?
                    null
                    :    
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
                }






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
                    {this.props.options === false ?
                    null
                    :    
                    <div className="uiBarItem" title="Settings" id="settingsDropdown">
                        <DropdownButton 
                            id="settingsBtn" 
                            title={ <span class="material-icons">settings</span>}>
                            <OptionsMenu urlInfo={window.location.pathname}/>
                        </DropdownButton>
                    </div>
                    }

                </div>
                    




    </div>
</div>
</div>
        )
    }
    
}

export default NavBar;