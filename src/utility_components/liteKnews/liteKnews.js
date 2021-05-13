import React,{Component} from 'react';
import HeaderImage from '../header-image/header-image';
import {Link} from 'react-router-dom';
import ParseHTML from '../parse-database-html/parse-html.js';
import createBookmark from '../bookmarks/createBookmark';
import OnCardBookMarkControls from '../bookmarks/onCardBookmarkControls';
import '../liteKnews/liteKnews.css';

class LiteKnews extends Component {

    constructor(props){
        super(props);
        this.state = {articleNumber:0, bookmarked:[]}
        this.changeArticle = this.changeArticle.bind(this);
    }

    changeArticle(x,y){this.setState({articleNumber: this.state.articleNumber + x })}

    // createBookmarkLiteKnews(x,b){
    //     console.log("Create Bookmark with  article by -> " + x)
    //     console.log(this.state.articleNumber)
    //     createBookmark(x,b)
    //     this.setState({bookmarked:true})
    // }

    componentDidUpdate(){
        console.log("componentDidUpdate")
    }
    render(){

    // const articleFromArray = this.props.renderToPage[this.state.articleNumber];
    
    const filterHidden = this.props.renderToPage.filter(obj => obj.hidden === false)
    // console.log(filterHidden)
    const articleFromArray = filterHidden[this.state.articleNumber]
    const pageView = filterHidden.map((value,key) => {
        
    })
    // console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))
    // console.log(articleFromArray.id)
        return (
            <div id="liteKnewsWrapper">
               {pageView}
                <div id="speedKnews">                
                    <div id="speedKnewsWrapper" >
                    <h1>liteKnews - theKnews but lighter</h1>
                    
                        <div className="speedKnewsArticleContainer">

                            <header>
                                <HeaderImage props={articleFromArray.id}/>
                                <h2>{articleFromArray.title}</h2>
                                <h3>by: {articleFromArray.author}</h3>
                                <Link 
                                
                                    to={{
                                        pathname:'/theKnews/home/articles/news-page/' + articleFromArray.key,
                                        state:{ articleId:articleFromArray.id}
                                    }}
                                    
                                
                                >
                                    <h3>View Article Page</h3></Link>
                                {/* <p>{articleFromArray.text}</p> */}
                            </header>
                            {/* <p>Bookmarked: {articleFromArray.bookmarked.toString()} </p>

                            {this.state.bookmarked === true ?
                            <button onClick={()=>this.createBookmarkLiteKnews(articleFromArray.id,this.props.fullDatabaseCall)}>Bookmarked</button>
                            :
                            <button onClick={()=>this.createBookmarkLiteKnews(articleFromArray.id,this.props.fullDatabaseCall)}>Not Bookmarked</button>
                            
                            } */}
                            <OnCardBookMarkControls
                                id={articleFromArray.id}
                                bookmarkedStatus={articleFromArray.bookmarked}
                                readStatus={articleFromArray.read}

                                fullDatabaseCall={this.props.fullDatabaseCall}
                                postsArray={this.props.postsArray}
                                leftoverArticles={this.props.leftoverArticles}
                                arrayFromDatabase={this.props.arrayFromDatabase}

                            />
                            <article><ParseHTML props={articleFromArray.text}/></article>
                         

                        </div>
                        
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
                            {/* <button onClick={() => this.changeArticle(+1)}>Next Article</button>
                            <button onClick={this.closeLiteKnewsView}>Exit</button> */}
                        </div>
                        
                    </div>
                </div>
            
            </div>
        )
    }
}

export default LiteKnews;