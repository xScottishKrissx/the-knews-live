import React from 'react';

import {Route, Redirect, Switch} from 'react-router-dom';

import './routes.css';

import Home from '../home-page/home.js';
// import Tags from '../tags/tags.js';
import Tags from '../tags/tagsv2.js';
import NewsPage from '../news-page/news-page.js';
// import Form from '../myKnews/form.js';
import { PracticeForm } from '../myKnews/practice-form';

export class Routes extends React.Component{
    render(){
        console.log(this.props.databaseProp)
        console.log("Render Routes.js")
        return (
            <div className="body-wrapper">
                <Switch>            
                    <Redirect exact from="/" to="/theKnews/home" /> 
                    <Redirect exact from="/theKnews/" to="/theKnews/home" /> 
                    
                    <Route 
                        exact path="/theKnews/home" 
                        render={(props) => (
                            <Home {...props} databaseProp={this.props.databaseProp} leftoverArticles={this.props.leftoverArticles} />
                        )}
                    /> 
                    
                </Switch> 
                <Route 
                    path="/theKnews/tags/" 
                    component={ (props) => (
                        <Tags timestamp={new Date().toString()} {...props} 
                        databaseProp={this.props.databaseProp} 
                        leftoverArticles={this.props.leftoverArticles}
                        />
                )}/>
                <Route path="/theKnews/myKnews" component={PracticeForm} />
                
                <Route path="/filters" component={Home} />  
                {/* <Route  path="/home" component={Home}/> */}
                {/* <Route  path={"/news-item" + {TestLoop} } component={NewsItem}/> */}
                
                {/* <Route path="/news-page/:id" component={NewsPage}/> */}

                <Route path="/articles/news-page/:id" component={NewsPage}/>
                {/* <Route path=":id" component={NewsPage}/> */}
                
            </div>
        )
    }
}

export default Routes;