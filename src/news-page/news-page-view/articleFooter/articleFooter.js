import React from 'react';
import RecommendedReading from '../recommendedReading/recommendedReading';
import AuthorInfo from '../../../utility_components/aboutAuthor/aboutAuthor';

import './articleFooter.css';



export const ArticleFooter = (props) =>{
    const setRandomColour = JSON.parse(localStorage.getItem("headerColour")) || {backgroundColor:"black"};
    const database = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || props.database
    
        return(
               <div className="articleFooterWrapper" style={setRandomColour}>
                    
                    <AuthorInfo 
                        database={database} 
                        id={props.id}                        
                        author={props.author}
                        tag={props.tag}
                        arrayFromDatabase={props.articlesArray}
                        leftoverArticles={props.leftoverArticles}
                        fullDatabaseCall={props.fullDatabaseCall}
                    />

                    <RecommendedReading database={database} />
  

            </div>
                
                
        )
    }
    
    export default ArticleFooter;