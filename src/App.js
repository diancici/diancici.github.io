import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Welcome from './components/Welcome'
import AppTFReact from './components/Blog/AppTFReact'

class App extends Component {
  render(){

    return (
      
        <Router>
          <div>
            <Switch>
              <Route exact path="/"><Welcome /></Route>
              <Route path="/blog/apptfreact"><AppTFReact /></Route>
            </Switch>
          </div>                  
        </Router>
               

     
           
    );
  }
}

export default App;