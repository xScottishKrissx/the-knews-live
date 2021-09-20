import React from 'react';
// import update from 'immutability-helper';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';

import ScrollToTopButton from '../../utility_components/scrollToTop/scrollToTop.js';

import NewsItemLoopView from './news-item-caption/news-item-loop-view/news-item-loop-view.js';

import LoadingGif from '../../utility_components/loadingGif/loadingGif.js';
import getCardStyle from '../../utility_components/cardStyle/getCardStyle.js';


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
                articlesPerScroll:5,
                cardSize:getCardStyle()
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
                articlesArray: newState.slice(0,this.state.articlesOnLoad),
                fullDatabaseCall: newState
            })
            localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
        })

    }

     componentWillUnmount(){
         fire.database().ref("items").off();
      }


    render(){
        
        const getLatestArray = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.state.articlesArray;

        // Default Sort
        this.state.fullDatabaseCall.sort((a, b) => {
            if (a["postdate"] > b["postdate"]) return 1;
            if (a["postdate"] < b["postdate"]) return -1;
            return 0;
        });   
        this.state.fullDatabaseCall.reverse()
        
         return (
            <div className="news-item-loop-wrapper"> 
            
                {this.state.articlesArray.length > 0 ? 
                        <React.Fragment>
                            <NewsItemLoopView 
                                databaseProp={ getLatestArray } 
                                fullDatabaseCall={this.state.fullDatabaseCall}
                                urlTagProp={this.props.props}
                                cardSize={this.state.cardSize}
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