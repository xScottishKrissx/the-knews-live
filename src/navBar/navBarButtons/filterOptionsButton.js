import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FilterOptions from '../../utility_components/filterOptions/filterOptions';
// styles in navbar.css

export const FilterOptionsButton = (props) =>{
    // console.log(props.getFilteredArticles)
return(
    // react-fragment - <> + </>
    <>
        {props.filter === true ?
            <div className="uiBarItem" title={"Current Filter is " + props.getArticle + ", click to change"} id="filterDropdown">
                <DropdownButton 
                    id="filterBtn" 
                    title={ 
                        <div className="dropdownBtnTitle">
                            <div id="filterOptionDisplay">
                                {props.getArticle === "All" ?                                         
                                    <span>
                                        <span className="material-icons">filter_alt</span>
                                        <span className="bookmarkCounter">{props.currentCardCount}</span>
                                    </span>                                           
                                    :                                   
                                    <span>
                                        {/* <span id="filterActive" className="material-icons">filter_alt</span> */}

                                        {props.getArticle === "Sports" ? 
                                        <>
                                            <span class="material-icons">emoji_events</span> 
                                            
                                          </>  
                                        : null
                                        }
                                        
                                        {props.getArticle === "News" ? 
                                            <span class="material-icons">article</span> 
                                        : null
                                        }

                                        {props.getArticle === "Weather" ? 
                                            <span class="material-icons">cloud_queue</span> 
                                        : null
                                        }

                                        {/* Counter Next to filter icon */}
                                        <span className="bookmarkCounter">{props.filterCounter}</span>
                                    </span>                                        
                                }
                            </div>
                        </div>
                    }>

                    {props.bookmarked === true ? 
                        <FilterOptions 
                            fullDatabaseCall = {props.fullDatabaseCall} 
                            getFilteredArticles = {props.getFilteredArticles}
                            bookmarked={true}                           
                        />
                    :
                        <FilterOptions 
                            fullDatabaseCall = {props.tagsArray || props.fullDatabaseCall} 
                            getFilteredArticles = {props.getFilteredArticles}
                            bookmarked={false}
                            tagsArray={props.tagsArray}
                            filterPage={props.filterPage}
                            // Tags
                            paramA={props.paramA}    
                            paramB={props.paramB}
                        />
                    }

                </DropdownButton>
            </div>
        :
            null
        }
    </>
)
}

export default FilterOptionsButton;