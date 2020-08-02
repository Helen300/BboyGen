import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Spin } from 'antd';
import BaseRouter from './routes'
import CustomLayout from './containers/CustomLayout'

import 'antd/dist/antd.css'
import "./css/App.css"

import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// grabs the store we created and allow us to access states 
// import * as actions from './store/actions/auth';
// import { connect } from 'react-redux';

const App = () => {
  const { isLoading, error } = useAuth0();
  return (
  	 <div>
	    <Router history={history}> 
			{/* passes isAuthenticated down to CustomLayout component */}
		    <CustomLayout >
		    	<BaseRouter />
		    </CustomLayout>
		</Router>
	</div>
  );
};


// allows us to gain access to property 
export default App;
