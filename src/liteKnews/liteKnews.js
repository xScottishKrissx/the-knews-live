import React,{Component} from 'react';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

import './liteKnews.css';

// import LiteKnewsView from './liteKnewsView';
// import NavBar from '../../navBar/navBar';

import NavBar from '../navBar/navBar';
import LiteKnewsView from '../liteKnews/liteKnewsView'

class LiteKnews extends Component {

    constructor(props){
        super(props);
        this.state = {
            articleNumber:0, 
            nextArticleNumber:1,
            progress:0
        }
        this.changeArticle = this.changeArticle.bind(this);
        this.controls = this.controls.bind(this);
    }
    componentDidMount(){
        document.addEventListener("keyup", this.controls, false);
    }

    changeArticle(x){

        // Close liteKnews
        const close = this.props.closeLiteKnews;
        if(x === "close")close()

        // Return to previous article IF it isn't the first item in the array 
        if(x === "prev" && this.state.articleNumber > 0){ 
            this.setState({articleNumber: this.state.articleNumber - 1}) 
            window.scrollTo(0,0)
        }

        if(x === "next"){ 
            this.setState({articleNumber: this.state.articleNumber + 1}) 
            window.scrollTo(0,0)
        }
    }

    swipeProgress(progress){ this.setState({progress:progress }) }

    // keyboard controls
    controls(event){
        
    //Left
    if(event.keyCode === 37 && this.state.articleNumber > 0){
        this.setState({articleNumber: this.state.articleNumber - 1}) 
        window.scrollTo(0,0)
    }
    //Right
    if(event.keyCode === 39 && this.state.articleNumber < this.props.getArticles.length ){
        this.setState({articleNumber: this.state.articleNumber + 1}) 
        window.scrollTo(0,0)
    }

    // Escape
    if(event.keyCode === 27 )this.props.closeLiteKnews() 
    }

    // handleHideClick(id){
    //     console.log("handleHideClick")
    //     const articles = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
    //     const hideArticle = articles.map(el => {
    //         if(el.id === id && el.bookmarked === false && el != null )
    //             // return Object.assign({}, el, {hidden:false})
    //             return Object.assign({}, el, {markedforhide:true})
    //             return el
    //     });

    //     localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
    //     console.log(hideArticle)
    // }



