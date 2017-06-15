import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Root from './components/root';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#009688',
	accent1Color: '#D500F9'
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
