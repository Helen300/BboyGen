import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MoveListView from './containers/MoveListView';
import GeneratorView from './containers/GeneratorView';
import TrainingView from './containers/TrainingView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Landing from './containers/Landing';
import { Spin, Alert } from 'antd';
import { withAuth0 } from '@auth0/auth0-react';

class BaseRouter extends React.Component {

	render() {
		const token = localStorage.getItem('token');
		console.log('tooooeken', token);
 		const { isAuthenticated } = this.props.auth0
		return(

			<div>
				{/* for the path localhost/ displays MoveList */}
				{
					isAuthenticated ?
					<Route exact path='/' component={MoveListView} />
					:
					<Route exact path='/' component={Landing} />

				}
				{/*<Route exact path='/' component={this.loginPage()} /> */}

				{/* : defines a parameter */}
				<Route exact path='/gen/' component={GeneratorView} />
				<Route exact path='/training/' component={TrainingView} />
				<Route exact path='/login/' component={Login} />
				<Route exact path='/signup/' component={Signup} />
			</div>

		)
	//}

	}
}

export default withAuth0(BaseRouter);