import React from 'react';
import fire from '../fire.js';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NavControls from '../utility_components/navControls.js';



import '../tags/tags.css';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            arrayStartState: 5,
            arrayEndState: 10,
            test: this.props.location.state.tag
        }
    }


    componentDidMount(){
        console.log("Articles" + this.state.articlesArray)
        const dbRef = fire.database().ref('items').orderByChild("tag").startAt(this.state.test).endAt(this.state.test)

        dbRef.on('value', (snapshot) => {
            let newsItems = snapshot.val();
            // console.log(newsItems);
            let newState = [];
            for(let newsItem in newsItems){
                newState.push({
                    key: newsItem,
                    author: newsItems[newsItem].author,
                    title: newsItems[newsItem].title,
                    likes: newsItems[newsItem].likes,
                    dislikes: newsItems[newsItem].dislikes,
                    id:newsItems[newsItem].id,
                    tag:newsItems[newsItem].tag
                });
            }

            this.setState({
                // articlesArray: newState.reverse(),
                articlesArray: newState.slice(0,5)
            })
            // console.log(this.state.articlesArray);
            window.addEventListener('scroll', this.scroll);
            
        })
    }

    // componentWillUnmount(){
    //  fire.database().ref("items").off();
    // }

    // filterArray(){

    //     console.log()
    //     const getArray = this.state.articlesArray;

    //     const thing = getArray.find(o => o.tag === 'Sports');
    //     console.log(thing)
    
    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
    //    console.log(docHeight);
    //    console.log(windowBottom)
        
        this.setState({
            scrollsaveScrollPosition: windowBottom
        })

        if(windowBottom >= docHeight){
            //console.log(this.state.newCount)
            const dbRef = fire.database().ref('items').orderByChild("tag").startAt(this.state.test).endAt(this.state.test)
            
           
           dbRef.on('value', (snapshot) => {
               let newsItems = snapshot.val();
               // console.log(newsItems);
               let newState = [];
               for(let newsItem in newsItems){
                   newState.push({
                       key: newsItem,
                       author: newsItems[newsItem].author,
                       title: newsItems[newsItem].title,
                       id:newsItems[newsItem].id
                   });
               }

               const arrayStart = this.state.arrayStartState;
               const arrayEnd = this.state.arrayEndState;
               console.log(this.state.articlesArray2)
               this.setState({               
                articlesArray2: newState.slice(arrayStart,arrayEnd),
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
               })
               console.log(this.state.articlesArray)
            //    console.log(this.state.arrayStartState)
            //    console.log(this.state.articlesArray2)
               
            const renderNewArticlesOnScroll = this.state.articlesArray.concat(this.state.articlesArray2);
               this.setState({
                   articlesArray:renderNewArticlesOnScroll
               })    
                       
           })

            console.log("Bottom Reached")
        }else{
            console.log("Not At Bottom Yet")
        }
    }

    componentWillUnmount(){
        // console.log("Unmount on news-item-loop.js")
        // window.addEventListener('scroll', this.scroll);
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
      }

    render(){


        // this.filterArray("Sports", this.state.articlesArray);
        // const test1 = this.props.location.state.tag;
        // console.log("State Says::" + test1)
        const new1 = this.state.articlesArray;
        const pageView = new1.map((value,key) => {
            

            const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
            ///... and this.
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "400px",
                // width:"100%"
            }   

            return(
                <div className='news-square'  key={key}>                    
                <Caption 
                    pageid={value.key} 
                    style={style} 
                    title={value.title}
                    author={value.author}
                    likes={value.likes}
                    dislikes={value.dislikes}
                    
                    />
                    
        </div>
            )
        })

        return(
            <div className="tags-wrapper">
                <div className="tags-item-wrapper">
                        <NavControls props="only-home-button"/>
                        <h1>{this.props.location.state.tag}</h1>
                        {pageView}
                        
                </div>
            </div>
        )
    }
}

export default Tags;