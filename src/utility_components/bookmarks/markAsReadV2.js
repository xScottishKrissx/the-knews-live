export const MarkAsRead = (id,markAs) =>{     

                const articles = 
                        JSON.parse(localStorage.getItem("changedFullDatabaseCall")) 
                        || JSON.parse(localStorage.getItem("cleanDatabaseCall"))
           
                var changeArticleReadStatus = articles.map(el => { 
                    if(el.id === id && el != null )
                        return Object.assign({}, el, {read:!markAs})
                        return el
                });
          
                if(document.getElementById(id)){
                    if(markAs === false){document.getElementById(id).classList.add('markAsRead')}
                    if(markAs === true){document.getElementById(id).classList.remove('markAsRead')}
                }
            
                localStorage.setItem("bookmarkArray", JSON.stringify(changeArticleReadStatus))
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeArticleReadStatus))            
}

export default MarkAsRead;

