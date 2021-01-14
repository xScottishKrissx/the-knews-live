import React from 'react';
import fire from '../fire.js';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NavControls from '../utility_components/navControls.js';



import '../tags/tags.css';
import HideArticle from '../utility_components/hide-article/hide-article.js';
import ScrollCheck from '../utility_components/ScrollCheck.js';
import NewsItemLoopView from '../home-page/news-item-loop/news-item-caption/news-item-loop-view/news-item-loop-view.js';

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

            orderByChild: this.props.location.state.orderByChild,

            getNewArticlesUsing: this.props.location.state.author || this.props.location.state.searchDBFor
            
        }
    }
 
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
                        tag:newsItems[newsItem].tag,
                        text:newsItems[newsItem].text
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
                        tag:newsItems[newsItem].tag,
                        text:newsItems[newsItem].text
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
        console.log(new1)

        // const pageView = new1.map((value,key) => {
        //     const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
        //     const style = {
        //         backgroundImage: 'url(' + imgUrl + ')',
        //         backgroundPosition: "bottom",
        //         backgroundRepeat: "no-repeat",
        //         backgroundSize: "cover",
        //         height: "400px",
        //     }   

        //     return(
        //         <div className='news-square'  key={key} id={value.id}>    
        //         <HideArticle articleId={value.id}/>                
        //         <Caption 
        //             pageid={value.key} 
        //             style={style} 
        //             title={value.title}
        //             author={value.author}
        //             likes={value.likes}
        //             dislikes={value.dislikes}
                    
        //             />
                    
        // </div>
        //     )
        // })

        return(
            
            <div className="tags-wrapper">
                <div className="tags-item-wrapper">
                        <NavControls props="only-home-button"/>
                        {this.props.location.state.author === undefined ?
                        <h1>Showing articles from {this.props.location.state.searchDBFor}</h1>
                        : 
                        <h1>Showing articles from {this.props.location.state.author}</h1>
                        }              

                        <NewsItemLoopView databaseProp={new1}/>          
                        {/* {pageView} */}


                        <ScrollCheck 
                            tagState={this.props.location.state.tag}
                            authorState={this.props.location.state.author}
                            postdateState={this.props.location.state.postdate}
                            searchDBFor={this.props.location.state.searchDBFor}
                            origin={this.props.location.state.origin}
                            articleArray={this.state.articlesArray}

                            orderByChild={this.state.orderByChild}

                            databaseReference = {fire.database().ref('items').orderByChild(this.state.orderByChild).startAt(this.state.getNewArticlesUsing).endAt(this.state.getNewArticlesUsing)}
                        />
                </div>
            </div>
        )
    }
}
export default Tags;