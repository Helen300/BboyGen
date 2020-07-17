import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// grabs the store we created and allow us to access states 
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css'; 
import * as actions from './store/actions/auth';
import { Spin } from 'antd';

import CustomLayout from './containers/CustomLayout';


import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Spin tip="Signing up..." size="large" />;
  }


  return (
  	 <div>
	    <Router history={history}> 
			{/* passes isAuthenticated down to CustomLayout component */}
		    <CustomLayout>
		    	<BaseRouter/>
		    </CustomLayout>
		</Router>
	</div>
  );
};


// allows us to gain access to property 
export default App;
