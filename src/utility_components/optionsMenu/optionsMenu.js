import React,{Component} from 'react';
import {Link} from 'react-router-dom';

// Menu Elements
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// Options Menu
import "../optionsMenu/optionsMenu.css";
import MarkAll from './optionsCode/markAll.js';
import SortAll from './optionsCode/sortAll.js';

class OptionsMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            bookmarks:[],
            defVal:localStorage.getItem("showReadCards"),
            sortOrder: localStorage.getItem("sortOrder") || "asc",
            sortBy:localStorage.getItem("sortBy") || "postdate"
        }
    }

    clearCache(removeFromCache){
        if(removeFromCache.includes("clearCache")){
            localStorage.clear()
            const arrayThing = ["260px","400px"]
            localStorage.setItem("savedCardStyle", JSON.stringify(arrayThing));

        }              
    }

    markAll(thingToChange,changeThingTo,toggle){
        MarkAll(
            this.props.currentCardArray, 
            this.props.fullDatabaseCall,
            thingToChange,
            changeThingTo,
            this.props.updateBookmarkStatus            
        )
        // console.log(toggle)
        
    }
    handleForm = (x) =>{
        this.setState({defVal:x})
        localStorage.setItem("showReadCards",x)
        MarkAll(
            this.props.currentCardArray, 
            this.props.fullDatabaseCall,
            "toggleRead",
            x,
            this.props.updateBookmarkStatus
        )
    }
    sortAll(sortBy,order){
       console.log("SortAll")
        // console.log(sortBy,order)
        SortAll(this.props.currentCardArray,sortBy,order,this.props.updateBookmarkStatus, this.props.fullDatabaseCall,)
        localStorage.setItem("sortBy",JSON.stringify(sortBy))
        localStorage.setItem("sortOrder",JSON.stringify(order))

        // console.log(localStorage.getItem("sortBy"))

        this.setState({
            sortBy:sortBy, 
            sortOrder:order
        })
    }

    render(){
        //  localStorage.clear()
        const defVal = this.state.defVal || 1;
        // console.log(JSON.parse(localStorage.getItem("sortBy")))
        // console.log(defVal)

        // const getSortOrder = JSON.parse(localStorage.getItem("sortBy"))
        let sortBy = this.state.sortBy
        let sortOrder = this.state.sortOrder

        // console.log(sortBy)
        // console.log(sortOrder)
        return (
            <div id="optionsMenuWrapper">
                
                <span className="menuBorder"></span>                                     
                <React.Fragment >

                    <Accordion defaultActiveKey="0">
                    
                    {/******************* Full Website Reset */}
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1" block>
                                    <i class="bi bi-caret-down"></i>Full Website Reset
                                </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="1" className="accordionItems">
                                <span>
                                    <Link to='/' onClick={()=> this.clearCache("clearCache")}>
                                        <i class="bi bi-caret-right-fill"></i>Full Website Reset
                                    </Link>
                                </span>
                                {/* <Link to='/' onClick={()=> this.clearCache("clearCache")}><span>Confirm</span></Link> */}
                            </Accordion.Collapse>
                        </Card>


                    {/******************* Bookmarks */}
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    <i class="bi bi-caret-down"></i>Bookmarks</Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="2" className="accordionItems" >

                                    <span onClick={()=> this.markAll("bookmarked",true)}>                                     
                                        <i class="bi bi-caret-right-fill"></i>Mark All As Bookmarked
                                    </span>    

                            </Accordion.Collapse>
                            <Accordion.Collapse eventKey="2" className="accordionItems">
                                    <span onClick={()=> this.markAll("bookmarked",false)}>
                                        <i class="bi bi-caret-right-fill"></i>Remove All Bookmarks
                                    </span>    
                            </Accordion.Collapse>
                        </Card>



                    {/******************* Hiding Cards */}
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="3"><i class="bi bi-caret-down"></i>Hide Cards</Accordion.Toggle>
                            </Card.Header>
                            
                            <Accordion.Collapse eventKey="3" className="accordionItems">
                                    <span onClick={()=> this.markAll("markedforhide",true)}>
                                        <i class="bi bi-caret-right-fill"></i>Hide All</span> 
                            </Accordion.Collapse>
                            <Accordion.Collapse eventKey="3" className="accordionItems">
                                    <span onClick={()=> this.markAll("markedforhide",false)}>
                                        <i class="bi bi-caret-right-fill"></i>Unhide All</span>
                            </Accordion.Collapse>
                            
                            <Accordion.Collapse eventKey="3" className="accordionItems"> 
                                    <span onClick={()=> this.markAll("hidenonbookmarked",true)}>
                                        <i class="bi bi-caret-right-fill"></i>Hide Non-Bookmarked</span>
                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="3" className="accordionItems"> 
                                    <span onClick={()=> this.markAll("hideread",true)}>
                                        <i class="bi bi-caret-right-fill"></i>Hide Read</span>
                            </Accordion.Collapse>
                        </Card>


                    {/******************* Read Cards */}
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                                    <i class="bi bi-caret-down"></i>
                                    Read Cards
                                </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                <span onClick={()=> this.markAll("read",true)}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Mark All As Read
                                </span>
                            </Accordion.Collapse>     

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                    <span onClick={()=> this.markAll("read",false)}>
                                        <i class="bi bi-caret-right-fill"></i>
                                        Mark All Unread
                                    </span>
                            </Accordion.Collapse>   

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                <span onClick={()=>this.handleForm("Show")}>
                                    <i class="bi bi-caret-right-fill"></i>   
                                    Show Read Cards 
                                    {defVal === "Show" ? <span><i class="bi bi-circle-fill"></i></span> : null} 
                                </span>                                                                         
                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                <span onClick={()=>this.handleForm("Hide")}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Don't Show Read Cards 
                                    {defVal === "Hide" ? <span><i class="bi bi-circle-fill"></i></span> : null} 
                                </span>
                            </Accordion.Collapse>
                            
                        </Card> 

                    {/******************* Sorting */}
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                    <i class="bi bi-caret-down"></i>Sort Cards
                                </Accordion.Toggle>
                            </Card.Header>
                            
                        {/* Tag */}
                        {sortBy.includes("tag") && sortOrder.includes("desc") ? 
                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                <span onClick={()=>this.sortAll("tag","asc")}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Sort By Tag  
                                    {sortBy.includes("tag") ? <span> <i class="bi bi-sort-alpha-down"></i></span> : null}
                                </span>
     
                            </Accordion.Collapse>
                        :
                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                <span onClick={()=>this.sortAll("tag","desc")}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Sort By Tag
                                    {sortBy.includes("tag") ? <span>   <i class="bi bi-sort-alpha-up"></i></span> : null}
                                </span>
                            </Accordion.Collapse>
                        }                        

                        {/* Author */}
                        {sortBy.includes("author") && sortOrder.includes("desc") ? 
                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                <span onClick={()=>this.sortAll("author","asc")}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Sort By Author 
                                    {sortBy.includes("author") ? <span><i class="bi bi-sort-alpha-down"></i></span> : null}
                                </span>
                            </Accordion.Collapse>
                        :
                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                <span onClick={()=>this.sortAll("author","desc")}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Sort By Author {sortBy.includes("author") ? <span><i class="bi bi-sort-alpha-up"></i></span> : null}
                                </span>
                            </Accordion.Collapse>
                        }

                        {/* Post Date */}
                        {sortBy.includes("postdate") && sortOrder.includes("desc") ? 
                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                <span onClick={()=>this.sortAll("postdate","asc")}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Oldest First{sortBy.includes("postdate") ? <span><i class="bi bi-circle-fill"></i></span> : null}
                                </span>
                            </Accordion.Collapse>
                        :
                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                <span onClick={()=>this.sortAll("postdate","desc")}>
                                    <i class="bi bi-caret-right-fill"></i>
                                    Latest First {sortBy.includes("postdate") ? <span><i class="bi bi-circle-fill"></i></span> : null}
                                </span>
                            </Accordion.Collapse>
                        }

                        {/* Reset */}
                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                    <span onClick={()=>this.sortAll("postdate","asc")}>
                                        <i class="bi bi-caret-right-fill"></i>
                                        Reset Sort
                                    </span>
                            </Accordion.Collapse>

                        </Card>

                    </Accordion>
                </React.Fragment>

                        
            </div>
        )
    }
}

export default OptionsMenu;