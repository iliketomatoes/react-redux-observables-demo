import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Root from './components/root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
	teal500,
	teal700,
	purpleA400
} from 'material-ui/styles/colors';
import './normalize.css';
import './typography.css';
import './grid.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: teal500,
	primary2Color: teal700,
	accent1Color: purpleA400,
	pickerHeaderColor: teal500,
  },
  appBar: {
    height: 50,
  },
});

ReactDOM.render(
	<Provider store={store}>
	<MuiThemeProvider muiTheme={muiTheme}>
		<Root appName="React prototype app" />
	</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
