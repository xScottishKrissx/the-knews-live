import MarkAsRead from "../../markAsRead";

export const MarkAsReadButton = (props) =>{

   function markAsRead(id,readStatus){
        console.log(id,readStatus)
        MarkAsRead(id,readStatus)
        if(props.updateProp)props.updateProp(readStatus)    
    }

return(
    
    <>
        {props.showMarkAsReadButton === false ?
            null
        :
            <div className="onCardMarkAsReadButton" >
                <button  onClick={()=>markAsRead(props.id, props.readStatus)}> 
                {props.readStatus === true ? 
                    <span title="Mark As Unread" class="material-icons" >check_circle</span>
                    :
                    <span title="Mark As Read" class="material-icons" >check_circle_outline</span>
                }
                </button>
            </div>  
        }
        
    </>

)
}

export default MarkAsReadButton;