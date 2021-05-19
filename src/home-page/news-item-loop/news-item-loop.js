import React from 'react';
// import update from 'immutability-helper';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';

import ScrollToTopButton from '../../utility_components/scrollToTop/scrollToTop.js';

import NewsItemLoopView from './news-item-caption/news-item-loop-view/news-item-loop-view.js';

import loading from '../../img/loading5.gif';

export const NewsItemLoop = (props) => {
    return <MapDatabaseItems props={props.urlTagProp}/>;    
}

class MapDatabaseItems extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // The Actual Article Array
                articlesArray : [],
                leftoverArticles:[],
                fullDatabaseCall:[],
        }
    }

    componentDidMount(){
    // This is the initial database query.
      // Main Database Call
     const dbRef = fire.database().ref('items').orderByKey().limitToFirst(97);     
        dbRef.on('value', (snapshot) => {
            let dbObjects = snapshot.val();
            let newState = [];
            for (let dbObject in dbObjects){
              newState.push({
                author: dbObjects[dbObject].author,
                bookmarked: dbObjects[dbObject].bookmarked,
                dislikes:dbObjects[dbObject].dislikes,
                email:dbObjects[dbObject].email,
                hidden:dbObjects[dbObject].hidden,
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
                articlesArray: newState.slice(0,30),
                leftoverArticles: newState.slice(30,97),
                fullDatabaseCall: newState
            })
            localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
        })
    }

     componentWillUnmount(){
        // window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
      }


    render(){
        localStorage.setItem("unchangedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))

        const arrayWithArticlesHidden = JSON.parse(localStorage.getItem("editedArticleArray")) || this.state.articlesArray;

         return (
            <div className="news-item-loop-wrapper"> 
            
                {this.state.articlesArray.length === 30 ? 
                        <React.Fragment>
                            <NewsItemLoopView 
                                databaseProp={arrayWithArticlesHidden } 
                                leftoverArticles={this.state.leftoverArticles}
                                fullDatabaseCall={this.state.fullDatabaseCall}
                                urlTagProp={this.props.props}
                            /> 
            
                            <ScrollToTopButton   />
                        </React.Fragment>
                    :
                        <img alt="now loading" src={loading} />
                }

                </div>
            );  
    }       
}
export default NewsItemLoop;