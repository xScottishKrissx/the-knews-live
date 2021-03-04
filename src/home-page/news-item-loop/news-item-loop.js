import React from 'react';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';

import ScrollToTopButton from '../../utility_components/scrollToTop.js';

import NewsItemLoopView from './news-item-caption/news-item-loop-view/news-item-loop-view.js';

export const NewsItemLoop = () => {
    return <MapDatabaseItems />;    
}

class MapDatabaseItems extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            // Article Information
                title: "",
                author: "",
                id: "",
                imgPath: "",
                key: "",
            // The Actual Article Array
                articlesArray : [],
                articlesArray2 : [],
                arrayStartState: 21,
                arrayEndState: 26,
            // This is a record of the posts hidden.
            postsArray:[],
            hiddenPosts:localStorage.getItem("hiddenPostList")
        }
    }

    componentDidMount(){
        // This is retrieving a list of id's relating to posts hidden which is stored in local cache.
        if(localStorage.getItem("hiddenPostList") === null){
            this.setState({
                postsArray:[]
            }) 
        }else{
            this.setState({
                postsArray:[localStorage.getItem("hiddenPostList").split(',').map(Number)]
            })
        }

        

    // This is the initial database query.
     const dbRef = fire.database().ref('items').orderByKey().limitToFirst(60);    
        
        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    text: newsItems[newsItem].text,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    id:newsItems[newsItem].id
                });
            }
            this.setState({
                //Set's the initial number of articles loaded into home.
                articlesArray: newState.slice(0,35)
            })
            console.log(this.state.articlesArray)
            
        })        
        window.addEventListener('scroll', this.scroll);   
        localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
    }

     componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
        
      }
    
    render(){
        const firebaseDB = this.state.articlesArray;  
        console.log(firebaseDB)
        localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
        // console.log(localStorage.getItem("articlesArray"))
         return (
            
            <div className="news-item-loop-wrapper"> 
            <React.Fragment>
                <NewsItemLoopView databaseProp={firebaseDB} />     
                <ScrollToTopButton   />
            </React.Fragment>
            </div>
        );  
    }       
}
export default NewsItemLoop;