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
            hiddenPosts:localStorage.getItem("hiddenPostList"),

            // New Checking Cache
            testNewArray:[]
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
     const dbRef = fire.database().ref('items').orderByKey().limitToFirst(10);    
        
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
                articlesArray: newState.slice(0,50)
            })

        })        
        window.addEventListener('scroll', this.scroll);   
    }

     componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
      }
    

    render(){

        const firebaseDB = this.state.articlesArray; 
        console.log(firebaseDB) 

        const array = this.state.articlesArray;
        console.log(array.splice(1,1))

        console.log(array)

        const removeIfHidden = function(array, attribute, value){
            var i = array.length;
            while(i--){
                if(array[i]
                    && array[i].hasOwnProperty(attribute)
                    && (arguments.length > 2 && array[i][attribute] === value)
                    ){
                        array.splice(i,1)
                    }
            }
            return array;
        }

        console.log(removeIfHidden(this.state.articlesArray, "id",319))
        console.log(this.state.postsArray)
        const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
        const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
        console.log(formattedPostsArray)
        const newArray = removeIfHidden(this.state.articlesArray, "id",formattedPostsArray[2]);

        const thing1 = function(originalArray,formattedArray){
            var i = formattedArray.length;
            for(var i = 0; i < formattedPostsArray.length; i++){
                console.log(formattedArray[i])
                console.log(removeIfHidden(originalArray,"id",formattedArray[i]))
            }
            return removeIfHidden(originalArray,"id",formattedArray[i]);
        }
        console.log(thing1(this.state.articlesArray,formattedPostsArray))
        const thing2  = thing1(this.state.articlesArray,formattedPostsArray);
        console.log(thing2)
        console.log(newArray)
     
         return (
            
            <div className="news-item-loop-wrapper"> 
            <React.Fragment>
                <NewsItemLoopView databaseProp={thing2} />     
                <ScrollToTopButton   />
            </React.Fragment>
            </div>
        );  
    }       
}
export default NewsItemLoop;