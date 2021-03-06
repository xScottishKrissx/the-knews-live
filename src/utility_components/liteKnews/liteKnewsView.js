// import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleInformation from '../../news-page/news-page-view/article-area/articleInformation/articleInformation';
import MarkAsRead from '../bookmarks/markAsRead';
// import OnCardBookMarkControls from '../bookmarks/onCardBookmarkControls';
import HeaderImage from '../header-image/header-image';
import ParseHTML from '../parse-database-html/parse-html';


export class LiteKnewsView extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        // console.log("Mark " + this.props.id + " as read")
        MarkAsRead(this.props.id,false)
        
    }
    // onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
    
    render(){
        const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};
        // console.log(this.props.bookmarkedStatus)
        // console.log(this.props.readStatus)
        // console.log(this.props.id)
        // console.log(this.props.nextArticleTitle)
        // console.log(this.props.prevArticleTitle)
        return(
                                
        <div className="speedKnewsArticleContainer">
            <div className="boxShadow"></div>

                {/* <div className="swipePreviewWrapper">
                    {this.props.prevArticleTitle === undefined ?
                        <div>
                            <span class="material-icons">touch_app</span>
                            <p><span>Next: </span>{this.props.nextArticleTitle.title}</p>
                        </div>
                    :
                        <div>
                            <p><span>Previous: </span> {this.props.prevArticleTitle.title}</p>
                            <span class="material-icons">touch_app</span> 
                            <p><span>Next: </span> {this.props.nextArticleTitle.title}</p>
                        </div>
                    }
                </div> */}

            <header>
                <HeaderImage props={this.props.id}/>
                <h1>{this.props.title}</h1>
            </header>      
            
            <ArticleInformation                 
                // Tag 
                tag={this.props.tag || "placeholderTag"}
                // Author
                author={this.props.author}
                arrayFromDatabase={this.props.arrayFromDatabase}
                leftoverArticles={this.props.leftoverArticles}
                fullDatabaseCall={this.props.fullDatabaseCall}
                // PostDate
                postdate={this.props.postdate}
            />
            
            <article><ParseHTML props={this.props.text}/></article>
                            <div className="swipePreviewWrapper" style={setRandomColour}>
                    {this.props.prevArticleTitle === undefined ?
                        <div>
                            <span class="material-icons">touch_app</span>
                            <p><span>Next: </span>{this.props.nextArticleTitle.title}</p>
                        </div>
                    :
                        <div>
                            <p><span>Previous: </span> {this.props.prevArticleTitle.title}</p>
                            <span class="material-icons">touch_app</span> 
                            <p><span>Next: </span> {this.props.nextArticleTitle.title}</p>
                        </div>
                    }
                </div>

        </div>
        )
    }
}

export default LiteKnewsView;