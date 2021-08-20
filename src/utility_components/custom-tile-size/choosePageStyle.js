import React from "react"

export const ChoosePageStyle = (props) =>{

    const pageLayout1 = "Freeform"
    const pageLayout2 = "Single"
    const pageLayout3 = "Dual"
    const pageLayout4 = "Triple"
    const pageLayout5 = "Quad"

    // var testSize;
    // console.log(props.activeCardStyle)
    // console.log(props.pageLayout)
    // if(props.activeCardStyle === "Compact" && props.pageLayout === "Dual")
    //     {
    //         testSize = "960px"
    //         console.log("Success")
    //     }
    
    // else{
    //     testSize = "600px"
    //     console.log("Fail")
    // }

return(        
        <div>
           

            <React.Fragment>
            <span>----- Page Layout</span>
                



                    {props.cardStyle === "Compact" ? 
                    <React.Fragment >

                            {window.innerWidth <= 700 ? 
                            <React.Fragment >
                                <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout1)}>
                                    <span class="material-icons">view_list</span>
                                    {pageLayout1} Compact
                                </button>
                
                                <button  onClick={() => props.changePageLayout("column","0 auto",pageLayout2)}>
                                    <span class="material-icons">view_list</span>
                                    {pageLayout2} Compact
                                </button>
                            </React.Fragment>
                            :
                            <React.Fragment >


                            <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout1)}>
                                <span class="material-icons">view_list</span>
                                {pageLayout1} Compact
                            </button>

                            <button  onClick={() => props.changePageLayout("column","0 auto",pageLayout2)}>
                                <span class="material-icons">view_list</span>
                                {pageLayout2} Compact
                            </button>

                            <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout3,"960px")}>
                                <span class="material-icons">view_list</span>
                                {pageLayout3} Compact
                            </button>

                            <  button  onClick={() => props.changePageLayout("row","0 auto",pageLayout4,"1430px")}>
                                <span class="material-icons">view_list</span>
                                {pageLayout4} Compact
                            </button>               
                            
                            <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout5,"1910px")}>
                                <span class="material-icons">view_list</span>
                                {pageLayout5} Compact
                            </button>
                        </React.Fragment>
                            }

                    </React.Fragment>

                    :
                    null    
                }
                






















            {/* <React.Fragment>
                {props.cardStyle === "Different Compact" ? 
                <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout3)}>
                    <span class="material-icons">view_list</span>
                    Dual Different Compact
                </button>
                :
                null    
            } */}

            </React.Fragment>
                {/* <button  onClick={()=>props.updateStyles(pageLayout3)}>
                    <span class="material-icons">view_list</span>
                    {pageLayout3}
                </button> */}

                {/* <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout1)}>
                    <span class="material-icons">view_list</span>
                    {pageLayout1}
                </button>

                <button  onClick={() => props.changePageLayout("column","0 auto",pageLayout2)}>
                    <span class="material-icons">view_list</span>
                    {pageLayout2}
                </button>

                <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout3,"960px")}>
                    <span class="material-icons">view_list</span>
                    {pageLayout3}
                </button> */}
                {/*

                <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout4,"1430px")}>
                    <span class="material-icons">view_list</span>
                    {pageLayout4}
                </button>               
                
                 <button  onClick={() => props.changePageLayout("row","0 auto",pageLayout5,"1910px")}>
                    <span class="material-icons">view_list</span>
                    {pageLayout5}
                </button> */}


        </div>
    
        )
}

export default ChoosePageStyle;