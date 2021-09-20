import React from 'react';
import toggleBookmark from '../../../utility_components/bookmarks/toggleBookmark';



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
            toggleBookmark(this.props.articleId,this.props.fullDatabaseCall,"remove")
        }else{
            this.setState({bookmarked:true})
            toggleBookmark(this.props.articleId,this.props.fullDatabaseCall,"create")
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