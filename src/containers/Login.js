import React from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';


class Login extends React.Component {
  // don't need to call validate because onFinish only calls after validated
  onFinish = (values) => {
    console.log('Trying to login with:', values);
    this.props.onAuth(values.username, values.password)
    this.props.history.push('/');
   
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
		  	{
		  		this.props.loading ? 

		  		<Spin />

		  		:

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
			    </Form>
			}
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
