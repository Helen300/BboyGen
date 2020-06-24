import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';
import { menuKeys } from "../constants";


class Login extends React.Component {

	state = { 
		loading: false, 
	}
  // don't need to call validate because onFinish only calls after validated
  	onFinish = (values) => {
	    console.log('Trying to login with:', values);
	    var login = this.props.onAuth(values.username, values.password)
	    if (this.props.loading) {
	    	this.setState({
	    		loading: true,
	    	})
	    }
	   // console.log(login);
 	 };

  	onFinishFailed = (errorInfo) => {
  		console.log('Failed:', errorInfo);
  	};

	componentDidMount() {
		localStorage.setItem('menuKey', menuKeys.Login)
	}

	componentWillReceiveProps(newProps) {
		if (!newProps.loading) {
			this.setState({
	    		loading: false,
	    	})
	    	if (newProps.error == null) {
	    		console.log('now false');
	    		newProps.history.push('/');
	    	}
	    	else if (newProps.error === 'Username or password wrong') {
	    		console.log('bad username/password login');
	    	}
	    }
	}

  	render () { 
	  	let errorMessage = null; 
	  	if (this.props.error) {
	  		errorMessage = (
	  			<p>{this.props.error.message}</p>
	  		);
	  	}
		  return (
		  	<div>
		  		{ errorMessage }
			    <Form
			
			      onFinish={this.onFinish}
			      onFinishFailed={this.onFinishFailed}
			    >
			      <Form.Item
			        label="Username"
			        name="username"
			        rules={[{ required: true, message: 'Please input your username!' }]}
			      >
			        <Input />
			      </Form.Item>

			      <Form.Item
			        label="Password"
			        name="password"
			        rules={[{ required: true, message: 'Please input your password!' }]}
			      >
			        <Input.Password />
			      </Form.Item>

			      <Form.Item>
			        <Button type="primary" htmlType="submit">
			          Login 
			        </Button>
			        <span style={{ marginLeft: '0.5em'}}> 
			         OR 
			        </span>
			        <NavLink style={{ marginLeft: '0.5em'}} to='/signup/'>
			        Sign Up
			        </NavLink>
			      </Form.Item>
			       { this.state.loading ?
		
					  <Spin 
					  	tip="Logging in..." 
					  	size="small"
					  />
					 :
					 // error will get returned from the authLogin
					 <div>{ this.props.error != null ? this.props.error : null}</div>
				}
			    </Form>
		    </div>
		  );
		};
	}


const mapStateToProps = (state) => {
	return {
		loading: state.loading, 
		error: state.error
	}
}


const mapDispatchToProps = dispatch => {
	return {
		onAuth: (username, password) => dispatch(actions.authLogin(username, password))
 	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
