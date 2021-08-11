import React from 'react';
import ArticleInformation from '../../news-page/news-page-view/article-area/articleInformation/articleInformation';
import MarkAsRead from '../bookmarks/markAsReadV2';
import HeaderImage from '../header-image/header-image';
import ParseHTML from '../parse-database-html/parse-html';

export class LiteKnewsView extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {}
    }
    componentDidMount(){
        MarkAsRead(this.props.id,this.props.readStatus)        
    }
    
    render(){
        const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};

        return(
                                
        <div className="liteKnewsArticleContainer">

            <header>
                <HeaderImage props={this.props.id}/>
                <h1>{this.props.title}</h1>
                {this.props.bookmarkedStatus === true ? 
                    <p>True</p>
                    :
                    <p>False</p>
                }
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