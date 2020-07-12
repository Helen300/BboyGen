import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// grabs the store we created and allow us to access states 
import { connect } from 'react-redux';
import BaseRouter from './routes';
import 'antd/dist/antd.css'; 
import CustomLayout from './containers/CustomLayout';

class App extends Component {
	render() {

		return (
		    <div>
				{/* passes isAuthenticated down to CustomLayout component */}
			    <CustomLayout {...this.props}>
			    	<BaseRouter {...this.props}/>
			    </CustomLayout>
		    </div>
		  );
	}
}


// allows us to gain access to property 
export default App;
