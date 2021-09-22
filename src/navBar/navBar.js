import React from 'react';
import { Link } from 'react-router-dom';

import './navBar.css';

import HomeBtn from './navBarButtons/homeButton';
import BookmarkCounter from './navBarButtons/bookmarkPage/bookmarkCounter';
import FilterOptionsButton from './navBarButtons/filterOptionsButton';
import CardStyleButton from './navBarButtons/cardStyleButton';
import LiteKnewsButton from './navBarButtons/liteKnewsButton';
import BookmarkButton from './navBarButtons/bookmarkButton';
import OptionsMenuButton from './navBarButtons/optionsMenu/optionsMenuButton';
import ScoreButtons from './navBarButtons/articlePage/scoreButtons';
import BookmarkControlButtons from './navBarButtons/bookmarkControlButtons';
import LinkToArticleButton from './navBarButtons/liteKnews/linkToArticleButton';
import LiteKnewsControlButtons from './navBarButtons/liteKnews/liteKnewsControlButtons';
import ArticleNumber from './navBarButtons/tagsPage/articleNumber';
import TagPageTitle from './navBarButtons/tagsPage/tagPageTitle';
import Reload from './navBarButtons/reload';
import randomColour from '../utility_components/randomColour'
export class NavBar extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            headerColour:JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"}
        }
    }
    componentDidMount(){

    }


    render(){
        
        const getArticle = this.props.getArticleBy || "All";
        const cardStyle = localStorage.getItem("cardStyleChoice") || "Standard";

        return(
            <div className="headerWrapper">

                <div className="headerText" style={this.state.headerColour} onClick={this.props.closeLiteKnews}>
                    <Link to='/theKnews/home'>
                        <div>
                            <h1 >theKnews</h1>
                        </div>
                    </Link>
                </div>
                
                <div className="navWrapper">     
                    <div className="newUIBarWrapper">
                        <div id="siteWideNavBar">                          
                        
                            {/************ Home Button */}
                            <HomeBtn homeButtonOn={this.props.homeButtonOn}/>
                            
                            <Reload 
                                reload={this.props.reload}
                                forceReload={this.props.forceReload}
                            />
                            
                            {/************Bookmark Number Indicator  */}
                            <BookmarkCounter 
                                bookmarked={this.props.bookmarked} 
                                bookmarkNumber={this.props.bookmarkNumber}
                            />

                            {/************Filter Options  */}
                            <FilterOptionsButton 
                                filter={this.props.filter}
                                getArticle={getArticle}
                                bookmarked={this.props.bookmarked}
                                fullDatabaseCall={this.props.fullDatabaseCall}
                                getFilteredArticles={this.props.getFilteredArticles}
                                tagsArray={this.props.tagsArray}
                                filterCounter={this.props.getFilters}
                                currentCardCount={this.props.currentCardCount}
                                filterPage={this.props.filterPage}
                                
                                totalOverallActiveArticlesCount={this.props.totalOverallActiveArticlesCount}
                                // Tags
                                paramA={this.props.paramA}    
                                paramB={this.props.paramB}
                            />

                            {/************** Card Size */}
                            <CardStyleButton 
                                cardStyleButtonOn={this.props.cardStyle}
                                getCardSize={this.props.getCardSize}
                                cardStyle={cardStyle} 
                                
                                getPageLayout={this.props.getPageLayout}
                            />
    

                            {/************** Divider */}
                            {/* <div class="uiBarDivider"> | </div> */}

                            {/************** liteKnews */}
                            <LiteKnewsButton 
                                showLiteKnewsButton={this.props.liteKnews} 
                                showArticle={this.props.showArticle} 
                            />

                            {/************** Bookmarks */}
                            <BookmarkButton
                                showBookmarkButton={this.props.bookmarks}
                                fullDatabaseCall={this.props.fullDatabaseCall}
                                bookmarkCounter={this.props.bookmarkCounter}

                            />

                            {/************Score Buttons  */}
                            <ScoreButtons 
                                showScoreButtons={this.props.score}
                                id={this.props.id}
                                likes={this.props.likes}
                                dislikes={this.props.dislikes}
                                databaseId={this.props.databaseId}
                                liked={this.props.liked}
                                disliked={this.props.disliked}

                            />

                            {/************Bookmark Controls  */}
                            <BookmarkControlButtons
                                showBookmarkControlButtons={this.props.bookmarkControls}
                                bookmarkedStatus={this.props.bookmarkedStatus}
                                fullDatabaseCall={this.props.fullDatabaseCall}
                                id={this.props.id}
                                readStatus={this.props.readStatus}
                                showMarkAsReadButton={this.props.showMarkAsReadButton}
                                arrayFromDatabase={this.props.arrayFromDatabase}

                                hidePressed={this.props.hidePressed}
                                updateArticle={this.props.updateArticle}
                                hideStatus={this.props.hideStatus}
                                hideButtonSwitching={this.props.hideButtonSwitching}
                            />

                            {/************Article Link (liteKnews)  */}
                            <LinkToArticleButton
                                showLinkToArticleButton={this.props.articleLink}
                                id={this.props.id}

                            />

                            {/************liteKnews article controls  */}
                            <LiteKnewsControlButtons 
                                showLiteKnewsControls={this.props.liteKnewsControls}
                                prevArticle={this.props.prevArticle}
                                closeLiteKnews={this.props.closeLiteKnews}
                                nextArticle={this.props.nextArticle}
                                endOfLiteKnews={this.props.endOfLiteKnews}
                            />
                            {/************Tags  */}
                            <TagPageTitle 
                                showTagPageTitle={this.props.showTagPageTitle}
                                tagPageTitle={this.props.tagPageTitle}
                                tagPageTitle2={this.props.tagPageTitle2}
                            />
                            <ArticleNumber 
                                showArticleCounter={this.props.showArticleCounter} 
                                articleNumberCount={this.props.articleNumber}
                                />

                            {/************** Options Menu */}
                            <OptionsMenuButton 
                                showOptionsMenuButton={this.props.options}
                                currentCardArray={this.props.currentCardArray}
                                updateBookmarkStatus={this.props.updateBookmarkStatus}
                                fullDatabaseCall={this.props.fullDatabaseCall}
                            />
                            
                                
                        </div>

                    </div>
                </div>
            </div>
        )
    }
    
}

export default NavBar;