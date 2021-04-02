import React from 'react';
// import update from 'immutability-helper';
import fire from '../../fire.js'
import '../news-item-loop/news-item-loop.css';

import ScrollToTopButton from '../../utility_components/scrollToTop.js';

import NewsItemLoopView from './news-item-caption/news-item-loop-view/news-item-loop-view.js';

export const NewsItemLoop = (props) => {
    return <MapDatabaseItems databaseProp={props.databaseProp} leftoverArticles={props.leftoverArticles}/>;    
}

class MapDatabaseItems extends React.Component{

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         // Article Information
    //             title: "",
    //             author: "",
    //             id: "",
    //             imgPath: "",
    //             key: "",
    //         // The Actual Article Array
    //             articlesArray : [],
    //             articlesArray2 : [],
    //             arrayStartState: 30,
    //             arrayEndState: 35,
    //             filteredPostArray:[],
    //         // This is a record of the posts hidden.
    //         postsArray:[],
    //         hiddenPosts:localStorage.getItem("hiddenPostList"),

    //         // Testing Stuff
    //         leftoverArticles:[],
    //         firstSlicePoint:0,
    //         secondSlicePoint:30,
    //         data:[],
    //         fullDatabaseCall:[]
    //     }
    // }

    componentDidMount(){
        // This is retrieving a list of id's relating to posts hidden which is stored in local cache.
        // if(localStorage.getItem("hiddenPostList") === null){
        //     this.setState({
        //         postsArray:[]
        //     }) 
        // }else{
        //     this.setState({
        //         postsArray:[localStorage.getItem("hiddenPostList").split(',').map(Number)]
        //     })
        // }
        // console.log("Hidden Articles -> " + localStorage.getItem("hiddenPostList"));
        

    // This is the initial database query.
    //  const dbRef = fire.database().ref('items').orderByKey().limitToFirst(97);    
    //  const dbRef = fire.database().ref('items').orderByChild("hidden").equalTo(false).limitToFirst(60);   
        
        // dbRef.on('value', (snapshot) => {
        //     let newsItems = snapshot.val();
        //     // console.log(newsItems);
        //     let newState = [];
        //     for(let newsItem in newsItems){
        //         newState.push({
        //             key: newsItem,
        //             id:newsItems[newsItem].id,
        //             hidden:newsItems[newsItem].hidden,
        //             author: newsItems[newsItem].author,
        //             title: newsItems[newsItem].title,
        //             text: newsItems[newsItem].text,
        //             likes: newsItems[newsItem].likes,
        //             dislikes: newsItems[newsItem].dislikes,
        //             tag: newsItems[newsItem].tag
                    
                    
        //         });
        //     }
        //     this.setState({
        //         //Set's the initial number of articles loaded into home.
        //         articlesArray: newState.slice(0,this.state.secondSlicePoint),
        //         leftoverArticles: newState.slice(30,97),
        //         fullDatabaseCall: newState
        //     })

        //     // console.log(this.state.articlesArray)
        //     // console.log(this.state.leftoverArticles)
        //     // localStorage.setItem("leftoverArticlesArray", JSON.stringify(this.state.leftoverArticles))
        //     // console.log(this.state.fullDatabaseCall)
        // })        
        // window.addEventListener('scroll', this.scroll);   
        // localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
        // localStorage.setItem("leftoverArticlesArray", JSON.stringify(this.state.leftoverArticles))


        // localStorage.setItem("leftoverArticlesArray", JSON.stringify(this.state.leftoverArticles))
    }

     componentWillUnmount(){
        // window.removeEventListener('scroll',this.scroll);
        // fire.database().ref("items").off();
        // localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
        
      }
    
    render(){
        // NUCLEAR OPTION -> Just in case anything goes wrong...
        // localStorage.removeItem("editedArticleArray")
        // localStorage.removeItem("editedLeftoverArticlesArray")

        // console.log("Render")
        // console.log(this.state.articlesArray)
        // const firebaseDB = this.state.articlesArray;  
        // console.log(firebaseDB)
        // localStorage.setItem("unchangedFullDatabaseCall", JSON.stringify(this.state.fullDatabaseCall))
        // console.log(JSON.parse(localStorage.getItem("articlesArray")))
        // console.log(this.state.articlesArray)
        
        // console.log(this.state.leftoverArticles)
        // console.log(JSON.parse(localStorage.getItem("newLeftoverArticles")))

        
        // const thingymajig = JSON.parse(localStorage.getItem("articleArray8"));
        // const thing4 = JSON.parse(localStorage.getItem("articleArray9"))
        // var filtered = thingymajig.filter(function (el) {
        //     return el != null;
        //   });
        // console.log(thing4)
        // console.log(filtered)
        // console.log(this.state.filteredPostArray)
        // console.log(firebaseDB)
        // console.log(JSON.parse(localStorage.getItem("editedArticleArray")))
        // const arrayWithArticlesHidden = JSON.parse(localStorage.getItem("editedArticleArray"));
         return (
            
            <div className="news-item-loop-wrapper"> 
            <React.Fragment>
                {/* <NewsItemLoopView databaseProp={filtered|| this.state.filteredPostArray || firebaseDB} /> 
                     */}
                     <NewsItemLoopView 
                        databaseProp={this.props.databaseProp} 
                        leftoverArticles={this.props.leftoverArticles}
                    /> 

                <ScrollToTopButton   />
            </React.Fragment>
            </div>
        );  
    }       
}
export default NewsItemLoop;