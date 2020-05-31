import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffffff',
      contrastText: '#37474f'
    },
    secondary: {
      main: '#37474f',
    },
  },
  text: {
    primary: '#000'
  }
});

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider theme={theme}>
    		<App />
    	</MuiThemeProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
