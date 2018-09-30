import React, { Component } from 'react';
import CageHolder from './components/CageHolder'
import blueGrey from '@material-ui/core/colors/blueGrey'
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        background: blueGrey[500]
      }}>
        <CageHolder />
      </div>
    );
  }
}

export default App;
