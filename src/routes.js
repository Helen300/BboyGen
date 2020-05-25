import React from 'react';
import { Route } from 'react-router-dom';
import MoveList from './containers/MoveListView';
import MoveDetail from './containers/MoveDetailView';
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
	<div>
		{/* for the path localhost/ displays MoveList */}
		<Route exact path='/' component={MoveList} />
		{/* : defines a parameter */}
		<Route exact path='/moves/:moveID/' component={MoveDetail} />
		<Route exact path='/login/' component={Login} />
		<Route exact path='/signup/' component={Signup} />
	</div>

	);

export default BaseRouter;