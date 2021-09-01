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
            bookmarks:[]
        }
    }

    clearCache(removeFromCache){
            // console.log("Clear Cache" + " " + removeFromCache)
            if(removeFromCache.includes("clearCache")){
                console.log("Full Website Reset")
                localStorage.clear()
                var arrayThing = ["260px","400px"]
                localStorage.setItem("myData", JSON.stringify(arrayThing));
            }
                
            if(removeFromCache.includes("unhideArticles")){
                unhideAllArticles();
                window.location.reload();
            }

            if(removeFromCache.includes("resetCardSize")){
                localStorage.removeItem("myData")
                var arrayThing = ["260px","400px"]
                localStorage.setItem("myData", JSON.stringify(arrayThing));
                window.location.reload();
            }

            if(removeFromCache.includes("removeBookmarks")){
                clearAllBookmarks(); }

        // this.toggleMenu()
        
    }

    clearBookmarks(){
        clearAllBookmarks();
        this.setState({bookmarks:[]})
    }

    hideAllArticles(){
        hideAllArticles();
        this.setState({bookmarks:[]})
    }

    markAllBookmarks(x){







        console.log(this.props.currentCardArray)
        const currentCards = this.props.currentCardArray;







        // console.log(removeUndefined)

        // let n = 0;
        // var setBookmarkTrue = []
        // while (n < removeUndefined.length - 1 ){
            // n++
            // console.log(removeUndefined[n].id)

            // var filterCards = this.state.test || currentCards.filter(x=> x.hidden === false)

            // setBookmarkTrue = filterCards.map(el => {
            //     if(el.id === removeUndefined[n].id && el != null )
            //         return Object.assign({}, el, {bookmarked:true, hidden:false, markedforhide:false})
            //         return el
            // });   
            // console.log(setBookmarkTrue)
            // this.setState({test:setBookmarkTrue})

        // }
        // console.log(n)
        // console.log(this.state.test)
        // var filterCards = currentCards.filter(x=> x.hidden === false)

        // var setBookmark = filterCards.map(el => {
        //     if(el != null )
        //         return Object.assign({}, el, {bookmarked:x, hidden:false, markedforhide:false})
        //         return el
        // });   

        const localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        console.log(localStorageCards)
        console.log(setBookmarkTrue)
        // localStorage.setItem("bookmarkArray", JSON.stringify(setBookmark))
        // localStorage.setItem("changedFullDatabaseCall", JSON.stringify(setBookmark))
    }
    render(){
        // console.log(this.props.urlInfo)

        return (
            <div id="optionsMenuWrapper">
                
                        <span className="menuBorder"></span>                        
                        {/* <span>
                            <p>Full Website Reset</p>
                            <Link to='/' onClick={()=> this.clearCache("clearCache")}><span>Confirm</span></Link>
                        </span>
                        
                        <span>
                            <p>Unhide Articles </p>
                            <Link to={this.props.urlInfo} onClick={()=> this.clearCache("unhideArticles")}><span>Confirm</span></Link>
                        </span>
                        
                        <span>
                            <p>Reset Card Size </p>
                            <Link to={this.props.urlInfo} onClick={()=> this.clearCache("resetCardSize")}><span>Confirm</span></Link>
                        </span>   

                        <span>
                            <p>Clear Bookmarks</p>
                            <Link to='/' onClick={()=> this.clearCache("removeBookmarks")}><span>Confirm</span></Link>
                        </span>  */}
             
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
            <Accordion.Toggle as={Button} variant="link" eventKey="2"><i class="bi bi-caret-down"></i>Bookmarks</Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="2" className="accordionItems" >
                <span onClick={()=> this.markAllBookmarks(true)}>
                    
                        <i class="bi bi-caret-right-fill"></i>Mark All As Bookmarked
                    
                </span>    
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="2" className="accordionItems">
                <span onClick={()=> this.markAllBookmarks(false)}>
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
                <span><i class="bi bi-caret-right-fill"></i>Mark All As Bookmarked</span> 
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="3" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Remove All Bookmarks</span>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="3" className="accordionItems"> 
                <span ><i class="bi bi-caret-right-fill"></i>Remove All Bookmarks</span>
        </Accordion.Collapse>
    </Card>


{/******************* Read Cards */}
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="4"><i class="bi bi-caret-down"></i>Read Cards</Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="4" className="accordionItems">
            <span ><i class="bi bi-caret-right-fill"></i>Mark All As Read</span>
        </Accordion.Collapse>       
        <Accordion.Collapse eventKey="4" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Mark All Unread</span>
        </Accordion.Collapse>
    </Card> 

{/******************* Sorting */}
    <Card>
        <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="5"><i class="bi bi-caret-down"></i>Sort Cards</Accordion.Toggle>
        </Card.Header>

        <Accordion.Collapse eventKey="5" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Sort By Tag</span>
        </Accordion.Collapse>
        <Accordion.Collapse eventKey="5" className="accordionItems">
                <span ><i class="bi bi-caret-right-fill"></i>Sort By Author</span>
        </Accordion.Collapse>
    </Card>



</Accordion>





        {/* <span ><span class="material-icons">done_all</span>Full Website Reset</span>
        -
        <span ><span class="material-icons">done_all</span>Mark All As Bookmarked</span>
        <span ><span class="material-icons">done_all</span>Remove All Bookmarks</span>
        -
        <span ><span class="material-icons">done_all</span>Hide All Cards</span>
        <span ><span class="material-icons">done_all</span>Unhide All Cards</span>
        <span ><span class="material-icons">done_all</span>Hide Mark as Read only</span>
        -
        <span ><span class="material-icons">done_all</span>Mark All Read</span>
        <span ><span class="material-icons">done_all</span>Mark All Unread</span>        
        -
        <span ><span class="material-icons">done_all</span>Sort By Author</span>
        <span ><span class="material-icons">done_all</span>Sort By Date</span>
        <span ><span class="material-icons">done_all</span>Sort By Tag</span> */}

                            </React.Fragment>

                        
            </div>
        )
    }
}

export default OptionsMenu;