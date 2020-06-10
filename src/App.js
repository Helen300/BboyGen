import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// grabs the store we created and allow us to access states 
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css'; 
import * as actions from './store/actions/auth';

import CustomLayout from './containers/CustomLayout';

class App extends Component {

	// calls dispatch below whenever rendered 
	componentDidMount() {
		this.props.onTryAutoSignup(); 
	}

	render() {
		return (
		    <div>
			    <Router> 
					{/* passes isAuthenticated down to CustomLayout component */}
				    <CustomLayout {...this.props}>
				    	<BaseRouter {...this.props}/>
				    </CustomLayout>
				</Router>
		    </div>
		  );
	}
}
// everytime app rendered, checks if authenticated automatically 
// maps states to props, input as state 
const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		isAuthenticated: state.token != null

	}
}

const mapDispatchToProps = dispatch => {
	return {
		// anonymous function call 
		// checks if they are logged in or not 
		// authCheckState = checks if token stored + if past expiration date or not
		onTryAutoSignup: () => dispatch(actions.authCheckState())
	}
}

// allows us to gain access to property 
export default connect(mapStateToProps, mapDispatchToProps)(App);
