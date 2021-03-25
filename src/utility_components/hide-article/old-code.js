
        // // THIS IS THE MAIN PROBLEM AS FAR AS I CAN SEE AS TO WHY IM GETTING EMPTY ARRAYS WHEN PRESSING THE HIDE BUTTON MORE THAN ONCE
        // console.log(JSON.parse(localStorage.getItem("articleArray8")))

        // const ArticlesArray = localStorage.getItem("articlesArray");
        // const getLatestPostArray = ArticlesArray || localStorage.getItem("articleArray8");
        // console.log(ArticlesArray)
        // const parsedLatestPostArray = JSON.parse(getLatestPostArray);
        // console.log(parsedLatestPostArray)


        // // Code for removing article from array and setting new array. Might need it's own component.
        // const index4 = value;
        // var filtered3 = parsedLatestPostArray.filter(function (el) {
        //     return el != null;
        //   });

        // console.log(filtered3)
        // var newData = filtered3.map(el => {
        //     if(el.id == index4)
        //         return Object.assign({}, el, {hidden:true})
        //             return el
        // });
        // console.log(newData)

        // localStorage.setItem('articleArray8', JSON.stringify(newData));
        // // I can now load an array from local storage, change an property of that array and then return that changed array to the database. 
        // // Next, I need to use that array in the initial page load if available.
        // console.log(JSON.parse(localStorage.getItem("articleArray8")))



        
        // console.log(JSON.parse(localStorage.getItem("articleArray8")))
        // const godhelpme = JSON.parse(localStorage.getItem("articleArray8"));
        // const initialLeftOverArticleArray = JSON.parse(localStorage.getItem("leftoverArticlesArray"));
        // console.log(initialLeftOverArticleArray)

        // if(ArticlesArray.length  || godhelpme.length != 0){

        //     // !!! IMPORTANT -- Update Record in Object in array
        //     // This is how i see the hide button functioning, only not from this file.
        //     console.log(JSON.parse(localStorage.getItem("articleArray8")))
        //     const arrayWithMarkedAsHiddenArticles = JSON.parse(localStorage.getItem("articleArray8"));
        //     const collection2 = arrayWithMarkedAsHiddenArticles || ArticlesArray;
        //     console.log(collection2)
        //     console.log(arrayWithMarkedAsHiddenArticles)
        //     console.log(ArticlesArray)
    
        //         // This might be my answer to updating a single object in the array.
        //         // If it is then i can look at integrating this into the hide article button
        //         // const index4 = 319
        //         // var newData = collection2.map(el => {
        //         //     if(el.id == index4)
        //         //         return Object.assign({}, el, {hidden:"CHANGE"})
        //         //             return el
        //         // });
        //         // console.log(newData)
    
    
        //         // This is where the array would be filtered for hidden articles.
        //         const key = true
        //         // const myArr = newData.filter(obj => obj.hidden !== key);
    
        //         var filtered2 = collection2.filter(function (el) {
        //             return el != null;
        //           });
        
        //         console.log(filtered2)
    
        //         const myArr = filtered2.filter(obj => obj.hidden !== key);
        //         console.log(myArr)
        //         console.log(myArr.length)
    
        //         let leftOverArticles = JSON.parse(localStorage.getItem("newLeftOverArticles")) || initialLeftOverArticleArray;
        //         // const leftOverArticles = this.state.leftoverArticles;
        //         // console.log(JSON.parse(localStorage.getItem("newLeftOverArticles")))
        //         // console.log(this.state.leftoverArticles)
        //         console.log(leftOverArticles)
        //         const myArr3 = leftOverArticles.filter(obj => obj.hidden !== key);
        //         console.log(myArr3)
        //         // console.log(myArr3[0])
        //         // console.log(myArr3[1])
        //         // console.log(myArr3[2])

        //         // const articlesToBeAddedToArray = 30 - myArr.length; // How Many articles needed to be added
        //         const articlesToBeAddedToArray = 1;
        //         // console.log(this.state.secondSlicePoint + ":" + myArr.length)
        //         console.log(articlesToBeAddedToArray)
      
        //         var newArray = [];
        //         for(var i = 0; i < articlesToBeAddedToArray; i++){
        //             newArray.push(myArr3[i]); // COMBINE THE 3 NEW ARTICLES INTO ONE new ARRAY
        //             console.log(myArr3[i])
        //             // console.log(i)
        //             // console.log(articlesToBeAddedToArray)
    
        //         }
        //         const testSlice = leftOverArticles.slice(1);
        //         localStorage.setItem("newLeftOverArticles",JSON.stringify(testSlice))
        //         console.log(JSON.parse(localStorage.getItem("newLeftOverArticles")))
    
        //         // COMBINE THE FILTERED ARRAY WITH THE NEW ARTICLES FROM NEWARRAY
        //         // COMBINE myArr with newArray
        //         console.log(newArray)
        //         // console.log(myArr)
        //         console.log(myArr.concat(newArray)) // HOLY HELL --- THIS IS IT!!!!! MAYBE.PROBABLY
        //         localStorage.setItem("articleArray9",JSON.stringify(myArr.concat(newArray)))
        //         // console.log(...myArr,newArray)
        
        //         console.log(this.state.filteredPostArray.length)
        //         if(this.state.filteredPostArray.length === 0){
                   
        //             this.setState({
        //                 filteredPostArray:myArr.concat(newArray),
                        
        //                 // This gives me an initial, filtered array that can be used for the rest of the website.
        //                 // I need to think about how to deal with scrollCheck because i can think of a few issues of the top of my head.
        //             })
        //             // localStorage.setItem("articleArray7",this.state.filteredPostArray)
        //             console.log(this.state.filteredPostArray)
        //         }
        //         console.log(this.state.filteredPostArray)
        //         // Prepare filtered article array for use in other parts of website.
        //         localStorage.setItem("articleArray8",JSON.stringify(this.state.filteredPostArray))
        //         console.log(JSON.parse(localStorage.getItem("articleArray8")))
        //         console.log(JSON.parse(localStorage.getItem("articleArray9")))
                
    
    
    
    
                
        //     }