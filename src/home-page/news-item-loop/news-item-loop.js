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
            articlesArray5:[],
            articlesArray6:[],
            articlesArray7:[],
            leftoverArticles:[],
            secondSlicePoint:0,
            secondSlicePoint:30,
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
                leftoverArticles: newState.slice(30,60)
            })

            console.log(this.state.articlesArray)


            const articlesArrayCopy = JSON.parse(JSON.stringify(this.state.articlesArray))
            //make changes to ingredients
            articlesArrayCopy[0].hidden = true
            this.setState({
               articlesArray4:articlesArrayCopy 
             }) 
            // console.log(this.state.articlesArray4)
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
        // console.log(newCollection)

        // Next - Update Record in Object in array
        // const collection2 = this.state.articlesArray;
        // const newCollection2 = update(collection2, {0:{"hidden": {$set: 5}}});
        // console.log(newCollection2)

        // console.log(this.state.articlesArray)
        const firebaseDB = this.state.articlesArray;  
        // console.log(firebaseDB)
        localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
        // console.log(localStorage.getItem("articlesArray"))

        if(this.state.articlesArray.length != 0){
            // console.log("Empty Array")
            const collection2 = this.state.articlesArray;
            const newCollection2 = update(collection2, {0:{"hidden": {$set: true}}});
            // console.log(newCollection2)
            // I guess this does what I want...but how does it help?

            // console.log(this.state.articlesArray.length)

            
            // for(var i = 0; i < 30; i++){
            //     console.log(i)
            // }







            // !!!! DONT REMOVE VERY IMPORTANT -- START
            // const key = "6"
            // const myArr = this.state.articlesArray.filter(obj => obj.key !== key);
            // console.log(myArr)

            // console.log(this.state.leftoverArticles)
            // const myArr2 = myArr.concat(this.state.leftoverArticles[0])
            // console.log(myArr2)
            // So here I've managed to remove the first object from the main array and append the first object of the leftover artices...
            // .. is there something here?
            // !!!! DONT REMOVE VERY IMPORTANT -- END

            // for(var i = 0; i <= 15; i++){
            //     console.log(i)
            //     // const myArr = this.state.articlesArray.filter(obj => obj.index !== i );
            //     // console.log(myArr)
                
            //     // this.state.articlesArray.forEach(element => console.log(element));
            //     // console.log(this.state.articlesArray[i])
            //     // console.log(this.state.articlesArray[i]);

            //     const key = true;
            //     const myArr = this.state.articlesArray.filter(obj => obj.hidden !== key);
            //     // console.log(myArr)

            // // console.log(this.state.leftoverArticles)
            // // const myArr2 = myArr.concat(this.state.leftoverArticles[i])
            // // console.log(myArr2)
            //     const newArray = [];
            //     if(this.state.articlesArray[i].hidden === true){
            //         console.log(this.state.articlesArray[i])
            //         newArray.push(this.state.articlesArray[i])
            //     }
            //     console.log(newArray[1])
            // }

            // const index = 0
            // const myArr3 = this.state.articlesArray.filter(obj => obj.index !== index);
            // console.log(myArr3)
            // console.log(this.state.articlesArray4)

            // const key = true
            // const myArr = this.state.articlesArray.filter(obj => obj.hidden !== key);
            // const myArr3= this.state.leftoverArticles.filter(obj => obj.hidden !== key);
            // console.log(myArr)

            // console.log(this.state.leftoverArticles)
            // const myArr2 = myArr.concat(myArr3)
            // console.log(myArr2)

                        // !!!! DONT REMOVE VERY IMPORTANT -- START
            const key = true
            const myArr = this.state.articlesArray.filter(obj => obj.hidden !== key);
            const myArr3= this.state.leftoverArticles.filter(obj => obj.hidden !== key);
            console.log(myArr)
            console.log(myArr3[0])
            console.log(myArr3[1])
            console.log(myArr3[2])

            // if(myArr.length < 30){
            
            // const thing2 = 30 - myArr.length; // How Many articles needed to be added
            // console.log(thing2)
  

            // for(var i = 0; i < thing2; i++){
            //     // var myArr6={};
            //     console.log(i)
            // //    const myArr6 = myArr.concat(myArr3[i])

            // //  const myArr6 = myArr.concat(myArr3[i]) // This will add the correct records to the array but overwrites each time.

            // //  const myArr6 = myArr.push.apply(myArr3[i])
            //     // const myArr6 = [...myArr,myArr3[i]]
            //     console.log(myArr3[i])
            //     var newArray = [];
            //     newArray.push(myArr3[i]);
            //     console.log(newArray)
                

            //     // console.log(myArr6)
            // }
            //     // console.log("Add Something to Array")
            //     // const myArr6 = myArr.concat(myArr3)
            //     // console.log(myArr6)
            // }

            const thing2 = this.state.secondSlicePoint - myArr.length; // How Many articles needed to be added
            console.log(thing2)
  
            var newArray = [];
            for(var i = 0; i < thing2; i++){
                // var myArr6={};
                console.log(i)
            //    const myArr6 = myArr.concat(myArr3[i])

            //  const myArr6 = myArr.concat(myArr3[i]) // This will add the correct records to the array but overwrites each time.

            //  const myArr6 = myArr.push.apply(myArr3[i])
                // const myArr6 = [...myArr,myArr3[i]]
                console.log(myArr3[i])
                newArray.push(myArr3[i]); // THIS DOES WHAT I WANT!!!!, COMBINES THE 3 NEW ARTICLES INTO ONE ARRAY
                console.log(newArray)
                

                // console.log(myArr6)
            }
            // COMBINE THE FILTERED ARRAY WITH THE NEW ARTICLES FROM NEWARRAY
            // COMBINE myArr with newArray
            console.log(newArray)
            console.log(myArr)
            console.log(myArr.concat(newArray)) // HOLY HELL --- THIS IS IT!!!!! MAYBE.PROBABLY
    
            if(this.state.articlesArray7.length === 0){
                this.setState({
                    articlesArray7:myArr.concat(newArray)
                    // This gives me an initial, filtered array that can be used for the rest of the website.
                    // I need to think about how to deal with scrollCheck because i can think of a few issues of the top of my head.
                })
                localStorage.setItem("articleArray7",this.state.articlesArray7)
            }
            console.log(this.state.articlesArray7)
            
            // var arr = [];
            // for(var i = 0; i < 5; i++){
            //     arr.push(i);
            // }
            // console.log(arr)
    
            console.log(this.state.leftoverArticles)
            const myArr2 = myArr.concat(myArr3)
            console.log(myArr2)
            console.log(this.state.articlesArray5)
            if(this.state.articlesArray5.length === 0)
            this.setState({
                articlesArray5:myArr2
            })
            console.log(this.state.articlesArray5)


            // So this might be what i want. I now have an array filtered for stuff I DONT WANT.
            // I would need to however, compare the hidden post list for post id instead of an object...i think.

                        // !!!! DONT REMOVE VERY IMPORTANT -- END

            const localStorageHiddenPosts = localStorage.getItem("hiddenPostList");
                                    // !!!! DONT REMOVE VERY IMPORTANT -- Start
            const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
            // console.log(formattedPostsArray)
            const myArr4 = this.state.articlesArray.filter(obj => obj.id !== formattedPostsArray);
            console.log(myArr4)

                        
            // for(var i = 0; i < 30; i++){
            //     const myArr4 = this.state.articlesArray.filter(obj => obj.id !== formattedPostsArray[i]);
            //     console.log(myArr4)
            // }
            // const myArr5 = this.state.articlesArray.filter(obj => obj.id !== formattedPostsArray);
            const myArr5=this.state.articlesArray;
            const checkExist = setInterval(function() {
        
                if (!!localStorageHiddenPosts) {
                // console.log("Exists!");
                clearInterval(checkExist);
            
                const formattedPostsArray = localStorageHiddenPosts.split(',').map(Number)
                console.log(formattedPostsArray)
                console.log(myArr5)
    
                for(var i = 0; i < formattedPostsArray.length; i++){
                    if(!!formattedPostsArray && formattedPostsArray[i].toString() === myArr5[i].id.toString()){
                        console.log("Hidden Post Identified " + formattedPostsArray[i])
                        console.log(myArr5[i].id.toString())
                        console.log(formattedPostsArray[i])
                        console.log(formattedPostsArray[i].toString())
                        // document.getElementById(props.id).style.display = "none";
                        // console.log("Success: " + props.id + " hidden");
                        // console.log(formattedPostsArray[i]);
                    }
                }        
    
                }
            }, 100);
            // Ok so i now have a successul comparison between the filtered array and the hidden post list.
            // I don't know if that's a good thing but it can't be a bad thing...right
                                    // !!!! DONT REMOVE VERY IMPORTANT -- END

              // initialize array
                    var arr = ["Hi", "Hello", "Bonjour", "Hola"];

                    // append multiple values to the array
                    arr.push("Salut", "Hey");

                    // display all values
                    for (var i = 0; i < arr.length; i++) {
                    console.log(arr[i]);
                    }
        }



        
         return (
            
            <div className="news-item-loop-wrapper"> 
            <React.Fragment>
                <NewsItemLoopView databaseProp={this.state.articlesArray7 || firebaseDB} />     
                <ScrollToTopButton   />
            </React.Fragment>
            </div>
        );  
    }       
}
export default NewsItemLoop;