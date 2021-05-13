export const MarkAsRead = (id,read) =>{
        console.log(read)
        const cleanDB = JSON.parse(localStorage.getItem("cleanDatabaseCall"))
        const currentBookmarks = JSON.parse(localStorage.getItem("bookmarkArray"));
        const mainArray = currentBookmarks || cleanDB;
       
        // var markArticleRead = mainArray.map(el => {
        //     if(el.id === id && el != null )
        //         return Object.assign({}, el, {read:true})
        //         return el
        // });
    
        if(read === false){
                console.log("Mark as Read")
                if(document.getElementById(id)){
                document.getElementById(id).classList.add('markAsRead')
                }

                var markArticleRead = mainArray.map(el => {
                        if(el.id === id && el != null )
                            return Object.assign({}, el, {read:true})
                            return el
                    });
                
        localStorage.setItem("bookmarkArray", JSON.stringify(markArticleRead))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(markArticleRead))
        }
        
        if(read === true){
                console.log("Mark as UnRead")
                document.getElementById(id).classList.remove('markAsRead')

                var markArticleUnread = mainArray.map(el => {
                        if(el.id === id && el != null )
                            return Object.assign({}, el, {read:false})
                            return el
                    });
                
        localStorage.setItem("bookmarkArray", JSON.stringify(markArticleUnread))
        localStorage.setItem("changedFullDatabaseCall", JSON.stringify(markArticleUnread))
        }


        // localStorage.setItem("bookmarkArray", JSON.stringify(markArticleRead))
        // localStorage.setItem("changedFullDatabaseCall", JSON.stringify(markArticleRead))
        
        // document.getElementById(id).classList.add('markAsRead')
}

export default MarkAsRead;

