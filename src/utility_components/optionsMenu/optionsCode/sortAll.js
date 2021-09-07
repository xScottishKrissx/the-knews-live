export const SortAll = (currentCardArray,sortBy,updateBookmarkStatus) =>{
    
    console.log("Sort by" + sortBy)
    var currentCards = currentCardArray;

    currentCards.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return 1;
        if (a[sortBy] < b[sortBy]) return -1;
        return 0;
    });        

    console.log(currentCards)
    updateBookmarkStatus(currentCards)
    localStorage.setItem("bookmarkArray", JSON.stringify(currentCards))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(currentCards))
}

export default SortAll;