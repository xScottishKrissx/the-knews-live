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
                    <Redirect exact from="/" to="/home" /> 
                    <Redirect exact from="/home/search" to="/home" /> 
                    {/* <Redirect exact from="/theKnews/" to="/" />  */}
                    <Redirect exact from="/home/tags/:tagname" to="/home" /> 
                    <Route exact path="/home" component={Home} /> 
                    
                </Switch> 


                <Route path="/tags/" component={ (props) => (
                    <Tags timestamp={new Date().toString()} {...props} />
                )}/>

                <Route path="/myKnews" component={PracticeForm} />
                
                <Route path="/filters" component={Home} />  
                {/* <Route  path="/home" component={Home}/> */}
                {/* <Route  path={"/news-item" + {TestLoop} } component={NewsItem}/> */}
                
                {/* <Route path="/news-page/:id" component={NewsPage}/> */}

                <Route path="/home/articles/news-page/:id" component={NewsPage}/>
                <Route path="/home/tags/:tagname" component={Home}/>
{/* 
                <Switch>
                <Redirect exact from="/home/search/tag/news" to="/home/search/tag/News" /> 
                <Route path="/home/search/:a/:b" component={TagsURL}/>
                </Switch> */}
                <Route path="/home/search/:a/:b" component={Tags}/>
                {/* <Route path=":id" component={NewsPage}/> */}

                
                {/* <Switch>
                <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch> */}

                
            </div>
        )
    }
}

export default Routes;