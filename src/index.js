import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Auth0ProviderWithHistory from "./auth0-provider-with-history";
import * as serviceWorker from './serviceWorker';


// bring in provider 
const app = (
	<Router> 
		<Auth0ProviderWithHistory
		    domain="damp-voice-7544.us.auth0.com"
		    clientId="S6CaK4fa5q9AHax9jRCWgRSrxcQK03f2"
		    redirectUri={window.location.origin}
	 	>
			<App />
		</Auth0ProviderWithHistory>
	</Router>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
