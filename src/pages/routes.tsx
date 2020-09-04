import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import List from './List';
import Form from './Form';

function Routes (){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" component={List}/>
            <Route path="/give-classes" component={Form}/>
        </BrowserRouter>
    );
}

export default Routes;