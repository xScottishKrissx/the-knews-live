import React from 'react';

export class HideArticleButton extends React.Component{
    
    render(){
        return(
            <>
                <div className="onCardHideButton">
                    {this.props.hideBookmarkedArticle === true ?

                        <button title="Permanently Remove Bookmark and Hide" onClick={()=>this.props.hideArticle(this.props.id)}>
                            <span class="material-icons">delete</span>
                        </button>

                    :

                        <button onClick={()=>this.props.hideArticle(this.props.id)}>

                            {this.props.hideStatus === true ? 
                                <span className="animateScale">
                                    <span title="Click to Unhide" class="material-icons">visibility_off</span>
                                </span>
                            :                
                                <span  title="Click to Hide" class="material-icons">visibility</span>
                            }

                        </button>       
                    }
                

                </div>  
            </>
        )
    }
}

export default HideArticleButton;