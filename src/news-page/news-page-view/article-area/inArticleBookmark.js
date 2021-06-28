import React from 'react';
import createBookmark from '../../../utility_components/bookmarks/createBookmark';
import removeBookmark from '../../../utility_components/bookmarks/removeBookmark';
import updateBookmarkStyles from '../../../utility_components/bookmarks/updateBookmarkStyle';

export class InArticleBookmark extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {

        }
    }
    componentDidMount(){
        this.setState({
            bookmarked:this.props.bookmarked,
            read:this.props.read
        })
    }

    handleClick(){

        if(this.state.bookmarked === true){
            this.setState({bookmarked:false})
            removeBookmark(this.props.articleId)
        }else{
            this.setState({bookmarked:true})
            createBookmark(this.props.articleId,this.props.fullDatabaseCall)
        }
    }
    render(){
        return(
            <div>
                
                {this.state.bookmarked === false ? 
                    <button onClick={()=>this.handleClick()}>
                        <span  class="material-icons" id={this.props.articleId + "bookmarkIcon"}>turned_in_not</span>
                    </button>
                    :
                    <button onClick={()=>this.handleClick()}>
                        <span  class="material-icons" id={this.props.articleId + "bookmarkIcon"}>turned_in</span> 
                    </button>
                }

                   {this.state.read === false ? 
                       <p>Not Read</p>
                       :
                       <p>Read</p>
                   }
            </div>
        )
    }
}

export default InArticleBookmark;