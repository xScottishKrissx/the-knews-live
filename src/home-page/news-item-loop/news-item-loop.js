import React from 'react';
// import update from 'immutability-helper';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';

import ScrollToTopButton from '../../utility_components/scrollToTop/scrollToTop.js';

import NewsItemLoopView from './news-item-caption/news-item-loop-view/news-item-loop-view.js';

import LoadingGif from '../../utility_components/loadingGif/loadingGif.js';

export const NewsItemLoop = (props) => {
    return <MapDatabaseItems props={props.urlTagProp}/>;    
}

class MapDatabaseItems extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // The Actual Article Array
                articlesArray : [],
                fullDatabaseCall:[],
                totalArticles:50,
                articlesOnLoad:20,
                articlesPerScroll:5
        }
    }

    componentDidMount(){
        // console.log("mount")
    // This is the initial database query.
      // Main Database Call
     const dbRef = fire.database().ref('items').orderByKey().limitToFirst(this.state.totalArticles);     
        dbRef.on('value', (snapshot) => {
            let dbObjects = snapshot.val();
            let newState = [];
            for (let dbObject in dbObjects){
              newState.push({
                author: dbObjects[dbObject].author,
                bookmarked: dbObjects[dbObject].bookmarked,
                dislikes:dbObjects[dbObject].dislikes,
                disliked:dbObjects[dbObject].disliked,
                email:dbObjects[dbObject].email,
                hidden:dbObjects[dbObject].hidden,
                markedforhide:dbObjects[dbObject].markedforhide,
                id:dbObjects[dbObject].id,
                key:dbObject,
                likes:dbObjects[dbObject].likes,
                liked:dbObjects[dbObject].liked,
                postdate:dbObjects[dbObject].postdate,
                read: dbObjects[dbObject].read,
                tag:dbObjects[dbObject].tag,
                text:dbObjects[dbObject].text,
                title:dbObjects[dbObject].title,
               
              })
            }
            this.setState({
                //Set's the initial number of articles loaded into home.
                articlesArray: newState.slice(0,10),
                fullDatabaseCall: newState
            })
            localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
        })

        // console.log(JSON.parse(localStorage.getItem("myData"))[0] )

    }

     componentWillUnmount(){
        // window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
      }


    render(){
        localStorage.setItem("unchangedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))
        
        const arrayWithArticlesHidden = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.articlesArray;

        // Starting Card Size
        let cardSize = {}
        const cardSizeInStorage = JSON.parse(localStorage.getItem("myData"))
        if(cardSizeInStorage === null){
            cardSize = ["260px","400px"]
        }else{
            cardSize = [cardSizeInStorage[0], cardSizeInStorage[1]]
        }


        this.state.fullDatabaseCall.sort((a, b) => {
            if (a["postdate"] > b["postdate"]) return 1;
            if (a["postdate"] < b["postdate"]) return -1;
            return 0;
        });   
        this.state.fullDatabaseCall.reverse()
        // console.dir(this.state.fullDatabaseCall.reverse()) 
        
        // Starting Page Layout
        // let pageLayout={}
        // const pageLayoutInStorage = JSON.parse(localStorage.getItem("pageLayout"))
        // if(pageLayoutInStorage === null){
        //     pageLayout = ["row", "0 auto","auto"]
        // }else{
        //     pageLayout = [pageLayoutInStorage[0], pageLayoutInStorage[1], pageLayoutInStorage[2]]
        // }


         return (
            <div className="news-item-loop-wrapper"> 
            
                {this.state.articlesArray.length > 0 ? 
                        <React.Fragment>
                            <NewsItemLoopView 
                                databaseProp={arrayWithArticlesHidden } 
                                fullDatabaseCall={this.state.fullDatabaseCall}
                                urlTagProp={this.props.props}
                                cardSize={cardSize}
                                // pageLayout = {pageLayout}
                            /> 
            
                            <ScrollToTopButton   />
                        </React.Fragment>
                    :
                       <LoadingGif />
                }

                </div>
            );  
    }       
}
export default NewsItemLoop;