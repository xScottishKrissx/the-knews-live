export const MarkAsRead = (id,markAs) =>{     

                const articles = 
                        JSON.parse(localStorage.getItem("changedFullDatabaseCall")) 
                        || JSON.parse(localStorage.getItem("cleanDatabaseCall"))
           
                const changeArticleReadStatus = articles.map(el => { 
                    if(el.id === id && el != null )
                        return Object.assign({}, el, {read:!markAs})
                        return el
                });
                      
                
                localStorage.setItem("changedFullDatabaseCall", JSON.stringify(changeArticleReadStatus))            
}

export default MarkAsRead;

