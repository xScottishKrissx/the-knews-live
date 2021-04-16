import React from 'react';
// import HeaderImage from '../../../../../news-page/news-page-view/header-image/header-image.js';
import ParseHTML from '../../../../../utility_components/parse-database-html/parse-html.js';

import "../swipe-views/article-modal.css";

export const SwipeLeftContent = (props) => {
    const id = props.id;
    const title = props.title;
    const author = props.author;
    const text = props.text;
    const closePopup = props.closePopup;

    return(
        <div>
            <div 
            className="articlePopupBackground" 
            id={"articlePopupBackground" + id} 
            onClick={() => closePopup(id)} 
            ></div>


            <div className="article-popup" id={"popup" + id}>
            
                {/* <img src="https://the-knews.s3.eu-west-2.amazonaws.com/027+-+0fVAsZf.jpg" /> */}
                {/* <HeaderImage props={id} /> */}
                <section>
                        <h2>{title}</h2>
                        <h3>{author}</h3>
                        <p><ParseHTML props={text}/></p>
                </section>
                    <button onClick={()=> closePopup(id)}>    
                        <span>Close Popup</span>
                    </button>
                
                
            </div>
        </div>
    )
}

export default SwipeLeftContent;