import React from 'react';

export default class HandleLike extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            clickedid:"0",
            // likeGraphic: require('./assets/like.png'),
            likeGraphic: 'https://christopherdunne.co.uk/react-cards-project/static/media/like.df7ce1e7.png',
            currentLikes:0,
            isLike:false,
        }
        this.clicked = this.clicked.bind(this); 
    }
    
    clicked(e){       


        const y = this.state.isLike;
        const currentCardId = document.getElementById(e.currentTarget.id).id;
        // console.log("Card ID... " + currentCardId);        
        this.setState({
            clickedid:currentCardId
        })

        // console.log("Clicked ID is.." + this.state.clickedid);     

        if (y === false ){
            this.setState({           
                likeGraphic: 'https://christopherdunne.co.uk/react-cards-project/static/media/dislike.6ebbb798.png',
                currentLikes: this.state.currentLikes + 1,
                isLike: true
            })        
            
        }else if(y === true ){          

          this.setState({
            // likeGraphic: require('./assets/like.png'),
            likeGraphic: 'https://christopherdunne.co.uk/react-cards-project/static/media/like.df7ce1e7.png',
            currentLikes: this.state.currentLikes - 1,
            isLike: false
            })
            
        }else{
            return null;
        }       

    }
    
    render(){
        const newLikes  = this.state.currentLikes + this.props.likes;
        // console.log(newLikes);
        console.log(this.props.id)
        return (
            <div className="likes">
                                
                <img 
                    className="like" 
                    id={this.props.id} 
                    newcarddata={this.props.id} 
                    onClick={this.clicked} 
                    src={this.state.likeGraphic} 
                    alt="like" 
                />
                <p>{newLikes} | {this.props.dislikes}</p>
            </div> 
        ); 

    }
}