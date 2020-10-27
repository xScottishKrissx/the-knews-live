import React from 'react';
import './header-image.css';

const HeaderImage = (props) =>{
    const imgUrl = "https://unsplash.it/2560/1440?random=" + props.props;
    
    const style = {
        backgroundImage: 'url(' + imgUrl + ')',
        // backgroundPosition: "bottom",
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // height: "400px",
        // maxWidth:"1200px",
        // width:"100%"
        
    }
    return(
        <div className="article-banner-image extra-banner-image" style={style}></div>
    )
}

export default HeaderImage;