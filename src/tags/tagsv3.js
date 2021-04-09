import React from 'react';
import fire from '../fire.js';


import NavControls from '../utility_components/navControls.js';
import '../tags/tags.css';
import CustomCardSize from '../home-page/news-item-loop/custom-tile-size/custom-card-size.js';
import ScrollCheck from '../utility_components/ScrollCheck.js';

// Working with Cache 
import ClearCache from '../utility_components/ClearCache.js';
import ScrollCheckV2 from '../utility_components/ScrollCheckV2.js';
import RenderCard from '../utility_components/renderCard/renderCard.js';

// // Things needed for map items test
// // Swiping
// import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
// import '@sandstreamdev/react-swipeable-list/dist/styles.css';
// import SwipeLeftContent from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/swipe-views/article-modal.js';
// import swipeLeftAction from '../utility_components/swipeLeftAction.js';
// import closePopup from '../utility_components/closePopup.js';
// import swipeRightAction from '../utility_components/swipeRightAction.js';
// import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
// import CheckCache from '../utility_components/checkCache.js';
// import HideArticle from '../utility_components/hide-article/hide-article.js';

// export const MapItemsTest = (props) => {
//         const mapTags = props.database;
//         console.log(props.database)
//         // console.log(this.props.location.state.tag3)
//         console.log(mapTags)
//         const pageView = mapTags.map((value,key) => {
//             return(
                
                   
//                 <div id={value.id} key={value.id} className="myClass" name="original-tags-load">   
                    
//                     <CheckCache id={value.id}/>

//                     <HideArticle articleId={value.id}/>    

//                     <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
//                         <SwipeableListItem 
                            
//                             swipeLeft={{
//                                 content: <SwipeLeftContent 
//                                         id={value.id} 
//                                         title={value.title} 
//                                         author={value.author} 
//                                         text={value.text} 
//                                         closePopup={closePopup} 
//                                         headerImage={value.id} />,
//                                 action: () => swipeLeftAction(value.text, value.id) 
//                             }}
                            
//                             swipeRight={{
//                                 content: <div>Hiding article...</div>, 
//                                 action: () => swipeRightAction(value.id, props.postsArray)
//                             }}
//                         >
                                
//                                 <div className='news-square' name="tags-original-load-news"  key={key}  
//                                 style={ props.startingCardSize || props.changedCardSize } >                    
//                                     <Caption 
//                                         pageId={value.key}
//                                         title={value.title}
//                                         author={value.author}
//                                         likes={value.likes}
//                                         dislikes={value.dislikes}
//                                         articleId={value.id}
//                                         tag={value.tag}
//                                         imageId={value.id}
//                                         />
//                                 </div>
                        
//                         </SwipeableListItem>
//                         </SwipeableList>


//                 </div>
                
//             )
//         })
//         return pageView;
//     }   


class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            leftoverArticles:[],
            searchDBFor: this.props.location.state.searchDBFor,
            
            // Hiding Posts
            postsArray:[],

            // Custom Card Size
            startingCardSize:"",
            changedCardSize:{width: localStorage.getItem("myData")},       
            
        }
        this.getCardSize = this.getCardSize.bind(this);
    }

    // There must be a way to only have one of these across the entire project.
    getCardSize(value){
        this.setState({
            startingCardSize:{
                width:value
            }
        })
    }

    componentDidMount(){
        const orderQueryByChild = this.props.location.state.orderByChild
        const searchDBFor = this.props.location.state.author
        const thingFromArticle = this.props.location.state.thingFromArticle;
        console.log(orderQueryByChild + " " + searchDBFor)
        console.log(this.props.location.state.orderByChild)
        const dbRef = fire.database().ref('items').orderByChild(orderQueryByChild).equalTo(searchDBFor);

        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    id:newsItems[newsItem].id,
                    tag:newsItems[newsItem].tag,
                    text:newsItems[newsItem].text
                });
                // console.log(newState)
            }

            this.setState({
                articlesArray: newState
            })
            // console.log(this.state.articlesArray)
            // localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
            // console.log(localStorage.getItem("articlesArray"))
            
        })
    }


    render(){
        console.log("Render Tags.v3")
        // console.log(this.state.articlesArray)
        // console.log(this.state.leftoverArticles)

        // console.log("Author : " + this.props.location.state.author)

        const mapTags = this.state.articlesArray;
        // console.log(this.props.location.state.tag3)
        console.log(mapTags)

        // const pageView = mapTags.map((value,key) => {
        //     return(
                
                   
        //         <div id={value.id} key={value.id} className="myClass" name="original-tags-load">   
                    
        //             <CheckCache id={value.id}/>

        //             <HideArticle articleId={value.id}/>    

        //             <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
        //                 <SwipeableListItem 
                            
        //                     swipeLeft={{
        //                         content: <SwipeLeftContent 
        //                                 id={value.id} 
        //                                 title={value.title} 
        //                                 author={value.author} 
        //                                 text={value.text} 
        //                                 closePopup={closePopup} 
        //                                 headerImage={value.id} />,
        //                         action: () => swipeLeftAction(value.text, value.id) 
        //                     }}
                            
        //                     swipeRight={{
        //                         content: <div>Hiding article...</div>, 
        //                         action: () => swipeRightAction(value.id, this.state.postsArray)
        //                     }}
        //                 >
                                
        //                         <div className='news-square' name="tags-original-load-news"  key={key}  
        //                         style={ this.state.startingCardSize || this.state.changedCardSize } >                    
        //                             <Caption 
        //                                 pageId={value.key}
        //                                 title={value.title}
        //                                 author={value.author}
        //                                 likes={value.likes}
        //                                 dislikes={value.dislikes}
        //                                 articleId={value.id}
        //                                 tag={value.tag}
        //                                 imageId={value.id}
        //                                 />
        //                         </div>
                        
        //                 </SwipeableListItem>
        //                 </SwipeableList>


        //         </div>
                
        //     )
        // })

        return(
            
            <div className="tags-wrapper">
                <div className="tags-item-wrapper">
                        <ClearCache />


                        <NavControls props="only-home-button"/>
                        {this.props.location.state.author === undefined ?
                        <h1>Showing articles from {this.props.location.state.searchDBFor}</h1>
                        : 
                        <h1>Showing articles from {this.props.location.state.author}</h1>
                        }              
                        
                        {/* {pageView} */}
                        <RenderCard 
                            database={this.state.articlesArray}
                            startingCardSize={this.state.startingCardSize}
                            changedCardSize={this.state.changedCardSize}
                            postsArray={this.state.postsArray}
                        />

                        <ScrollCheckV2 
                            leftoverArticles={this.state.leftoverArticles}
    
                        />
                </div>
                <CustomCardSize getCardSizeToParent={this.getCardSize}/>
            </div>
            
            
        )
    }
}
export default Tags;