import React from 'react';
import { Link } from 'react-router-dom';

export class NextArticle extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
           
        }
    }

    render(){
        console.log(this.props.id)
        console.log(this.props.database)

        const database = this.props.database;
        const getArticle = this.props.database.filter(obj => obj.id === this.props.id )

        console.log(database.indexOf())




        return(
            <div className="nextArticleWrapper">
            <Link 
                onClick={()=>this.handleClick()} 
                to={{ 
                    pathname: getArticle[0].id , 
                    state: {articleId: getArticle[0].id} 
                }}>
                <div className="nextArticleContent">
                    <h3>Next Article</h3>
                    <p>{getArticle[0].title}</p>
                    <p>{getArticle[0].author}</p>
                </div>
                </Link>
            </div>
        )
    }
}

export default NextArticle;