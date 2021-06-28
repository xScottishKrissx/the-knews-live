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
        // console.log(this.props.bookmarkedStatus)
        // console.log(this.props.readStatus)
        // console.log(this.props.id)
        return(
                                
        <div className="speedKnewsArticleContainer">

            <header>
                
                <HeaderImage props={this.props.id}/>
                <h1>{this.props.title}</h1>
                {/* <h3>by: {this.props.author}</h3> */}

                
                {/* <span>Read: {this.props.readStatus.toString()}</span> */}
                {/* <Link                 
                    to={{
                        pathname:'/theKnews/home/articles/news-page/' + this.props.id,
                        state:{ articleId:this.props.id}
                    }}>
                    <h3>View Article Page</h3>
                </Link> */}
                    
                {/* <p>{this.props.text}</p> */}
            </header>

            <ArticleInformation                 
                // Tag 
                tag={this.props.tag}
                // Author
                author={this.props.author}
                arrayFromDatabase={this.props.arrayFromDatabase}
                leftoverArticles={this.props.leftoverArticles}
                fullDatabaseCall={this.props.fullDatabaseCall}
                // PostDate
                postdate={this.props.postdate}
            />

            <article><ParseHTML props={this.props.text}/></article>
            

        </div>
        )
    }
}

export default LiteKnewsView;