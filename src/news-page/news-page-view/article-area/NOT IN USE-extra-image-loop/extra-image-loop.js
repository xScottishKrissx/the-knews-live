import React from 'react';
import './extra-image-loop.css';

const ExtraImageLoop = (title) => {
    let i;
    let imagesArray = [];
    for(i = 0; i < 3; i++){        
        imagesArray.push(<img key={i} src={"https://unsplash.it/500/200?random=" + (i * 12 ) } alt="the-knews-extra-images" />)
    }
    return (
        <div className="extra-images">
            {imagesArray}
        </div>
    );
}

export default ExtraImageLoop;