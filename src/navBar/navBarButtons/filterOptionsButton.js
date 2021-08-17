import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FilterOptions from '../../utility_components/filterOptions/filterOptions';
// styles in navbar.css

export const FilterOptionsButton = (props) =>{
    
return(
    // react-fragment - <> + </>
    <>
        {props.filter === true ?
            <div className="uiBarItem" title="Filter By Tag" id="filterDropdown">
                <DropdownButton 
                    id="filterBtn" 
                    title={ 
                        <div className="dropdownBtnTitle">
                            <div id="filterOptionDisplay">
                                {props.getArticle === "All" ?                                         
                                    <span>
                                        <span className="material-icons">filter_alt</span>
                                        <p>No Filter</p>
                                    </span>                                           
                                    :                                   
                                    <span>
                                        <span id="filterActive" className="material-icons">filter_alt</span>
                                        <p className="filterIsActive">Filter: { props.getArticle }</p>
                                        {/* <span> ({this.props.bookmarkNumber})</span> */}
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