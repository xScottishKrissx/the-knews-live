export const SocialScore = (props) =>{
    
return(
    <>

    {props.liked === true  || props.disliked === true ? 
        <div className="onCardSocialScore" >
            <button> 
                {props.liked === true ? 
                        <span title="You liked this article"  className="large material-icons">thumb_up_alt</span> 
                    : 
                        null
                    }
            
                {props.disliked === true ? 
                        <span title="You disliked this article"  className="large material-icons">thumb_down_alt</span> 
                    : 
                        null
                    }
            </button>
        </div>  
    :
        null
    }

    </>
)
}

export default SocialScore;