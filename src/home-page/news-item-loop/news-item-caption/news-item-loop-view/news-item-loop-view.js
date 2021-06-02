import React from 'react';
import {Link} from 'react-router-dom';

import '../news-item-loop-view/news-item-loop-view.css';

import CustomCardSize from '../../../../utility_components/custom-tile-size/custom-card-sizeV2.js';
import FilterOptions from '../../../../utility_components/filterOptions/filterOptions';
import LiteKnews from '../../../../utility_components/liteKnews/liteKnews';
import RenderCard from '../../../../utility_components/renderCard/renderCard';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import updateBookmarkStyles from '../../../../utility_components/bookmarks/updateBookmarkStyle';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import SplitButton from 'react-bootstrap/SplitButton'
import OptionsMenu from '../../../../utility_components/optionsMenu/optionsMenu';

class NewsItemLoopView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{
            width: JSON.parse(localStorage.getItem("myData"))[0] ,
            height: JSON.parse(localStorage.getItem("myData"))[1]
        },
        postsArray:[],

        //hiding articles for filter views
        getArticleBy:"All",
        renderArray:[],
        
        // liteKnews
        showArticle:false,
        renderLiteKnews: JSON.parse(localStorage.getItem("changedFullDatabaseCall")),

        }
        // Card Size Controls
        this.getCardSize = this.getCardSize.bind(this);
        // liteKnews
        this.closeLiteKnewsView = this.closeLiteKnewsView.bind(this);        
    }



componentDidUpdate(){
    updateBookmarkStyles();
}
componentDidMount(){

}
// Card Size Controls
getCardSize(width,height){this.setState({startingCardSize:{width:width,height:height}})}

// LiteKnews
    showArticle(){
        this.setState({
            showArticle:true,
            renderLiteKnews: JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.renderArray
        })
    }
    closeLiteKnewsView(){
        this.setState({ 
            showArticle:false,
            renderArray: JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.renderArray })
        // window.location.reload()
    }

// filterViews
    getFilteredArticles = (filteredByTag,getArticleBy) => {
        this.setState({
            renderArray: filteredByTag,
            getArticleBy:getArticleBy,
        })
}

        handleMenu(x){
            console.log("Show Menu")
            document.getElementById(x).classList.add("showMenu")
        }
    render(){  
        const renderToPage = this.state.renderArray.slice(0,30) || this.props.databaseProp ;
        const thing = renderToPage[this.state.articleNumber] || renderToPage[0];

        return(
            
            <div className="newsItemLoopViewWrapper">
            
            {this.state.showArticle === true ?
                <LiteKnews 
                    renderToPage={this.state.renderLiteKnews}
                    closeLiteKnews={()=>this.closeLiteKnewsView()} 

                    
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    />
            :
            <div id="cardArea"> 
                <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles}/>

                {/* New UI */}
                <div className="newUIBarWrapper">
                
                <div className="uiBarItem" title="Filter By Tag" id="filterDropdown">
                        <DropdownButton 
                            id="filterBtn" 
                            title={ 
                                <div className="dropdownBtnTitle">
                                    {/* <span class="material-icons">local_offer</span> */}
                                    {/* <p>Filter</p> */}

                                    <div id="filterOptionDisplay">
                                        {this.state.getArticleBy === "All" ? 
                                            // <p>Displaying<span>{this.state.getArticleBy}</span> Articles</p>
                                            <span>
                                                <span class="material-icons">filter_alt</span>
                                                <p>Filter</p>
                                            </span>                                           
                                            :
                                            // <p>Displaying {renderToPage.length + " "}<span>{ this.state.getArticleBy}</span> Articles</p>
                                            <span>
                                                <span id="filterActive" class="material-icons">filter_alt</span>
                                                <p className="filterIsActive">Filter: { this.state.getArticleBy}</p>
                                            </span>
                                            
                                        }

                                    </div>
                                </div>
                            }>
                            <FilterOptions fullDatabaseCall={this.props.fullDatabaseCall} getFilteredArticles = {this.getFilteredArticles}/>
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

                {this.props.databaseProp.length >= 30 && thing ? 
                // The Cards themselves...
                 <RenderCard
                    database={renderToPage}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    postsArray={this.state.postsArray}
                    arrayFromDatabase={this.props.databaseProp} 
                    leftoverArticles={this.props.leftoverArticles}  
                    fullDatabaseCall={this.props.fullDatabaseCall}
                    showArticle={() => this.showArticle(renderToPage[this.state.articleNumber].id)}          
                 />
                :
                <p>Something has gone wrong. Contact your nearest guardian of the light</p> 
                }
               
                {this.state.getArticleBy === "All" ?
                //  Infinite Scroll
                    <ScrollCheckV2 
                        articlesArray={this.props.databaseProp}
                        startingCardSize={this.state.startingCardSize}
                        changedCardSize={this.state.changedCardSize}
                        leftoverArticles={this.props.leftoverArticles}
                        getArticleBy={this.state.getArticleBy}
                        fullDatabaseCall={this.props.fullDatabaseCall}

                        
                    />   
                    
                    
                :
                // <img alt="now loading" src={loading} />
                <p>No more articles to show. Refresh the page or check again later for more Knews.</p>
                }       
            </div>
            }
            </div>
        )        
    }
}

export default NewsItemLoopView;