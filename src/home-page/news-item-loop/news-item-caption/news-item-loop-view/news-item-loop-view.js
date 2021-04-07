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
        getArticleBy:"All",
        renderArray:[],
        
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
        // console.log(this.props.fullDatabaseCall)
       
        if(localStorage.getItem("filterOption") === null){
            console.log("Set FilterOption as All")
            localStorage.setItem("filterOption","All")
        }else{
            console.log(localStorage.getItem("filterOption"))
        }
        // console.log(localStorage.getItem("filterOption"))
        // console.log(this.props.databaseProp)
        const editedArticleArray =JSON.parse(localStorage.getItem("editedArticleArray"))
        // console.log(editedArticleArray)
        const fullDatabaseCall = editedArticleArray || this.props.fullDatabaseCall;
        // console.log(fullDatabaseCall)

        console.log(this.state.getArticleBy)
        if(this.state.getArticleBy === "" || null ){
            // console.log("Load Default View")
            this.setState({
                renderArray:fullDatabaseCall,
                getArticleBy:"All"
            })
        }
        // console.log(JSON.parse(localStorage.getItem("editedLeftoverArticlesArray")))
        // console.log(localStorage.getItem("filterOption"))

        // Remember filter option.
        this.getArticlesBy(localStorage.getItem("filterOption"))


    }

    getArticlesBy(value){
        const editedArticleArray =JSON.parse(localStorage.getItem("editedArticleArray"))
        // console.log(editedArticleArray)
        const fullDatabaseCall = editedArticleArray || this.props.fullDatabaseCall;
        const filteredFullDatabaseCall = fullDatabaseCall.filter(obj => obj !== null);

        // Filter Article By Tag or Not
        // console.log(value)
        const filterArticlesBy = filteredFullDatabaseCall.filter(obj => obj.tag === value);
        // console.log(filterArticlesBy)

        // change leftover articles to include only relevant articles
        // const leftoverArticles = this.props.fullDatabaseCall.filter(obj => obj.tag === value);
        // console.log(leftoverArticles.slice(20))
        

        this.setState({
            getArticleBy:value,
            renderArray:filterArticlesBy,
            // leftoverArticles:leftoverArticles.slice(20)
        })

        // console.log(this.props.databaseProp)
        if(value === "All")this.setState({renderArray:this.props.databaseProp})
        
        // console.log("Filter Articles By " + value)

        // Set Filter Option into local storage
        localStorage.setItem("filterOption",value)
        
    }

    render(){  
        localStorage.getItem("filterFilterView")
        const thing = this.state.renderArray;
            // console.log(thing)

        // console.log(this.props.databaseProp)  

        const filterArticlesBy = this.state.renderArray.filter(obj => obj.tag === this.state.getArticleBy); 
            // console.log(filterArticlesBy)


        // console.log(this.state.getArticleBy)
        const filterArticlesBy2 = this.props.fullDatabaseCall.filter(obj => obj.tag === this.state.getArticleBy); 
        // console.log(filterArticlesBy2)



        const renderToPage =  thing || this.props.databaseProp ;
        console.log(renderToPage)  
        const HomePageView = renderToPage.map((value,key) => {                 
            
            return (         
                
                <div id={value.id} key={value.id} className="myClass">   
                              
                    {/* <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>        */}
                    <CheckCache id={value.id}/>
                    
                    <HideArticle articleId={value.id} arrayFromDatabase={this.props.databaseProp} leftoverArticles={this.props.leftoverArticles} specialFilter={filterArticlesBy}/>     
                    
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
                <button onClick={() => this.getArticlesBy("All")} >No Filter</button>
                <p>Showing {this.state.getArticleBy} Articles</p>



                {this.props.databaseProp.length >= 30 ? 
                 HomePageView
                :
                <p>Something has gone wrong. Contact your nearest guardian of light</p> 
                }
                
                
                {this.state.getArticleBy === "All" ?
                    <ScrollCheckV2 
                        articlesArray={this.props.databaseProp}
                        startingCardSize={this.state.startingCardSize}
                        changedCardSize={this.state.changedCardSize}
                        leftoverArticles={this.props.leftoverArticles}
                        getArticleBy={this.state.getArticleBy}
                    />   
                :
                <p>No More Articles. Come Back Later</p>
                }
 
                <CustomCardSize getCardSizeToParent={this.getCardSize} />
            </div>
        )
    }
}

export default NewsItemLoopView;