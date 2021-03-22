import React from 'react';
import update from 'immutability-helper';
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
                arrayStartState: 30,
                arrayEndState: 35,
                filteredPostArray:[],
            // This is a record of the posts hidden.
            postsArray:[],
            hiddenPosts:localStorage.getItem("hiddenPostList"),

            // Testing Stuff
            leftoverArticles:[],
            firstSlicePoint:0,
            secondSlicePoint:30,
            data:[]
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
        console.log("Hidden Articles -> " + localStorage.getItem("hiddenPostList"));
        

    // This is the initial database query.
     const dbRef = fire.database().ref('items').orderByKey().limitToFirst(60);    
    //  const dbRef = fire.database().ref('items').orderByChild("hidden").equalTo(false).limitToFirst(60);   
        
        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    id:newsItems[newsItem].id,
                    hidden:newsItems[newsItem].hidden,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    text: newsItems[newsItem].text,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    tag: newsItems[newsItem].tag
                    
                    
                });
            }
            this.setState({
                //Set's the initial number of articles loaded into home.
                articlesArray: newState.slice(0,this.state.secondSlicePoint),
                leftoverArticles: newState.slice(this.state.secondSlicePoint,60)
            })

            console.log(this.state.articlesArray)
        })        
        window.addEventListener('scroll', this.scroll);   
        // localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
    }

     componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
        
      }
    
    render(){

        // console.log(this.state.articlesArray)
        const firebaseDB = this.state.articlesArray;  
        // console.log(firebaseDB)
        localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
        // console.log(localStorage.getItem("articlesArray"))

        if(this.state.articlesArray.length != 0){

        // !!! IMPORTANT -- Update Record in Object in array
        // This is how i see the hide button functioning, only not from this file.
        const arrayWithMarkedAsHiddenArticles = JSON.parse(localStorage.getItem("articleArray8"));
        const collection2 = arrayWithMarkedAsHiddenArticles || this.state.articlesArray;
        console.log(collection2)
        console.log(arrayWithMarkedAsHiddenArticles)

            // This might be my answer to updating a single object in the array.
            // If it is then i can look at integrating this into the hide article button
            // const index4 = 319
            // var newData = collection2.map(el => {
            //     if(el.id == index4)
            //         return Object.assign({}, el, {hidden:"CHANGE"})
            //             return el
            // });
            // console.log(newData)


            // This is where the array would be filtered for hidden articles.
            const key = true
            // const myArr = newData.filter(obj => obj.hidden !== key);
            const myArr = collection2.filter(obj => obj.hidden !== key);
            const myArr3= this.state.leftoverArticles.filter(obj => obj.hidden !== key);
            console.log(myArr)
            // console.log(myArr3[0])
            // console.log(myArr3[1])
            // console.log(myArr3[2])

            const articlesToBeAddedToArray = this.state.secondSlicePoint - myArr.length; // How Many articles needed to be added
            // console.log(articlesToBeAddedToArray)
  
            var newArray = [];
            for(var i = 0; i < articlesToBeAddedToArray; i++){
                newArray.push(myArr3[i]); // COMBINE THE 3 NEW ARTICLES INTO ONE new ARRAY
                // console.log(newArray)
            }
            // COMBINE THE FILTERED ARRAY WITH THE NEW ARTICLES FROM NEWARRAY
            // COMBINE myArr with newArray
            // console.log(newArray)
            // console.log(myArr)
            // console.log(myArr.concat(newArray)) // HOLY HELL --- THIS IS IT!!!!! MAYBE.PROBABLY
            // console.log(...myArr,newArray)
    
            if(this.state.filteredPostArray.length === 0){
               
                this.setState({
                    filteredPostArray:myArr.concat(newArray)
                    // This gives me an initial, filtered array that can be used for the rest of the website.
                    // I need to think about how to deal with scrollCheck because i can think of a few issues of the top of my head.
                })
                // localStorage.setItem("articleArray7",this.state.filteredPostArray)
            }
            console.log(this.state.filteredPostArray)
            // Prepare filtered article array for use in other parts of website.
            localStorage.setItem("articleArray8",JSON.stringify(this.state.filteredPostArray))
            console.log(JSON.parse(localStorage.getItem("articleArray8")))
            




            
        }
        const thingymajig = JSON.parse(localStorage.getItem("articleArray8"));
        console.log(thingymajig)
         return (
            
            <div className="news-item-loop-wrapper"> 
            <React.Fragment>
                <NewsItemLoopView databaseProp={thingymajig|| this.state.filteredPostArray || firebaseDB} />     
                <ScrollToTopButton   />
            </React.Fragment>
            </div>
        );  
    }       
}
export default NewsItemLoop;