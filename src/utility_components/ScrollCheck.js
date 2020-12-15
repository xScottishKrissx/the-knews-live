import React from 'react';

import fire from '../fire.js';


import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';

class ScrollCheck extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: localStorage.getItem("articlesArray"),
            arrayStartState: 5,
            arrayEndState: 10,
            test: props.tagState || props.authorState || props.postdateState,
            // test: this.props.location.state.tag,
            tagState: props.tagState,
            searchDBFor: props.searchDBFor,
            origin: props.origin,
            articlesArray2:[],
            articlesArray3:[]

            
            
        }
    }
    componentDidMount(){
        localStorage.getItem("articlesArray")
        window.addEventListener('scroll', this.scroll);
        console.log(this.props.articlesArray)
        console.log(localStorage.getItem("articlesArray"))
        
        const thing = localStorage.getItem("articlesArray")
        console.log("Articles Array --> " + thing)
    }

    scroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        
        
        
        if(windowBottom >= docHeight){
            console.log(this.state.articlesArray)
            const dbRef = fire.database().ref('items').orderByChild(this.state.searchDBFor).startAt(this.state.test).endAt(this.state.test)
           
           dbRef.on('value', (snapshot) => {
               let newsItems = snapshot.val();
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
                this.setState({               
                articlesArray2: newState.slice(arrayStart,arrayEnd),
                arrayStartState: this.state.arrayStartState + 5,
                arrayEndState: this.state.arrayEndState + 5
                })

                const renderNewArticlesOnScroll = this.state.articlesArray.concat(this.state.articlesArray2);
                this.setState({
                    articlesArray3:renderNewArticlesOnScroll
                })    
                       
           })
            console.log("Bottom Reached")
        }else{
            console.log("Not At Bottom Yet")
        }
    }
    render(){
        console.log(this.state.articlesArray3)

        const new1 = Array.from(this.state.articlesArray3);
        console.log(new1)
        const pageView = new1.map((value,key) => {
            const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "400px",
            }   
            return(
                <div className='news-square'  key={key} id={value.id}>    
                    {/* <HideArticle articleId={value.id}/>                 */}
                    <Caption 
                        pageid={value.key} 
                        // style={style} 
                        title={value.title}
                        author={value.author}
                        likes={value.likes}
                        dislikes={value.dislikes}
                        
                        />
                        
                </div>
            )
        })
        return(
            <div>{pageView}</div>
        )
    }
}

export default ScrollCheck;