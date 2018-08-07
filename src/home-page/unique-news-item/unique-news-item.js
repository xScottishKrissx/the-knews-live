import React from 'react';

import {Link} from 'react-router-dom';
import DummyData from '../dummy-data';

export const UniqueNewsItem = (props) => {
    const dummyNews = DummyData;
    const a = [];

    // This is the thing causing the problem I think.
    // If I could make this equal to value of something within the map below I
    // might have my solution for programatic unique shareable urls.
    
    const s = dummyNews[props.id];
    console.log("Props ID = " + props.id)
    a.push(s);

    // const news = a.map((value, key) => {
    const news = dummyNews.map((value, key) => {


        const imgUrl = "https://unsplash.it/500/200?random=" + value.id;
        const style = {
            //backgroundImage: 'url(' + imgUrl + ')',
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width:"100%"
        }

        return (
            <div className="news-item" style={style} id={value.id} key={key}>               

                        <Link 
                            className="news-item-link"
                            
                            to={{
                                pathname: '/news-item/' + value.id,
                                // pathname: '/news-item/:id',
                                state: {
                                    pageId: value.id,
                                    pageTitle: value.title,
                                    pageText: value.text,
                                    pageAuthor: value.author,
                                    pageLikes: value.likes,
                                    pageDislikes: value.dislikes,
                                    postDate: value.postdate,
                                    pageImage: style
                                }
                            }}>
                            
                        <div className="">
                            <span>{value.title}</span>
                        </div> 

                        </Link>
                   
                
            </div>
        )
    })
    return (
            <div className="">
                 {news}
            </div>
    );
}

export default UniqueNewsItem;