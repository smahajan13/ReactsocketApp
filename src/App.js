import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { WebsocketChat } from './Components/WebsocketChat';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}> 
        <WebsocketChat />
      </MuiThemeProvider>

    );
  }
}

export default App;
