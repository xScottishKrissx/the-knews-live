import React from 'react';

import {Route, Redirect, Switch} from 'react-router-dom';

import './routes.css';

import Home from '../home-page/home.js';
// import Tags from '../tags/tags.js';
import Tags from '../tags/tagsv3.js';
import TagsURL from '../tags/tagsv3.1.js';
import NewsPage from '../news-page/news-page.js';
// import Form from '../myKnews/form.js';
import { PracticeForm } from '../myKnews/practice-form';

export class Routes extends React.Component{
    render(){
        
        return (
            <div className="body-wrapper">
                <Switch>            
                    <Redirect exact from="/" to="/home" /> 
                    {/* <Redirect exact from="/theKnews/" to="/" />  */}
                    <Redirect exact from="home/tags/:tagname" to="/home" /> 
                    <Route exact path="/home" component={Home} /> 
                </Switch> 

                <Route path="/tags/" component={ (props) => (
                    <TagsURL timestamp={new Date().toString()} {...props} />
                )}/>

                <Route path="/myKnews" component={PracticeForm} />
                
                <Route path="/filters" component={Home} />  
                {/* <Route  path="/home" component={Home}/> */}
                {/* <Route  path={"/news-item" + {TestLoop} } component={NewsItem}/> */}
                
                {/* <Route path="/news-page/:id" component={NewsPage}/> */}

                <Route path="/home/articles/news-page/:id" component={NewsPage}/>
                <Route path="/home/tags/:tagname" component={Home}/>
                <Route path="/home/search/:x" component={TagsURL}/>
                {/* <Route path=":id" component={NewsPage}/> */}
                
            </div>
        )
    }
}

export default Routes;