    render(){ 
    const filterHidden = this.props.getArticles.filter(obj => 
        obj.hidden === false && 
        obj.read === false  
        && obj.markedforhide === false
        )
    // const filterHidden = this.props.getArticles
    const articleFromArray = filterHidden[this.state.articleNumber];
    const nextArticleTitle = filterHidden[this.state.articleNumber + 1]
    const prevArticleTitle = filterHidden[this.state.articleNumber - 1]
    // console.log(articleFromArray.markedforhide)
    // console.log(articleFromArray)
    // console.log(this.props.getArticles)
    // console.log(this.props.getArticles.length)
    // console.log(this.state.articleNumber)
        return (
            <div id="liteKnewsWrapper">     
            {filterHidden.length === this.state.articleNumber || !articleFromArray  ? 
                
                <div>
                    <NavBar 
                    homeButtonOn={false}
                    bookmarkControls={false}
                    bookmarks={true}
                    articleLink={false}
                    liteKnewsControls={true}
                    endOfLiteKnews={true}
                    pageTitle="liteKnews"             
                    // hideStatus={articleFromArray.markedforhide}
                    // hidePressed={()=>this.handleHideClick(articleFromArray.id)}
                                                    // Article COntrols
                    prevArticle = {()=>this.changeArticle("prev")}
                    nextArticle = {()=>this.changeArticle("next")}
                    closeLiteKnews = {()=>this.changeArticle("close")}
                    />

                    <div id="endOfLiteKnewsMessage">
                        <h1>Welcome to liteKnews</h1><br/>
                        <h2>Nothing to read.<br/> Check back later...</h2>
                        <span class="material-icons">auto_stories</span>
                        <p>Tip: liteKnews ONLY displays the most recent unread articles</p>
                        <p>Tip: Click the <span className="material-icons">article</span> icon to go to the full page for each article, where you can view more information and give your opinion</p>
                        {/* <p>Tips: Use the left and right arrow keys to switch articles in liteKnews</p>
                        <p>You can also use the Esc key to close liteKnews</p> */}
                        {/* <i class="bi-alarm"></i> */}
                    </div>
                
                </div>
                            
            :


            <span>
                <NavBar 
                bookmarkControls={false}
                bookmarks={true}
                articleLink={true}
                liteKnewsControls={true}
                pageTitle="liteKnews"
                endOfLiteKnews={false}

                // Bookmark Controls
                bookmarkedStatus={articleFromArray.bookmarked}
                id={articleFromArray.id}
                readStatus={articleFromArray.read}
                showMarkAsReadButton={false}
                arrayFromDatabase={this.props.arrayFromDatabase}
                fullDatabaseCall={this.props.fullDatabaseCall}

                // Article COntrols
                prevArticle = {()=>this.changeArticle("prev")}
                nextArticle = {()=>this.changeArticle("next")}
                closeLiteKnews = {()=>this.changeArticle("close")}
                
                // hideStatus={articleFromArray.markedforhide}
                // hidePressed={()=>this.handleHideClick(articleFromArray.id)}
            />


            <div id="liteKnews" >                
                <div id="liteKnewsWrapper" >

                {articleFromArray != null || undefined ? 
                    <SwipeableList threshold= {0.48} swipeStartThreshold={0.5} >

                    <SwipeableListItem 
                    
                        swipeLeft={{
                            content:
                                <div className="loadingStatus" >
                                    {this.state.progress > 48 ?
                                        <div className="loadComplete"> 
                                        {nextArticleTitle === undefined ?
                                            <div className="loadComplete"> 
                                                <p>You're at the end, no more articles to load :(</p>
                                            </div>    
                                        :
                                            <div className="loadComplete"> 
                                                <p>Load Complete</p>
                                                <span>100%</span>
                                            </div>     
                                        }                                                   
                                        </div>
                                    :
                                        <div className="loadingNumber">
                                            <p>Loading Next Article:</p>
                                            <span >{this.state.progress * 2 + "%"}</span>
                                        </div>
                                    }                 
                                </div>,
                            actionAnimation:() => none,
                            action:() => this.changeArticle("next"),                               
                        }}
                        
                        onSwipeProgress={progress => this.swipeProgress(progress)}
                        
                        swipeRight={{
                            
                            content:
                                <div className="loadingStatus" >
                                    {this.state.progress > 48 ?
                                        <div className="loadComplete"> 
                                        {prevArticleTitle === undefined ?
                                            <div className="loadComplete"> 
                                                <p>You're at the start you can't go back. Onwards! :)</p>
                                                <p>liteKnews only displays unread articles. For now. I might change this later on</p>
                                            </div>    
                                        :
                                            <div className="loadComplete"> 
                                                <p>Load Complete</p>
                                                <span>100%</span>
                                            </div>     
                                        }                                                   
                                        </div>
                                    :
                                        <div className="loadingNumber"> 
                                            <p>Loading Previous Article:</p>
                                            <span>{this.state.progress * 2 + "%"}</span>
                                        </div>
                                    }
                                </div>
                                ,
                            actionAnimation:() => none,
                            action:() => this.changeArticle("prev")
                    
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
                            // Tag 
                            tag={articleFromArray.tag}
                            // Author
                            author={articleFromArray.author}
                            arrayFromDatabase={this.props.arrayFromDatabase}
                            fullDatabaseCall={this.props.fullDatabaseCall}
                            // PostDate
                            postdate={articleFromArray.postdate}

                            // swiping-indicator
                            nextArticleTitle={nextArticleTitle}
                            prevArticleTitle={prevArticleTitle}
                        />
                                                            
                        </SwipeableListItem>
                    </SwipeableList>
                    
                :
                    <div>
                        <h1>Nothing here</h1>
                        <button onClick={()=>this.changeArticle("close",filterHidden.length)}>Close</button>
                    </div>    
                    }
                    
                    
                </div>
            </div>
            </span>


                
            }         


            </div>
        )
    }
}

export default LiteKnews;