import React, { Component } from 'react';

import HomePage from './Welcomepage/HomePage';
import About from './Welcomepage/About';
import Blog from './Welcomepage/Blog';
import NavBar from './Welcomepage/NavBar';
import Contact from './Welcomepage/Contact';

class Welcome extends Component {
    render() {
        return (
        <div>
            <NavBar />
            
            <sction id='home'>
                <HomePage />             
            </sction>
            
            <sction id='about' >
                <About />      
            </sction>

            <sction id='blog'>
                <Blog />      
            </sction>
            
            <sction id='contact' >
                <Contact />    
            </sction>         
              
           
        </div>
        )
    }
}

export default Welcome;