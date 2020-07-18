import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Tooltip, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth';
import { Spin } from 'antd';


class Signup extends React.Component {
  state = {
    loading: false, 
  }
  // [form] = Form.useForm();

  onFinish = values => {
    console.log('Received values of form: ', values);
    this.props.onAuth(values.username, values.email, values.password, values.confirm);
    if (this.props.loading) {
      this.setState({
        loading: true,
      })
    }
  };


  componentWillReceiveProps(newProps) {
    if (!newProps.loading) {
      this.setState({
          loading: false,
        })
        if (newProps.error == null) {
          console.log('now false');
          newProps.history.push('/');
        }
        else if (newProps.error === 'bad') {
          console.log('bad signup');
        }
      }
  }


  render () { 
  return (
    <div>
    <Form
      // form={this.form}
      name="register"
      onFinish={this.onFinish}
      scrollToFirstError
    >

    <Form.Item
        name="username"
        label={
          <span>
            Username&nbsp;
            <Tooltip title="Choose a username.">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          { 
            required: true, message: 'Please input a username.', whitespace: true,
          }, 
          {
            pattern: /^\S*$/, message: 'Spaces are not allowed.' 
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email', message: 'The input is not valid E-mail.',
          },
          {
            required: true, message: 'Please input your E-mail.',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true, message: 'Please input your password.',
          },
          { 
            min: 8, message: 'Passwords must be at least 8 characters.',
          },
          {
            pattern: /^\S*$/, message: 'Spaces are not allowed.',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

    
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Form.Item>
      { this.state.loading ?

            <Spin 
              tip="Signing up..." 
              size="small"
            />
           :
           // error will get returned from the authLogin
           <div>{ this.props.error != null ? this.props.error : null}</div>
      }

    </Form>
    </div>
  );
  }
};

export default Signup;
