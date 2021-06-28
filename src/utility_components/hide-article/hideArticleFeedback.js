import React from 'react'
export const hideArticleFeedback = () => {

   function handleHideArticleFeedback(){
        console.log("handleHideArticleFeedback")
        const messageWrapper = document.getElementById("hideArticleMessageWrapper");
        const messageActual = document.getElementById("hideArticleMessage")
        messageWrapper.style.visibility = "visible" ;
        messageActual.style.visibility = "visible" ;
        if(messageWrapper && messageActual){
            setTimeout(function() {
                messageWrapper.style.visibility = 'hidden';
                messageActual.style.visibility = 'hidden';
            }, 5000);
        }

    }
    return handleHideArticleFeedback;
}

export default hideArticleFeedback();