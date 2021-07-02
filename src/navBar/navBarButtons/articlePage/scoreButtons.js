import React from 'react';
import Button from 'react-bootstrap/esm/Button';

import HandleLike from '../../../utility_components/handleSocialScore/handleLike';

export const ScoreButtons = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showScoreButtons === true ?
        <div className="uiBarItem" id="scoreButtons">
            <Button title="Score" >
                <HandleLike 
                    id={props.id}
                    likes={props.likes}
                    dislikes={props.dislikes}
                    databaseId={props.databaseId}
                    liked={props.liked}
                    disliked={props.disliked}
                />
            </Button>
        </div> 
        :
        null
        }
    </>
)
}

export default ScoreButtons;