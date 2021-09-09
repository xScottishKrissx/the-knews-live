import './hide-article.css';

export const HideArticle  = (value,postsArray,arrayFromDatabase,leftoverArticles,fullDatabaseCall,bookmarkHide) =>{


        const editedArray = JSON.parse(localStorage.getItem("editedArticleArray"));
        const mainArray = editedArray || arrayFromDatabase;
        console.log(mainArray)
    
        const filterForNull = mainArray.filter(obj => obj !== null);   
        const markArticleForRemoval = filterForNull.map(el => {
            if(el.id === value && el.bookmarked === false && el != null )
                return Object.assign({}, el, {hidden:true})
                return el
        });
        

        // Check for Articles marked as hidden -> then remove from array
        const arrayWithArticlesRemoved = markArticleForRemoval.filter(obj => obj.hidden !== true);

        // Get something to add to the reduced array
        const editedLeftoverArticlesArray = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray"))
        const arrayWithArticlesToBeAddedToMain = editedLeftoverArticlesArray || leftoverArticles;

        // removed 1st element from leftover article array to reduced main array
        arrayWithArticlesRemoved.push(arrayWithArticlesToBeAddedToMain.shift());

        // With 1st object removed, set remaining leftover article array into local storage.
        localStorage.setItem("editedLeftoverArticlesArray",JSON.stringify(arrayWithArticlesToBeAddedToMain))
    
        // Array with Articles added to reduced array
        localStorage.setItem("editedArticleArray",JSON.stringify(arrayWithArticlesRemoved))
        
        // Filter Options         
        // Scroll Check Filter --> Check for ID in leftover articles array, remove and then return to local storage.
        const prepLeftoverArticlesForFilter = JSON.parse(localStorage.getItem("editedLeftoverArticlesArray"));

        if(prepLeftoverArticlesForFilter === null)console.log("handle null")
        const markScrollCheckArticleForRemoval = prepLeftoverArticlesForFilter.map(el => {
            if(el.id === value && el.bookmarked === false && el != null)
                return Object.assign({}, el, {hidden:true})
                return el
        });

        // Check for Articles marked as hidden -> then remove from array
        const filteredLeftoverArticlesForScrollCheck = markScrollCheckArticleForRemoval.filter(obj => obj.hidden !== true);

        // Set newly filtered leftover articles in storage.
        localStorage.setItem("editedLeftoverArticlesArray",JSON.stringify(filteredLeftoverArticlesForScrollCheck))

        // Hiding For Filter Views
        const dirtyFullDatabaseCall = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        const cleanFullDatabaseCall =  dirtyFullDatabaseCall || JSON.parse(localStorage.getItem("cleanDatabaseCall"));

        const changedFullDatabaseCall = cleanFullDatabaseCall.map(el => {
            if(el.id === value && el.bookmarked === false &&  el != null )
                return Object.assign({}, el, {hidden:true})
                return el
        });
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changedFullDatabaseCall))

    //    if(document.getElementById(value))document.getElementById(value).style.display = "none";    
}
    


export default HideArticle;
