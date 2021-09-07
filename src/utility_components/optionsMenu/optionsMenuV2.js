import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
// Bookmarks
import clearAllBookmarks from '../bookmarks/clearAllBookmarks.js';
import hideAllArticles from '../bookmarks/hideAllArticles.js';
import unhideAllArticles from '../bookmarks/unhideAllArticles';

import "../optionsMenu/optionsMenu.css";

class OptionsMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            optionsMenuOpen:false,
            fullDatabaseCall:[],
            bookmarks:[],
            test:[]
        }
    }

    clearCache(removeFromCache){
        if(removeFromCache.includes("clearCache")){
            localStorage.clear()
            var arrayThing = ["260px","400px"]
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

    markAll(thingToChange,changeThingTo){
        var currentCards = this.props.currentCardArray;   
        var localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) || this.props.fullDatabaseCall;

        if(thingToChange === "hideread" ){
            console.log("Only Hide Read")
            localStorageCards.map(x => { 
                var getMatchingRecord = currentCards.filter(obj => obj.read === true && obj.id === x.id);
                if( getMatchingRecord.length > 0 ) x.markedforhide = changeThingTo;
                return x 
            }) 
        } else if(thingToChange === "hidenonbookmarked" ){
            localStorageCards.map(x => { 
                var getMatchingRecord = currentCards.filter(obj => obj.bookmarked === false && obj.id === x.id);
                if( getMatchingRecord.length > 0 ) x.markedforhide = changeThingTo;
                return x 
            }) 
        } else {
        localStorageCards.map(x => { 
            var getMatchingRecord = currentCards.filter(obj => obj.id === x.id);
            if( getMatchingRecord.length > 0 ) x[thingToChange] = changeThingTo;
            return x 
        }) 
    }
        this.props.updateBookmarkStatus(localStorageCards)
        localStorage.setItem("bookmarkArray", JSON.stringify(localStorageCards))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(localStorageCards))
    }

    sortAll(sortBy){
        console.log("Sort by" + sortBy)
        var currentCards = this.props.currentCardArray;

        currentCards.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) return 1;
            if (a[sortBy] < b[sortBy]) return -1;
            return 0;
        });        

        console.log(currentCards)
        this.props.updateBookmarkStatus(currentCards)
        localStorage.setItem("bookmarkArray", JSON.stringify(currentCards))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(currentCards))

        }

    render(){
        // console.log(this.props.urlInfo)
        console.log(this.props.currentCardArray)
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