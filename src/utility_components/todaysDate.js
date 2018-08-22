import React from 'react';

const GetTodaysDate = () =>{
    const currentdate = new Date();
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
   
    // console.log(currentdate.toLocaleDateString('en-GB',dateOptions)); 
    const myDate = currentdate.toLocaleDateString('en-GB', dateOptions);


    return myDate;
    // return {myDate} is wrong.

}

export default GetTodaysDate();