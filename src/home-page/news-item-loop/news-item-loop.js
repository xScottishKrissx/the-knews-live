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
            // This is a record of the posts hidden.
            postsArray:[],
            hiddenPosts:localStorage.getItem("hiddenPostList"),

            todoItems: [
                {
                  name: 'Learn React Basics',
                  status: 'pending'
                }, {
                  name: 'Check Codebase',
                  status: 'pending'
                }
              ],

            // Testing Stuff
            articlesArray4:[],
            leftoverArticles:[]
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
                articlesArray: newState.slice(0,30),
                leftoverArticles: newState.slice(30,60)
            })

            console.log(this.state.articlesArray)


            const articlesArrayCopy = JSON.parse(JSON.stringify(this.state.articlesArray))
            //make changes to ingredients
            articlesArrayCopy[0].hidden = true
            this.setState({
               articlesArray4:articlesArrayCopy 
             }) 
            console.log(this.state.articlesArray4)
        })        
        window.addEventListener('scroll', this.scroll);   
        // localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))



          
        //   const obj = {a: 5, b: 3};
        //   // => {a: 5, b: 6}
        //   // This is equivalent, but gets verbose for deeply nested collections:
        //   const newObj2 = update(obj, {b: {$set: obj.b * 2}});

        //   console.log(newObj2)

        //   let key = 1;
        //   this.setState(prevState => ({
          
        //     todoItems: prevState.todoItems.map(
        //       el => el.key === key? { ...el, status: 'done' }: el
        //     )
          
        //   }))


           
  
          console.log(this.state.todoItems)

        // const newCollection = update(this.state.articlesArray)

    }

    // 0: {key: "6", id: 319, hidden: undefined, author: "PA Media", title: "Huawei: UK bans new 5G network equipment from September", …}1: {key: "7", id: 546, hidden: undefined, author: "Callie Medina", title: "lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse", …}
    // 2: {key: "8", id: 536, hidden: undefined, author: "Ivory Alford", title: "lectus convallis est, vitae sodales nisi magna sed", …}

     componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
        localStorage.setItem("hiddenPosts", localStorage.getItem("hiddenPosts"));
        
      }
    
    render(){

        // const articlesArray = this.state.articlesArray;
        // // => {a: 5, b: 6}
        // // This is equivalent, but gets verbose for deeply nested collections:
        // const newObj3 = update(articlesArray, {29: {$set: true}});

        // console.log(newObj3)
        // console.log(this.state.articlesArray)

        // const collection = {children: ['zero', 'one', 'two']};
        // const index = 1;
        // const newCollection = update(collection, {children: {[index]: {$set: 1}}});

        // const collection = this.state.articlesArray;
        // const arrayIndex = 1;
        // // const newCollection = update(collection, {
        // //     [arrayIndex]: 
        // //         {"hidden": 
        // //             {$set: true}
        // //         }
        // //     }
        // // );
        // const newCollection = update(collection, {
        //     0:{"hidden":{$set: true}}
        // })

        // console.log(newCollection)

        // !IMPORTANT = Updating a record in array
        const collection = [1, 2,3];
        const newCollection = update(collection, {0: {$set: 5}});
        console.log(newCollection)

        // Next - Update Record in Object in array
        // const collection2 = this.state.articlesArray;
        // const newCollection2 = update(collection2, {0:{"hidden": {$set: 5}}});
        // console.log(newCollection2)

        // console.log(this.state.articlesArray)
        const firebaseDB = this.state.articlesArray;  
        console.log(firebaseDB)
        localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
        // console.log(localStorage.getItem("articlesArray"))

        if(this.state.articlesArray.length != 0){
            console.log("Empty Array")
            const collection2 = this.state.articlesArray;
            const newCollection2 = update(collection2, {0:{"hidden": {$set: true}}});
            console.log(newCollection2)
            // I guess this does what I want...but how does it help?

            const key = "6"
            const myArr = this.state.articlesArray.filter(obj => obj.key !== key);
            console.log(myArr)
            console.log(this.state.leftoverArticles)
            const myArr2 = myArr.concat(this.state.leftoverArticles[0])
            console.log(myArr2)
            // So here I've managed to remove the first object from the main array and append the first object of the leftover artices...
            // .. is there something here?
        }



        
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