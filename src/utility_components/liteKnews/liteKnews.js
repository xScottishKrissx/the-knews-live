import React,{Component} from 'react';
import HeaderImage from '../header-image/header-image';
import {Link} from 'react-router-dom';
import ParseHTML from '../parse-database-html/parse-html.js';

class LiteKnews extends Component {

    constructor(props){
        super(props);
        this.state = {articleNumber:0}
        this.changeArticle = this.changeArticle.bind(this);
    }

    changeArticle(x,y){this.setState({articleNumber: this.state.articleNumber + x })}

    render(){
     
    // const articleFromArray = this.props.renderToPage[this.state.articleNumber];
    
    const filterHidden = this.props.renderToPage.filter(obj => obj.hidden === false)
    // console.log(filterHidden)
    const articleFromArray = filterHidden[this.state.articleNumber]
    
    // console.log(JSON.parse(localStorage.getItem("changedFullDatabaseCall")))
    // console.log(articleFromArray.id)
        return (
            <div id="liteKnewsWrapper">
                <div id="speedKnews">                
                    <div id="speedKnewsWrapper" >
                    <h1>liteKnews - theKnews but lighter</h1>
                    
                        <div className="speedKnewsArticleContainer">

                            <header>
                                <HeaderImage props={articleFromArray.id}/>
                                <h2>{articleFromArray.title}</h2>
                                <h3>by: {articleFromArray.author}</h3>
                                <Link 
                                
                                    to={{
                                        pathname:'/theKnews/home/articles/news-page/' + articleFromArray.key,
                                        state:{ articleId:articleFromArray.id}
                                    }}
                                    
                                
                                >
                                    <h3>View Article Page</h3></Link>
                                {/* <p>{articleFromArray.text}</p> */}
                            </header>
                            <article><ParseHTML props={articleFromArray.text}/></article>
                         

                        </div>
                        
                        <div id="speedKnewsControls">
                        {this.state.articleNumber === 0 ? 
                           <span>
                            <button onClick={this.props.closeLiteKnews}><span className="material-icons">close</span></button>

                            <button className="mutedBtn"><span className="material-icons">skip_previous</span></button>
                            <button onClick={() => this.changeArticle(+1)}><span className="material-icons">skip_next</span></button>
                           </span>
    
                            :
                            <span>
                                

                                <button onClick={this.props.closeLiteKnews}>
                                    <span className="material-icons">close</span>
                                </button>



                                {this.state.articleNumber > -2 && this.state.articleNumber === this.props.renderToPage.length - 1 ? 
                                <span>
                                    
                                    <button onClick={() => this.changeArticle(-1,articleFromArray.id)}><span className="material-icons">skip_previous</span></button>
                                    <button className="mutedBtn"><span className="material-icons">skip_next</span></button>
                                </span>
                                :
                                <span>
                                    
                                    <button onClick={() => this.changeArticle(-1,articleFromArray.id)}><span className="material-icons">skip_previous</span></button>
                                    <button onClick={() => this.changeArticle(+1)}><span className="material-icons">skip_next</span></button>
                                </span>
                                }

                            </span>
                        }
                            {/* <button onClick={() => this.changeArticle(+1)}>Next Article</button>
                            <button onClick={this.closeLiteKnewsView}>Exit</button> */}
                        </div>
                        
                    </div>
                </div>
            
            </div>
        )
    }
}

export default LiteKnews;