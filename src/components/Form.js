import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Input, Button} from 'antd';


class CustomForm extends React.Component {


  onFinish = (values, requestType, moveID, action, moves) => {
    // so it doesn't submit and reload 
    console.log(values);
    const move = values['move'];
    const type = values['type'];

    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: this.props.token
    }

    switch ( requestType ) {
      case 'post':
        return axios.post('/api/', {
            name: move, 
        })
        .then(
          res => console.log(res), 
          action()
          )
        .catch(error => console.err(error));
      case 'put':
        return axios.put(`/api/${moveID}/`, {
            name: move, 
        })
        .then(res => console.log(res))
        .catch(error => console.err(error));


    }
  };

  render () {
    return (
      <div>
      {/* when form is done and gets submitted, onFinish gets called, 
        passing in the values from the form */}
        <Form onFinish={(values) => this.onFinish(values, this.props.requestType, this.props.moveID, this.props.action, this.props.moves)}>
      {/* give form item a name */}
          <Form.Item name="move" rules={[{ required: true }]} label="Name of Move">
            <Input placeholder="Name your move" />
          </Form.Item>
          <Form.Item name="type" label="Type of Move">
            <Input placeholder="Choose your type of move" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
          </Form.Item>
        </Form>
      </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    // whether or not token = null (isAuthenticated = False)
    token: state.token
  }
}


export default connect(mapStateToProps)(CustomForm);