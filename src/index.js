import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";


import { createStore, compose, applyMiddleware } from 'redux';

import ReactGA from 'react-ga';


const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname
  );
};

// start google analytics
const trackingId = process.env.GA_TRACKING_ID; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);

// bring in provider 
const app = (
	<Auth0Provider
	    domain={process.env.REACT_APP_AUTH0_DOMAIN}
	    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
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
