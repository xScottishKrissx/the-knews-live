import React from 'react';
import fire from '../../../../fire.js';

import './recommended-reading.css'

class RecommendedReading extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            articlesArray: [],
            query1:"",
            thing:"",
        }
    }

    componentDidMount(){
        
        const articleRef = fire.database().ref('items');

        const query1 = articleRef.orderByKey().equalTo("10");
        const query2 = articleRef.orderByKey().equalTo("11");
        const query3 = articleRef.orderByKey().equalTo("12");
        const query4 = articleRef.orderByKey().equalTo("13");

        // const thing = [query1, query2, query3, query4];
        // const list = thing.map((thing) =>
        //     <li key={thing.id}>{thing}</li>
        // );
        // console.log(list)
        // const thing2 = {...thing}
        // console.log(typeof thing2)
        // console.log(typeof query1)
        

       
        query1.on('value', (snapshot) => {
            let articles  = snapshot.val();
            let tempState = [];
            for(let eachItem in articles){
                tempState.push({
                    id:eachItem,
                    title: articles[eachItem].title,
                    postdate: articles[eachItem].postdate
                });
            }
            this.setState({
                articlesArray: [...this.state.articlesArray,...tempState]
            })
        })

        query2.on('value', (snapshot) => {
            let articles  = snapshot.val();
            let tempState = [];
            for(let eachItem in articles){
                tempState.push({
                    id:eachItem,
                    title: articles[eachItem].title,
                    postdate: articles[eachItem].postdate
                });
            }
            this.setState({
                articlesArray: [...this.state.articlesArray,...tempState]
            })
        })

        query3.on('value', (snapshot) => {
            let articles  = snapshot.val();
            let tempState = [];
            for(let eachItem in articles){
                tempState.push({
                    id:eachItem,
                    title: articles[eachItem].title,
                    postdate: articles[eachItem].postdate
                });
            }
            this.setState({
                articlesArray: [...this.state.articlesArray,...tempState]
            })
        })

        query4.on('value', (snapshot) => {
            let articles  = snapshot.val();
            let tempState = [];
            for(let eachItem in articles){
                tempState.push({
                    id:eachItem,
                    title: articles[eachItem].title,
                    postdate: articles[eachItem].postdate
                });
            }
            this.setState({
                articlesArray: [...this.state.articlesArray,...tempState]
            })

            console.log(this.state.articlesArray);
        })

        // const query1 = articleRef.orderByKey().equalTo("10");
        // const query2 = articleRef.orderByKey().equalTo("11");
        // console.log(query1)
        // this.setState({
        //     query1: query1,
        // })
        // console.log(this.state.query1)

        // const arrayThing = [query1,query2];
        // const thing = Array.from(arrayThing)

        // thing.on('value', (snapshot) => {
        //     let articles  = snapshot.val();
        //     let tempState = [];
        //     for(let eachItem in articles){
        //         tempState.push({
        //             id:eachItem,
        //             title: articles[eachItem].title,
        //             postdate: articles[eachItem].postdate
        //         });
        //     }
        //     // this.setState({
        //     //     articlesArray: tempState
        //     // })
        //     // console.log(this.state.articlesArray);
        // })

        // console.log(arrayThing)


    }

    render(){
        const items = this.state.articlesArray;
        const showItems = items.map((item, key) => {
            const imgUrl = "https://unsplash.it/500/200?random=" + item.id;
            const style = {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundPosition: "bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width:"100%",
                // height: "400px",
                // width:"100%"
            }   
            return(
                
                <div className="recReadingItem" key={key}>   
                
                    <div >           
                        <a href={"/articles/news-page/" + item.id}>
                            <img src={imgUrl} style={style} alt="literally all random images" />
                            <h3>{item.title}</h3>
                            <p>{item.postdate}</p>
                        </a> 
                    </div>                   
                </div>
               
            )
        })

        


        return (
            <div className="recReadingWrapper">
                <h2>Recommended Reading...</h2>
                    <div className="recReadingItemWrapper">            
                        {showItems}
                        
                    </div>
            </div>

        );
    }
}

export default RecommendedReading;

