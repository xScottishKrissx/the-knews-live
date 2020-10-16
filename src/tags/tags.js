import React from 'react';
import fire from '../fire.js';

import Caption from '../home-page/news-item-loop/news-item-caption/news-item-caption.js';
import NavControls from '../utility_components/navControls.js';


import '../tags/tags.css';

class Tags extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            articlesArray: []
        }
}

    componentDidMount(){
        console.log(this.props.location.state.tag)
        const dbRef = fire.database().ref('items').orderByChild("tag").startAt(this.props.location.state.tag).endAt(this.props.location.state.tag)

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
                    id:newsItems[newsItem].id
                });
            }

            this.setState({
                // articlesArray: newState.reverse(),
                articlesArray: newState.slice(0,50)
            })
            console.log(this.state.articlesArray);
            
        })
    }

    render(){

        const pageView = this.state.articlesArray.map((value,key) => {
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