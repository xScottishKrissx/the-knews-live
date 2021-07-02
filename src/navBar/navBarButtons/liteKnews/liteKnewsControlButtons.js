import React from 'react';
import Button from 'react-bootstrap/esm/Button';


export const LiteKnewsControlButtons = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showLiteKnewsControls === true ?
        <div className="uiBarItem" id="navBarLiteKnewsWrapper">
            <Button title="controls for lite knews" >
                <div id="navBarLiteKnewsControls">
                    
                    <button title="go to previous article" onClick={props.prevArticle}>
                        <span className="material-icons">skip_previous</span>
                    </button>

                    <button title="close lite knews" onClick={props.closeLiteKnews}>
                        <span className="material-icons">close</span>
                    </button>

                    <button title="go to next article" onClick={props.nextArticle}>
                        <span className="material-icons">skip_next</span>
                    </button>
                    
                </div>
            </Button>
        </div> 
        :
        null
        }
    </>
)
}

export default LiteKnewsControlButtons;