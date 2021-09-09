export const MarkAll = (currentCardArray, fullDatabaseCall,thingToChange,changeThingTo,updateBookmarkStatus) =>{
    
    const currentCards = currentCardArray;   
    const localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||fullDatabaseCall;

    if(thingToChange === "hideread" ){
        console.log("Only Hide Read")
        localStorageCards.map(x => { 
            const getMatchingRecord = currentCards.filter(obj => obj.read === true && obj.id === x.id);
            if( getMatchingRecord.length > 0 ) x.markedforhide = changeThingTo;
            return x 
        }) 
    } else if(thingToChange === "hidenonbookmarked" ){
        localStorageCards.map(x => { 
            const getMatchingRecord = currentCards.filter(obj => obj.bookmarked === false && obj.id === x.id);
            if( getMatchingRecord.length > 0 ) x.markedforhide = changeThingTo;
            return x 
        }) 
    } else {
    localStorageCards.map(x => { 
        const getMatchingRecord = currentCards.filter(obj => obj.id === x.id);
        if( getMatchingRecord.length > 0 ) x[thingToChange] = changeThingTo;
        return x 
    }) 
}
    // this.props.updateBookmarkStatus(localStorageCards)
    updateBookmarkStatus(localStorageCards)
    localStorage.setItem("bookmarkArray", JSON.stringify(localStorageCards))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(localStorageCards))
}

export default MarkAll;