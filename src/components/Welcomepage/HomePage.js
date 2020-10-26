import React, { Component } from 'react';
import background from '../../asserts/images/background.jpg'

class HomePage extends Component {
  render(){
    return (
      <div >
        <header className="App-header">
          <img src={background} style={{width: window.innerWidth, 
              height: window.innerHeight,}} alt='Hi, Welcome to my blog!' />
          <p style={{position: 'absolute',}}> 
            Hi, Welcome to my Blog!
          </p>
        </header>
      </div>
    );
  }
}

export default HomePage;