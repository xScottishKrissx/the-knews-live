import React from 'react';
import hideAllArticles from '../bookmarks/hideAllArticles';
import ChooseCardStyle from './chooseCardStyle';
import ChoosePageStyle from './choosePageStyle';

import './custom-card-sizeV2.css';

class CustomCardSize extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            pageLayout:""
        }
        // this.changeCardSize = this.changeCardSize.bind(this);
    }
    componentDidMount(){
        
    }
    changeCardSize = (width,height,cardStyleChoice) => {
        this.setState({cardStyle:cardStyleChoice})
        var arrayThing = [width,height]

        localStorage.removeItem("myData");

        localStorage.setItem("myData", JSON.stringify(arrayThing));
        localStorage.getItem("myData")

        localStorage.setItem("cardStyleChoice", cardStyleChoice);

        if(this.props.getCardSizeToParent)this.props.getCardSizeToParent(width,height);

    }

    changePageLayout = (flexFlow,margin,pageLayout,maxWidth) => {
        var array = [flexFlow,margin,maxWidth]
        console.log(array)
        this.setState({
            showCardStyleOptions:true,
            pageLayout:pageLayout
        })

        // console.log(pageLayout)
        localStorage.setItem("pageLayout",JSON.stringify(array))
        if(this.props.updatePageLayout)this.props.updatePageLayout(flexFlow,margin,maxWidth)


    }


    render(){

        console.log(this.state.pageLayout)
        console.log(this.state.cardStyle)

        return(            
            <div className="cardControlSizeWrapper" style={this.state.style}>
                
                <ChoosePageStyle 
                    changePageLayout={this.changePageLayout}
                    cardStyle={this.state.cardStyle || "Standard"}
                />               
               
                <ChooseCardStyle 
                    changeCardSize={this.changeCardSize}
                    showCardStyleOptions={true}
                    pageLayout={this.state.pageLayout || "Freeform"}

                />

            </div>
        )
    }
}

export default CustomCardSize;