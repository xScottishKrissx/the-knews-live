import React from "react"

export const ChooseCardStyle = (props) =>{

    const size1 = "Compact"
    const size2 = "Different Compact"
    const size3 = "Standard"
    const size4 = "Long"
    const size5 = "Thick"
    const size6 = "Big Squares"

    // console.log(props.pageLayout)
    console.log(window.innerWidth)
    var w = window.innerWidth
return(
    <React.Fragment>
        
        {props.showCardStyleOptions === true ? 
        <div>
             <span>----- Card Style</span>
             {/* {props.pageLayout === "Freeform" ? <p>Freeform</p> : null} */}

{/* 
                <button onClick={()=>props.updateStyles("Card Style")}>
                    <span class="material-icons">view_list</span>
                    {size1}
                </button> */}

{props.pageLayout === "Freeform" ? 
                
                <React.Fragment>
                 <button  onClick={() => props.changeCardSize("470px","135px",size1)}>
                    <span class="material-icons">view_list</span>
                    Compact
                </button>

                <button  onClick={() => props.changeCardSize("225px","225px",size2)}>
                    <span class="material-icons">view_list</span>
                    Different Compact
                </button>
                
                <button  onClick={() => props.changeCardSize("260px","400px",size3)}>
                    <span class="material-icons">view_list</span>
                    Standard
                </button>
                
                <button  onClick={() => props.changeCardSize("260px","73vh",size4)}>
                    <span class="material-icons">view_list</span>
                    Long
                </button>
                
                <button  onClick={() => props.changeCardSize("470px","800px",size5)}>
                    <span class="material-icons">view_list</span>
                    Thick
                </button>
                
                <button  onClick={() => props.changeCardSize("520px","520px",size6)}>
                    <span class="material-icons">view_list</span>
                    Big Squares
                </button> 
                </React.Fragment>
                :
                null}

                {props.pageLayout === "Single" ? 
                
                <React.Fragment>
                 <button  onClick={() => props.changeCardSize("470px","135px",size1)}>
                    <span class="material-icons">view_list</span>
                    Single Compact
                </button>

                <button  onClick={() => props.changeCardSize("225px","225px",size2)}>
                    <span class="material-icons">view_list</span>
                    Single Different Compact
                </button>
                
                <button  onClick={() => props.changeCardSize("260px","400px",size3)}>
                    <span class="material-icons">view_list</span>
                    Single Standard
                </button>
                
                <button  onClick={() => props.changeCardSize("260px","73vh",size4)}>
                    <span class="material-icons">view_list</span>
                    Single Long
                </button>
                
                <button  onClick={() => props.changeCardSize("470px","800px",size5)}>
                    <span class="material-icons">view_list</span>
                    Single Thick
                </button>
                
                <button  onClick={() => props.changeCardSize("520px","520px",size6)}>
                    <span class="material-icons">view_list</span>
                    Single Big Squares
                </button> 
                </React.Fragment>
                :
                null}

                {props.pageLayout === "Dual" ? 
                
                    <React.Fragment>
                    <button  onClick={() => props.changeCardSize("470px","135px",size1)}>
                        <span class="material-icons">view_list</span>
                        Dual Compact
                    </button>

                    <button  onClick={() => props.changeCardSize("330px","225px",size2)}>
                        <span class="material-icons">view_list</span>
                        Dual Different Compact
                    </button>
                    
                    <button  onClick={() => props.changeCardSize("260px","400px",size3)}>
                        <span class="material-icons">view_list</span>
                        Dual Standard
                    </button>
                    
                    <button  onClick={() => props.changeCardSize("260px","73vh",size4)}>
                        <span class="material-icons">view_list</span>
                        Dual Long
                    </button>
                    
                    <button  onClick={() => props.changeCardSize("470px","800px",size5)}>
                        <span class="material-icons">view_list</span>
                        Dual Thick
                    </button>
                    
                    <button  onClick={() => props.changeCardSize("520px","520px",size6)}>
                        <span class="material-icons">view_list</span>
                        Dual Big Squares
                    </button> 
                    </React.Fragment>
                :
                    null
                }





        </div>
                :
                null

                
        }
        
    </React.Fragment >
    
)
}

export default ChooseCardStyle;