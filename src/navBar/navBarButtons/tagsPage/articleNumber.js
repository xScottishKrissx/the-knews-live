import React from 'react';
// styles in navbar.css

export const ArticleNumber = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showArticleCounter === true ?
            <div className="uiBarItem" title="Number of Articles found" id="articleNumberCount"> 
                <div>               
                    {props.articleNumberCount === 1 ?
                        <p><strong>{props.articleNumberCount}</strong> article</p>
                        :  
                        <p> <strong>{props.articleNumberCount}</strong> articles</p>
                    }
                </div>              
            </div>
        :
            null
        }
    </>
)
}

export default ArticleNumber;