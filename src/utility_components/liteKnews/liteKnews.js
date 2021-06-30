import React,{Component} from 'react';
import '../liteKnews/liteKnews.css';
import LiteKnewsView from './liteKnewsView';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import NavBar from '../../navBar/navBar';

class LiteKnews extends Component {

    constructor(props){
        super(props);
        this.state = {
            articleNumber:0, 
            nextArticleNumber:1,
            // bookmarked:[]
            //testing
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
        var close = this.props.closeLiteKnews;
        if(x === "close")close()

        // Return to previous article IF it isnt the first item in the array 
        if(x === "prev" && this.state.articleNumber > 0){ 
            this.setState({articleNumber: this.state.articleNumber - 1}) 
        }

        if(x === "next"){ 
            this.setState({articleNumber: this.state.articleNumber + 1}) 
        }
    }

    swipeProgress(progress){ this.setState({progress:progress }) }



    // keyboard controls
    controls(event){
    //    console.log(event)
       if(event.keyCode === 37 && this.state.articleNumber > 0){
        //    console.log("Go left")
            this.setState({articleNumber: this.state.articleNumber - 1}) 
       }
       if(event.keyCode === 39){
        // console.log("Go Right")
            this.setState({articleNumber: this.state.articleNumber + 1}) 
        }
    }
    render(){    

    window.scrollTo(0,0)

    const filterHidden = this.props.renderToPage.filter(obj => obj.hidden === false && obj.read === false)
    const articleFromArray = filterHidden[this.state.articleNumber];
    // console.log(filterHidden[this.state.articleNumber - 1])
    // console.log(filterHidden[this.state.articleNumber + 1])
    const nextArticleTitle = filterHidden[this.state.articleNumber + 1]
    const prevArticleTitle = filterHidden[this.state.articleNumber - 1]
    
        return (
            <div id="liteKnewsWrapper">              
                <NavBar 
                    bookmarkControls={true}
                    bookmarks={true}
                    articleLink={true}
                    liteKnewsControls={true}
                    pageTitle="liteKnews"

                    // Bookmark Controls
                    bookmarkedStatus={articleFromArray.bookmarked}
                    id={articleFromArray.id}
                    readStatus={articleFromArray.read}
                    showMarkAsReadButton={false}
                    arrayFromDatabase={this.props.arrayFromDatabase}
                    leftoverArticles={this.props.leftoverArticles}
                    fullDatabaseCall={this.props.fullDatabaseCall}

                    // Article COntrols
                    prevArticle = {()=>this.changeArticle("prev")}
                    nextArticle = {()=>this.changeArticle("next")}
                    closeLiteKnews = {()=>this.changeArticle("close")}
                 
                />


                <div id="speedKnews" >                
                    <div id="speedKnewsWrapper" >
                    {/* <h1>liteKnews - theKnews but lighter</h1> */}

                    {articleFromArray != null || undefined ? 
                        <SwipeableList threshold= {0.48} swipeStartThreshold={0.5} >
                        <SwipeableListItem 
                           
                            swipeLeft={{
                                content:
                                    <div className="loadingStatus" >
                                        {this.state.progress > 48 ?
                                            <div className="loadComplete"> 
                                                <span>100%</span>
                                                <p>Load Complete</p>
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
                                                <span>100%</span>
                                                <p>Load Complete</p>
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
                                leftoverArticles={this.props.leftoverArticles}
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
                        
                        {/* <div id="liteKnewsControls">
                            <button onClick={()=>this.changeArticle("prev")}><span className="material-icons">skip_previous</span></button>
                            <button onClick={()=>this.changeArticle("close")}><span className="material-icons">close</span></button>
                            <button onClick={()=>this.changeArticle("next")}><span className="material-icons">skip_next</span></button>
                        </div> */}
                        
                    </div>
                </div>

            </div>
        )
    }
}

export default LiteKnews;