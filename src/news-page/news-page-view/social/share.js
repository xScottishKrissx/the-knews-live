import React from 'react';
import './share.css';

const Share = () => {
    return (
        <div className="share-wrapper">
            
            <div className='social-channels-links'>
                
                <div className='share-icon share-myspace'>                    
                    <img alt="my-space" src={require('./logos/myspace-80px.png')} />
                </div>

                <div className='share-icon share-friendster'>                    
                    <img alt="Friendster" src={require('./logos/friendster-80px.png')} />
                </div>

                <div className='share-icon share-digg'>                    
                    <img alt="Digg It" src={require('./logos/digg-80px.png')} />
                </div>

                <div className='share-icon share-pocket'>                    
                    <img alt="Pocket" src={require('./logos/pocket-80px.png')} />
                </div>

                <div className='share-icon share-bebo'>                    
                    <img alt="Bebo" src={require('./logos/bebo-80px.png')} />
                </div>


            </div>
           
        </div>
    )
}

export default Share;