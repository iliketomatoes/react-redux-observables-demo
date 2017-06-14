import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { store } from './store';

ReactDOM.render(
	<Provider store={store}>
		<Root appName="React prototype app" />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
