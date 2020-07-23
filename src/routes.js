import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Spin, Alert } from 'antd';
import Landing from './containers/Landing';
// import Login from './containers/Login';
// import Signup from './containers/Signup';
import MoveListView from './containers/MoveListView';
import GeneratorView from './containers/GeneratorView';
import TrainingView from './containers/TrainingView';

import { withAuth0 } from '@auth0/auth0-react';

class BaseRouter extends React.Component {

	render() {

		const { isAuthenticated } = this.props.auth0;
		return(
			
			<div>
				{ isAuthenticated ? 

				<Route exact path='/' component={MoveListView} />
				:
				<Route exact path='/' component={Landing} />

				}

				{/*<Route exact path='/' component={this.loginPage()} /> */}

				{/* : defines a parameter */}
				<Route exact path='/gen/' component={GeneratorView} />
				<Route exact path='/training/' component={TrainingView} />
				{/* <Route exact path='/login/' component={Login} /> */}
				{/* <Route exact path='/signup/' component={Signup} /> */}
			</div>

		)
	}
}

export default withAuth0(BaseRouter);