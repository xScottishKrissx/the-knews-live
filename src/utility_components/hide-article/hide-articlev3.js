import './hide-article.css';

export const HideArticle  = (articles,id) =>{

    const hideArticle = articles.map(el => {
        if(el.id === id && el.bookmarked === false && el != null )
            // return Object.assign({}, el, {hidden:false})
            return Object.assign({}, el, {markedforhide:true})
            return el
    });
    localStorage.setItem("bookmarkArray", JSON.stringify(hideArticle))
    localStorage.setItem("changedFullDatabaseCall", JSON.stringify(hideArticle))
}
    


export default HideArticle;
