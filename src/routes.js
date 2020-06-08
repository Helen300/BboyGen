import React from 'react';
import { Route } from 'react-router-dom';
import MoveListView from './containers/MoveListView';
import GeneratorView from './containers/GeneratorView';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
	<div>
		{/* for the path localhost/ displays MoveList */}
		<Route exact path='/' component={MoveListView} />
		{/* : defines a parameter */}
		<Route exact path='/gen' component={GeneratorView} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
	</div>

	);

export default BaseRouter;