import React from 'react';
import './header-image.css';

const HeaderImage = (props) =>{
    const imgUrl = "https://unsplash.it/2560/1440?random=" + props.props;
    
    const style = {
        backgroundImage: 'url(' + imgUrl + ')',        
    }
    return       <div className="article-banner-image extra-banner-image" style={style}>1</div>;
}

export default HeaderImage;