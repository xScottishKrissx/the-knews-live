import './hide-article.css';

export const HideArticle  = (value) =>{
       
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
