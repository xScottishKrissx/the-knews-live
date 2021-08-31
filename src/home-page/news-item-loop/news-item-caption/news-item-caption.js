import React from 'react';
import {Link} from 'react-router-dom';

import './news-item-caption.css';

export class Caption extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            status:false
        }
        this.dragFriendlyCaption = this.dragFriendlyCaption.bind(this);

    }

    dragFriendlyCaption(e){e.preventDefault();}

    handleClick(x){
        // console.log("Show Article")
        // document.getElementById("cardId"+x).classList.add("test1")
       console.log(this.state.status)
        if(this.state.status === true){
            document.getElementById("cardId"+x).classList.add("removeHeight")
            document.getElementById("cardId"+x).classList.remove("addHeight")

            this.setState({status:false})
        }
        if(this.state.status === false){
            document.getElementById("cardId"+x).classList.add("addHeight")            
            document.getElementById("cardId"+x).classList.remove("removeHeight")

            this.setState({status:true})
        }
    }
    
    render(){
        const pageId = this.props.id;
        const title = this.props.title;
        const author = this.props.author;
        const tag = this.props.tag;
        const imageId = this.props.imageId;
        const imgUrl = "https://unsplash.it/192/108?random=" + imageId;
        var randomNumber = Math.floor(Math.random() * 2) + 1; 

        const style = {
            backgroundImage: 'url(' + imgUrl + ')',
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "auto",
            // maxWidth:"1200px",
            width:"100%",

            animation:"animateCardsIn",
            animationDuration:randomNumber + "s"
            
        }
    
        return (            

             <Link 
                className="news-item-link" 
                to={{
                    pathname: '/theKnews/home/articles/news-page/' + imageId,
                    state:{
                        articleObject: this.props.test, 
                        articleId:this.props.articleId
                        }
                }}
                
            >
                <div style={style} loading="lazy">
                    <div className="news-item-link-text" id={"cardId"+imageId} onClick={this.dragFriendlyCaption}>
                        <span id="news-item-link-text-title">{title}</span>
                        <span id="news-item-link-text-tag-author-wrapper">
                            <span id="news-item-link-text-tag">
                            <Link 
                                    className="newsItemLink"  
                                    to={{
                                        pathname: '/theKnews/home/search/tag/' + this.props.tag , 
                                        state: {
                                            author: this.props.tag, 
                                            searchDBFor: "tag",
                                            origin: "Article", 
                                            orderByChild: "tag"}
                                    }}
                                >
                                {this.props.tag}
                            </Link>
                            </span>

                            {/* <span id="news-item-link-text-author">by {author}</span> */}
                            <span id="news-item-link-text-author">
                                <Link 
                                    className="newsItemLink"
                                
                                    to={{
                                        pathname: '/theKnews/home/search/author/' + this.props.author , 
                                        
                                        state:{
                                            author: this.props.author, 
                                            tag:this.props.tag,
                                            searchDBFor: "author",
                                            origin: "Article", 
                                            orderByChild: "author",
                                            thingFromArticle:this.props.tag,
                                            arrayFromDatabase:this.props.arrayFromDatabase,
                                            leftoverArticles:this.props.leftoverArticles,
                                            fullDatabaseCall:this.props.fullDatabaseCall
                                            }
                                        }}>
                                        {this.props.author}
                                </Link>
                            </span>
                            {/*
                            // Slide Up Caption that i might want to use.
                                <button className="showThing" onClick={()=>this.handleClick(imageId)}>
                                    {this.state.status === true ? 
                                    <span class="material-icons"> arrow_drop_down</span>
                                    :
                                    <span class="material-icons"> arrow_drop_up</span>
                                    }
                                </button> 
                            */}

                        </span>

                    </div>                    
                </div> 
            </Link>
        );
    }
} 

export default Caption;