import React from 'react';
import { Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton'
// styles in navbar.css

export const LinkToArticleButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.showLinkToArticleButton === true ?                            
                <div className="uiBarItem" title="Go to full article page to this article.">
                    <Link 
                        to={{ 
                            pathname:'/theKnews/home/articles/news-page/' + props.id,
                            state:{ articleId:props.id}
                        }}
                    >

                        <DropdownButton  
                            id="articleLinkBtn" 
                            title={ 
                                <div className="dropdownBtnTitle">
                                    <span className="material-icons">article</span>
                                    {/* <p>Full Page</p> */}
                                </div>
                            }> 
                        </DropdownButton>
                    </Link> 
                </div>
            :
                null
            }
    </>
)
}

export default LinkToArticleButton;