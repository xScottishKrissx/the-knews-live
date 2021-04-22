import React from 'react';

import {Route, Redirect, Switch} from 'react-router-dom';

import './routes.css';

import Home from '../home-page/home.js';

import Tags from '../tags/tagsv3.1.js';
import NewsPage from '../news-page/news-page.js';
// import Form from '../myKnews/form.js';
import { PracticeForm } from '../myKnews/practice-form';

export class Routes extends React.Component{
    render(){
        
        return (
            <div className="body-wrapper">
                <Switch>            
                    <Redirect exact from="/" to="/theKnews/home" /> 
                    <Redirect exact from="/theKnews" to="/theKnews/home" /> 
                    <Redirect exact from="/theKnews/home/search" to="/theKnews/home" /> 
                    {/* <Redirect exact from="/theKnews/" to="/" />  */}
                    <Redirect exact from="/theKnews/home/tags/:tagname" to="/theKnews/home" /> 
                    <Route exact path="/theKnews/home" component={Home} /> 
                    {/* https://christopherdunne.co.uk/theKnews/ */}
                </Switch> 


                <Route path="/tags/" component={ (props) => (
                    <Tags timestamp={new Date().toString()} {...props} />
                )}/>

                <Route path="/myKnews" component={PracticeForm} />
                
                <Route path="/filters" component={Home} />  

                


                <Route path="/theKnews/home/articles/news-page/:id" component={NewsPage}/>
                <Route path="/theKnews/home/tags/:tagname" component={Home}/>

                <Route path="/theKnews/home/search/:a/:b" component={Tags}/>
 
                
            </div>
        )
    }
}

export default Routes;