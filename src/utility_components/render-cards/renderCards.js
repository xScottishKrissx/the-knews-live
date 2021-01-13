import React from 'react';

import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

class RenderCards extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            id:props.id,
            title: props.title,
            author: props.author,
            text: props.text,
            closePopup: props.closePopup,
            headerImage:props.id
        }
        this.getCardSize = this.getCardSize.bind(this);
    }

    render(){
        return(
                
            <div id={this.props.id} key={value.id} className="myClass">                   
                    {/* <span className="hideArticleBtn" onClick={() => this.swipeRightAction(value.id)}>Hide</span>        */}

                    <HideArticle articleId={value.id}/>     

                    <SwipeableList threshold= {0.25} swipeStartThreshold={1}>
                        <SwipeableListItem 
                            
                            swipeLeft={{
                                content: <SwipeLeftContent 
                                        id={value.id} 
                                        title={value.title} 
                                        author={value.author} 
                                        text={value.text} 
                                        closePopup={this.closePopup} 
                                        headerImage={value.id} />,
                                action: () => this.swipeLeftAction(value.text, value.id) 
                            }}
                            
                            swipeRight={{
                                content: <div>Hiding article...</div>, 
                                action: () => this.swipeRightAction(value.id)
                            }}
                        >
                                
                                <div className='news-square'  key={key}  
                                style={ this.state.startingCardSize || this.state.changedCardSize } >                    
                                    <Caption 
                                        pageid={value.key}
                                        style={style}
                                        title={value.title}
                                        author={value.author}
                                        likes={value.likes}
                                        dislikes={value.dislikes}
                                        articleId={value.id}
                                        />
                                </div>
                        
                        </SwipeableListItem>
                        </SwipeableList>
                </div>
        )
    }
}

export default RenderCards;