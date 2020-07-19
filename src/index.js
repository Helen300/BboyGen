import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import config from "./auth_config.json";

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/auth';


// checking if we have this extension installed, else uses redux compose 
const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhances(
	applyMiddleware(thunk)
));

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

// bring in provider 
const app = (
	<Auth0Provider
	    domain={config.domain}
	    clientId={config.clientId}
	    audience={config.audience}
	    redirectUri={window.location.origin}
	    onRedirectCallback={onRedirectCallback}
	    useRefreshTokens={true}
	>
    <App />
  </Auth0Provider>
)


ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
