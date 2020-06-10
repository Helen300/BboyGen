import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MoveListView from './containers/MoveListView';
import GeneratorView from './containers/GeneratorView';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Landing from './containers/Landing';

class BaseRouter extends React.Component {


	loginPage() {
		console.log(this.props.isAuthenticated);
		if (this.props.isAuthenticated) {
			return MoveListView
		}
		else {
			return Login
		}
	}

	render() {

		return(

			<div>
				{/* for the path localhost/ displays MoveList */}
				{
					this.props.isAuthenticated ?
					<Route exact path='/' component={MoveListView} />
					:
					<Route exact path='/' component={Landing} />

				}
				{/*<Route exact path='/' component={this.loginPage()} /> */}

				{/* : defines a parameter */}
				<Route exact path='/gen/' component={GeneratorView} />
				<Route exact path='/login/' component={Login} />
				<Route exact path='/signup/' component={Signup} />
			</div>

		)

	}
}

export default BaseRouter;