import React from 'react';
import './footer.css';

export const Footer = () => {

    const randomBackgroundColour = JSON.parse(localStorage.getItem("randomColour"))
    console.log(randomBackgroundColour)
    return (
        <footer>
            <div id="footerContent" style={{color:randomBackgroundColour}}>
                <h4>theKnews</h4>
                <p>Created by <a href="https://www.christopherdunne.co.uk">Chris Dunne</a></p>
            </div>
        </footer>
    )
}

export default Footer;