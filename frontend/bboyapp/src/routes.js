import React from 'react';
import { Route } from 'react-router-dom';
import MoveList from './containers/MoveListView';
import MoveDetail from './containers/MoveDetailView';

const BaseRouter = () => (
	<div>
		{/* for the path localhost/ displays MoveList */}
		<Route exact path='/' component={MoveList} />
		{/* : defines a parameter */}
		<Route exact path='/:moveID' component={MoveDetail} />
	</div>

	);

export default BaseRouter;