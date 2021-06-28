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

    swipeProgress(progress){ 
        this.setState({progress:progress }) 
        if(progress > 48){
            document.getElementById("loading-article").classList.add('progressBarChange')
        }else{
            document.getElementById("loading-article").classList.remove('progressBarChange')
        }
    }
    componentDidMount(){
        document.addEventListener("keyup", this.controls, false);

    }

    controls(event){
    //    console.log(event)
       if(event.keyCode === 37 && this.state.articleNumber > 0){
           console.log("Go left")
           this.setState({articleNumber: this.state.articleNumber - 1}) 
       }
       if(event.keyCode === 39){
        console.log("Go Right")
        this.setState({articleNumber: this.state.articleNumber + 1}) 
    }
    }
    render(){    
    window.scrollTo(0,0)

    












    const filterHidden = this.props.renderToPage.filter(obj => obj.hidden === false && obj.read === false)
    const articleFromArray = filterHidden[this.state.articleNumber];

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
                                    <div className="testLiteKnews">
                                        {/* {this.state.progress}  */}
                                        <label for="loading-article">Loading Next Article: {this.state.progress * 2 + "%"} </label>
                                        <progress className="progress" id="loading-article" value={this.state.progress} max="48"></progress>
                                    </div>,
                                actionAnimation:() => none,
                                action:() => this.changeArticle("next"),
                                
                                
                            }}
                            onSwipeProgress={progress => this.swipeProgress(progress)}
                            
                            swipeRight={{
                                content:                                    
                                    <div className="testLiteKnews">
                                        {/* {this.state.progress}  */}
                                        <label for="loading-article">Loading Previous Article: {this.state.progress * 2 + "%"} </label>
                                        <progress className="progress" id="loading-article" value={this.state.progress} max="48"></progress>
                                    </div>,
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