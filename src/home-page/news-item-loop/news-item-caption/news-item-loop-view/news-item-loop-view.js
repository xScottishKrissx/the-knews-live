import React from 'react';
import fire from '../../../../fire.js'
import '../news-item-loop-view/news-item-loop-view.css';
import Caption from '../../news-item-caption/news-item-caption.js';
import CustomCardSize from '../../custom-tile-size/custom-card-size.js';


import HideArticle from '../../../../utility_components/hide-article/hide-article';
import ScrollCheck from '../../../../utility_components/ScrollCheck';
import ScrollCheckV2 from '../../../../utility_components/ScrollCheckV2';
import CheckCache from '../../../../utility_components/checkCache.js';

// Swiping
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import SwipeLeftContent from './swipe-views/article-modal.js';
import swipeLeftAction from '../../../../utility_components/swipeLeftAction.js';
import swipeRightAction from '../../../../utility_components/swipeRightAction.js';
import closePopup from '../../../../utility_components/closePopup.js';

// import update from 'immutability-helper';

class NewsItemLoopView extends React.Component{

    constructor(props){
        super(props);
        this.state = {
        // Card Size
        startingCardSize:"",
        changedCardSize:{width: localStorage.getItem("myData")},
        postsArray:[],

        //testing
        getArticleBy:"",
        renderArray:[]
        



        }
        this.getCardSize = this.getCardSize.bind(this);
        this.getArticlesBy = this.getArticlesBy.bind(this);
    }

    getCardSize(value){



        this.setState({
            startingCardSize:{
                width:value,
                
            }
        })
        
    }



    componentDidMount(){
        if(this.state.getArticleBy === ""){
            console.log("Load Default View")
            this.setState({
                renderArray:this.props.databaseProp
            })
        }
        
    }

    getArticlesBy(value){
        const fullDatabaseCall = JSON.parse(localStorage.getItem("unchangedFullDatabaseCall"))
        const key = null
        const thing5 = fullDatabaseCall.filter(obj => obj !== key);

        // Filter Article By Tag or Not
        console.log(value)
        const filterArticlesBy = thing5.filter(obj => obj.tag === value);
        console.log(filterArticlesBy)

        this.setState({
            getArticleBy:value,
            renderArray:filterArticlesBy
        })
        if(value === "Clear"){
            this.setState({
                renderArray:this.props.databaseProp
            })
        }
        console.log("Set Tag" + this.state.getArticleBy)
        console.log(value)
        
    }

    componentWillUnmount(){
        fire.database().ref("items").off();
    }
    render(){
        // console.log(this.props.databaseProp)
        // const collection2 = this.props.databaseProp;
        // const newCollection2 = update(collection2, {0:{"hidden": {$set: 5}}});
        // console.log(newCollection2)
        // console.log("LeftOver Articles Below...")
        // console.log(this.props.leftoverArticles)
        const fullDatabaseCall = JSON.parse(localStorage.getItem("unchangedFullDatabaseCall"))


        // something daft but I want to see what happens...
        // important !! - Responsible for removing null objects from array.
        const thing4 = this.props.databaseProp;
        const key = null
        const thing5 = fullDatabaseCall.filter(obj => obj !== key);
        const defaultLoad = thing4.filter(obj => obj !== key);
        console.log(thing5)

        // Filter Article By Tag or Not
        // const key2 = this.state.getArticleBy;
        // console.log(key2)
        // const filterArticlesBy = thing5.filter(obj => obj.tag === key2);
        // console.log(filterArticlesBy)

        // const renderToPage = defaultLoad || filterArticlesBy;
        console.log(this.state.renderArray)
        const renderToPage = this.state.renderArray;


        const HomePageView = renderToPage.map((value,key) => {                 
            
            return (         
                
                <div id={value.id} key={value.id} className="myClass">   
                              
                    {/* <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>        */}
                    <CheckCache id={value.id}/>
                    
                    <HideArticle articleId={value.id} arrayFromDatabase={this.props.databaseProp} leftoverArticles={this.props.leftoverArticles} />     
                    
                    <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                        <SwipeableListItem 
                            
                            swipeLeft={{
                                content: <SwipeLeftContent 
                                        id={value.id} 
                                        title={value.title} 
                                        author={value.author} 
                                        text={value.text} 
                                        closePopup={closePopup} 
                                        headerImage={value.id} />,
                                action: () => swipeLeftAction(value.text, value.id) 
                            }}
                            
                            swipeRight={{
                                content: <div>Hiding article...</div>, 
                                action: () => swipeRightAction(value.id, this.state.postsArray)
                            }}
                        >
                                
                                <div className='news-square'  key={key}  name="news-item-loop-view.js"
                                style={ this.state.startingCardSize || this.state.changedCardSize} >                    
                                    <Caption 
                                        pageId={value.key}                                        
                                        title={value.title}
                                        author={value.author}
                                        likes={value.likes}
                                        dislikes={value.dislikes}
                                        articleId={value.id}
                                        tag={value.tag}
                                        imageId={value.id}
                                        />
                                </div>
                        
                        </SwipeableListItem>
                        </SwipeableList>
                </div>
                      
            );
            
      }) 
        return(
            
            <div className="newsItemLoopViewWrapper">
                
                <button onClick={() => this.getArticlesBy("News")} >News</button>
                <button onClick={() => this.getArticlesBy("Sports")} >Sports</button>
                <button onClick={() => this.getArticlesBy("Weather")} >Weather</button>
                <button onClick={() => this.getArticlesBy("Clear")} >Clear</button>
                {HomePageView}
                
                {/* <ScrollCheck 
                    databaseReference={fire.database().ref('items').orderByKey().limitToFirst(100) }
                    swipeLeftAction={swipeLeftAction}
                    closePopup={closePopup}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    articlesArray={this.props.databaseProp}

                    // Testing Stuff
                    testProp = {JSON.parse(localStorage.getItem("editedArticleArray"))}                    
                /> */}
                <ScrollCheckV2 
                    articlesArray={this.props.databaseProp}
                    startingCardSize={this.state.startingCardSize}
                    changedCardSize={this.state.changedCardSize}
                    leftoverArticles={this.props.leftoverArticles}
                />
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
            </div>
        )
    }
}

export default NewsItemLoopView;