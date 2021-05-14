import React from 'react';
import { Link } from 'react-router-dom';
import MarkAsRead from '../bookmarks/markAsRead';
import OnCardBookMarkControls from '../bookmarks/onCardBookmarkControls';
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
    render(){
        // console.log(this.props.bookmarkedStatus)
        // console.log(this.props.readStatus)
        // console.log(this.props.id)
        
        return(
                                
        <div className="speedKnewsArticleContainer">

            <header>
                <HeaderImage props={this.props.id}/>
                <h2>{this.props.title}</h2>
                <h3>by: {this.props.author}</h3>
                <span>Read: {this.props.readStatus.toString()}</span>
                <Link                 
                    to={{
                        pathname:'/theKnews/home/articles/news-page/' + this.props.key,
                        state:{ articleId:this.props.id}
                    }}>
                    <h3>View Article Page</h3>
                </Link>
                    
                {/* <p>{this.props.text}</p> */}
            </header>
             
            <OnCardBookMarkControls
                id={this.props.id}
                bookmarkedStatus={this.props.bookmarkedStatus}
                readStatus={this.props.readStatus}
                showMarkAsReadButton={false}

                fullDatabaseCall={this.props.fullDatabaseCall}
                postsArray={this.props.postsArray}
                leftoverArticles={this.props.leftoverArticles}
                arrayFromDatabase={this.props.arrayFromDatabase}

            />
            <article><ParseHTML props={this.props.text}/></article>
            

        </div>
        )
    }
}

export default LiteKnewsView;