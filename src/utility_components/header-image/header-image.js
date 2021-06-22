import React from 'react';
import './header-image.css';

const HeaderImage = (props) =>{
    const imgUrl = "https://unsplash.it/200/200?random=" + props.props;
    
    const style = {
        backgroundImage: 'url(' + imgUrl + ')',        
    }
    return   (    
        <div className="article-banner-image extra-banner-image" loading="lazy" style={style}>
            <div class="bannerImageTextWrapper">
                <span>{props.headline}</span>
            </div>
        </div>
    )
}

export default HeaderImage;