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
        const arrayWithArticlesToBeAddedToMain = editedLeftoverArticlesArray || leftoverArticles;

        // removed 1st element from leftover article array to reduced main array
        arrayWithArticlesRemoved.push(arrayWithArticlesToBeAddedToMain.shift());
    
        // Array with Articles added to reduced array
        localStorage.setItem("editedArticleArray",JSON.stringify(arrayWithArticlesRemoved))
        
        // Hiding For Filter Views
        const dirtyFullDatabaseCall = JSON.parse(localStorage.getItem("changedFullDatabaseCall"))
        const cleanFullDatabaseCall =  dirtyFullDatabaseCall || JSON.parse(localStorage.getItem("cleanDatabaseCall"));

        const changedFullDatabaseCall = cleanFullDatabaseCall.map(el => {
            if(el.id === value && el.bookmarked === false &&  el != null )
                return Object.assign({}, el, {hidden:true})
                return el
        });
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changedFullDatabaseCall))
}
    


export default HideArticle;
