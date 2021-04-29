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
        console.log(JSON.parse(localStorage.getItem("myData")))
        // console.log(this.props.location.search)
        // console.log(this.props.props)
        // This is retrieving a list of id's relating to posts hidden which is stored in local cache.
  

    // This is the initial database query.
     const dbRef = fire.database().ref('items').orderByKey().limitToFirst(97);    
    //  const dbRef = fire.database().ref('items').orderByChild("hidden").equalTo(false).limitToFirst(60);   
        
        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    tag: newsItems[newsItem].tag,
                    id:newsItems[newsItem].id,
                    hidden:newsItems[newsItem].hidden,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    text: newsItems[newsItem].text,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes
                    
                    
                    
                });
            }
            this.setState({
                //Set's the initial number of articles loaded into home.
                articlesArray: newState.slice(0,30),
                leftoverArticles: newState.slice(30,97),
                fullDatabaseCall: newState
            })
            // console.log(this.state.fullDatabaseCall)
            // console.log(this.state.articlesArray)
            localStorage.setItem("cleanDatabaseCall", JSON.stringify(this.state.fullDatabaseCall)) 
            // console.log(JSON.parse(localStorage.getItem("cleanDatabaseCall")))
        })        
        // window.addEventListener('scroll', this.scroll);   


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