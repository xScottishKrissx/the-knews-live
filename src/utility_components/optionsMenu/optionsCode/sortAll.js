export const SortAll = (currentCardArray,sortBy,order,updateBookmarkStatus, fullDatabaseCall) =>{
    
    // console.log(currentCardArray)
    console.log(sortBy)
    console.log(order)
    console.log(fullDatabaseCall)
    // console.log("Sort by" + sortBy + " " + order)
    let currentCards = currentCardArray;
    const localStorageCards = JSON.parse(localStorage.getItem("changedFullDatabaseCall")) ||fullDatabaseCall;
    
    console.log(localStorageCards)
    
    localStorageCards.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
    });        
    // console.log(currentCards)


    if(order === "asc"){
    //     // console.log(currentCards)
        updateBookmarkStatus(localStorageCards)
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(localStorageCards))
    }
    
    if(order === "desc"){
        localStorageCards.reverse()
        updateBookmarkStatus(localStorageCards)
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(localStorageCards))
    }

}

export default SortAll;