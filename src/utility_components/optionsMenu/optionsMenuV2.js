import React,{Component} from 'react';
import {Link} from 'react-router-dom';

// Menu Elements
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
// Bookmarks
import clearAllBookmarks from '../bookmarks/clearAllBookmarks.js';
import hideAllArticles from '../bookmarks/hideAllArticles.js';

// Options Menu
import "../optionsMenu/optionsMenu.css";
import MarkAll from './optionsCode/markAll.js';
import SortAll from './optionsCode/sortAll.js';

class OptionsMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            bookmarks:[],
            defVal:localStorage.getItem("showReadCards") 
        }
    }

    clearCache(removeFromCache){
        if(removeFromCache.includes("clearCache")){
            localStorage.clear()
            const arrayThing = ["260px","400px"]
            localStorage.setItem("myData", JSON.stringify(arrayThing));

        }              
    }

    clearBookmarks(){
        clearAllBookmarks();
        this.setState({bookmarks:[]})
    }

    hideAllArticles(){
        hideAllArticles();
        this.setState({bookmarks:[]})
    }

    markAll(thingToChange,changeThingTo,toggle){
        MarkAll(
            this.props.currentCardArray, 
            this.props.fullDatabaseCall,
            thingToChange,
            changeThingTo,
            this.props.updateBookmarkStatus            
        )
        console.log(toggle)
        
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
    sortAll(sortBy){
        SortAll(this.props.currentCardArray,sortBy,this.props.updateBookmarkStatus)
        }

    render(){
        const defVal = this.state.defVal || 1;
        // console.log(defVal)
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
                                    <i class="bi bi-caret-down"></i>Read Cards
                                </Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                <span onClick={()=> this.markAll("read",true)}>
                                    <i class="bi bi-caret-right-fill"></i>Mark All As Read</span>
                            </Accordion.Collapse>     

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                    <span onClick={()=> this.markAll("read",false)}><i class="bi bi-caret-right-fill">
                                        </i>Mark All Unread</span>
                            </Accordion.Collapse>   

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                    <span>
                                        <i class="bi bi-caret-right-fill"></i>                                       
                                        <span onClick={()=>this.handleForm("Show")}>
                                            Show Read Articles 
                                            {defVal === "Show" ? <i class="bi bi-circle-fill"></i> : <i class="bi bi-circle"></i>} 
                                        </span>                                      
                                    </span>
                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="4" className="accordionItems">
                                    <span>
                                        <i class="bi bi-caret-right-fill"></i>                                       
                                        <span onClick={()=>this.handleForm("Hide")}>
                                            Hide Read Articles 
                                            {defVal === "Hide" ? <i class="bi bi-circle-fill"></i> : <i class="bi bi-circle"></i>} 
                                        </span>                                      
                                    </span>
                            </Accordion.Collapse>


                            
                        </Card> 

                    {/******************* Sorting */}
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                                    <i class="bi bi-caret-down"></i>Sort Cards</Accordion.Toggle>
                            </Card.Header>

                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                    <span onClick={()=>this.sortAll("tag")}>
                                        <i class="bi bi-caret-right-fill"></i>Sort By Tag</span>
                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                    <span onClick={()=>this.sortAll("author")}>
                                        <i class="bi bi-caret-right-fill"></i>Sort By Author</span>
                            </Accordion.Collapse>

                            <Accordion.Collapse eventKey="5" className="accordionItems">
                                    <span onClick={()=>this.sortAll("postdate")}>
                                        <i class="bi bi-caret-right-fill"></i>Reset Sort</span>
                            </Accordion.Collapse>
                        </Card>

                    </Accordion>
                </React.Fragment>

                        
            </div>
        )
    }
}

export default OptionsMenu;