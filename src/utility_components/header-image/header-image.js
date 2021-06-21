import React from 'react';
import './header-image.css';

const HeaderImage = (props) =>{
    const imgUrl = "https://unsplash.it/2000/2000?random=" + props.props;
    
    const style = {
        backgroundImage: 'url(' + imgUrl + ')',        
    }
    return       <div className="article-banner-image extra-banner-image" loading="lazy" style={style}></div>;
}

export default HeaderImage;