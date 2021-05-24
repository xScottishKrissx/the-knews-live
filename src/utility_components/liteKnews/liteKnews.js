import React,{Component} from 'react';
import '../liteKnews/liteKnews.css';
import LiteKnewsView from './liteKnewsView';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

class LiteKnews extends Component {

    constructor(props){
        super(props);
        this.state = {
            articleNumber:0, 
            nextArticleNumber:1,
            // bookmarked:[]
        }
        this.changeArticle = this.changeArticle.bind(this);
    }

    changeArticle(x,y){this.setState({articleNumber: this.state.articleNumber + x})}

    render(){    
    const filterHidden = this.props.renderToPage.filter(obj => obj.hidden === false && obj.read === false)
    const articleFromArray = filterHidden[this.state.articleNumber];
    const articleFromArrayNext = filterHidden[this.state.articleNumber + 1]
    const articleFromArrayPrev = filterHidden[this.state.articleNumber - 1]  || filterHidden[0] 
    console.log(articleFromArray)
        return (
            <div id="liteKnewsWrapper">
               
                <div id="speedKnews">                
                    <div id="speedKnewsWrapper" >
                    <h1>liteKnews - theKnews but lighter</h1>
                    <SwipeableList threshold= {0.5} swipeStartThreshold={0.5}>
                    <SwipeableListItem 
                        
                        swipeLeft={{
                            content:                        
                            <LiteKnewsView 
                            id={articleFromArrayNext.id}
                            title={articleFromArrayNext.title}
                            author={articleFromArrayNext.author}
                            key={articleFromArrayNext.key}
                            text={articleFromArrayNext.text}
    
                            bookmarkedStatus={articleFromArrayNext.bookmarked}
                            readStatus={articleFromArrayNext.read}
            
                            fullDatabaseCall={this.props.fullDatabaseCall}
                            postsArray={this.props.postsArray}
                            leftoverArticles={this.props.leftoverArticles}
                            arrayFromDatabase={this.props.arrayFromDatabase}
                            />,
                            actionAnimation:() => none,
                            action:() => this.changeArticle(+1),
                        }}
                       
                    >
                        <LiteKnewsView 
                        id={articleFromArray.id}
                        title={articleFromArray.title}
                        author={articleFromArray.author}
                        key={articleFromArray.key}
                        text={articleFromArray.text}

                        bookmarkedStatus={articleFromArray.bookmarked}
                        readStatus={articleFromArray.read}
        
                        fullDatabaseCall={this.props.fullDatabaseCall}
                        postsArray={this.props.postsArray}
                        leftoverArticles={this.props.leftoverArticles}
                        arrayFromDatabase={this.props.arrayFromDatabase}
                        />
                        </SwipeableListItem>
                    </SwipeableList>

                        
                        <div id="speedKnewsControls">
                        {this.state.articleNumber === 0 ? 
                           <span>
                            <button onClick={this.props.closeLiteKnews}><span className="material-icons">close</span></button>

                            <button className="mutedBtn"><span className="material-icons">skip_previous</span></button>
                            <button onClick={() => this.changeArticle(+1)}><span className="material-icons">skip_next</span></button>
                           </span>
    
                            :
                            <span>
                                <button onClick={this.props.closeLiteKnews}>
                                    <span className="material-icons">close</span>
                                </button>

                                {this.state.articleNumber > -2 && this.state.articleNumber === this.props.renderToPage.length - 1 ? 
                                <span>
                                    <button onClick={() => this.changeArticle(-1,articleFromArray.id)}><span className="material-icons">skip_previous</span></button>
                                    <button className="mutedBtn"><span className="material-icons">skip_next</span></button>
                                </span>
                                :
                                <span>                                    
                                    <button onClick={() => this.changeArticle(-1,articleFromArray.id)}><span className="material-icons">skip_previous</span></button>
                                    <button onClick={() => this.changeArticle(+1)}><span className="material-icons">skip_next</span></button>
                                </span>
                                }

                            </span>
                        }
                        </div>
                        
                    </div>
                </div>
            
            </div>
        )
    }
}

export default LiteKnews;