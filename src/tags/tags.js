import React from 'react';
import fire from '../fire.js';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NavControls from '../utility_components/navControls.js';



import '../tags/tags.css';
import HideArticle from '../utility_components/hide-article/hide-article.js';
import ScrollCheck from '../utility_components/ScrollCheck.js';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            arrayStartState: 5,
            arrayEndState: 10,
            test: this.props.location.state.tag || this.props.location.state.author || this.props.location.state.postdate,
            // test: this.props.location.state.tag,
            tagState: this.props.location.state.tag,
            searchDBFor: this.props.location.state.searchDBFor,
            origin: this.props.location.state.origin,

            
            
        }
    }
    // 
    
    
    
    
    
    
    
    
    
    
    // scroll = () => {
    //     const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    //     const body = document.body;
    //     const html = document.documentElement;
    //     const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    //     const windowBottom = windowHeight + window.pageYOffset;
        
    //     this.setState({
    //         scrollsaveScrollPosition: windowBottom
    //     })
        
    //     if(windowBottom >= docHeight){
    //         const dbRef = fire.database().ref('items').orderByChild("tag").startAt("Sports").endAt("Sports")
           
    //        dbRef.on('value', (snapshot) => {
    //            let newsItems = snapshot.val();
    //            let newState = [];
    //            for(let newsItem in newsItems){
    //                newState.push({
    //                    key: newsItem,
    //                    author: newsItems[newsItem].author,
    //                    title: newsItems[newsItem].title,
    //                    id:newsItems[newsItem].id
    //                });
    //            }

    //             const arrayStart = this.state.arrayStartState;
    //             const arrayEnd = this.state.arrayEndState;
    //             this.setState({               
    //             articlesArray2: newState.slice(arrayStart,arrayEnd),
    //             arrayStartState: this.state.arrayStartState + 5,
    //             arrayEndState: this.state.arrayEndState + 5
    //             })

    //             const renderNewArticlesOnScroll = this.state.articlesArray.concat(this.state.articlesArray2);
    //             this.setState({
    //                 articlesArray:renderNewArticlesOnScroll
    //             })    
                       
    //        })
    //         console.log("Bottom Reached")
    //         console.log(this.state.articlesArray)
    //     }else{
    //         // console.log("Not At Bottom Yet")
    //     }
    // }

    componentDidMount(){
        console.log(this.props.location.state.tag)
        
        if(this.state.origin === "Article"){
            console.log("Search Database for Tag --> " + this.props.location.state.author)
            console.log(this.state.test)
            console.log(this.state.searchDBFor)
            const dbRef = fire.database().ref('items').orderByChild(this.state.searchDBFor).startAt(this.state.test).endAt(this.state.test);

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
                    articlesArray: newState.slice(0,5)
                })
                console.log(this.state.articlesArray)
                localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
                window.addEventListener('scroll', this.scroll);
            })
        }

        if(this.state.origin === "Tagbar"){
           
            const dbRef = fire.database().ref('items').orderByChild("tag").startAt(this.props.location.state.searchDBFor).endAt(this.props.location.state.searchDBFor);
            
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
                    articlesArray: newState.slice(0,5)
                })
                // console.log(this.state.articlesArray)
                localStorage.setItem("articlesArray", JSON.stringify(this.state.articlesArray))
                // console.log(localStorage.getItem("articlesArray"))
                window.addEventListener('scroll', this.scroll);
            })
        }
        console.log(this.state.articlesArray)

        console.log("Current Tag --> " + this.state.tagState)
    }

   


    componentWillUnmount(){
        window.removeEventListener('scroll',this.scroll);
        fire.database().ref("items").off();
      }

    render(){
        const new1 = this.state.articlesArray;

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
                <HideArticle articleId={value.id}/>                
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
                        {this.props.location.state.author === undefined ?
                        <h1>Showing articles from {this.props.location.state.searchDBFor}</h1>
                        : 
                        <h1>Showing articles from {this.props.location.state.author}</h1>
                        }                        
                        {pageView}


                        <ScrollCheck 
                            tagState={this.props.location.state.tag}
                            authorState={this.props.location.state.author}
                            postdateState={this.props.location.state.postdate}
                            searchDBFor={this.props.location.state.searchDBFor}
                            origin={this.props.location.state.origin}
                            articleArray={this.state.articlesArray}
                        />
                </div>
            </div>
        )
    }
}
export default Tags;