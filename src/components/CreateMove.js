import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
}; 


class CreateMove extends React.Component {

  onFinish = (values, requestType, action, currentMoves) => {
    
    console.log('Received values of form:', values);
    axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: this.props.token
    }
    console.log(values['moves']);
    const moves = values['moves'];
    console.log(moves);
    console.log('current moves', currentMoves);
    const newMoves = currentMoves.concat(moves);
    console.log('new moves', newMoves);
    action(newMoves);
    for (const [index, value] of moves.entries()) {
      switch ( requestType ) {
        case 'post':
          return axios.post('/api/', {
              name: value, 
          })
          .then(
          res => console.log(res), 
          // action()
          )
          .catch(error => console.err(error));
      }
    }
  
  };

  render () {
    return (
      <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} 
            onFinish={ (values) => this.onFinish(values, this.props.requestType, this.props.action, this.props.currMoves) }>
        <Form.List name="moves">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Creating Moves' : ''}
                  required={false}
                  key={field.key}
                  >
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input the name of a move or delete this field.",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Name of Move" style={{ width: '60%' }} />
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                  ) : null}
                </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                    style={{ width: '60%' }}
                  >
                    <PlusOutlined /> Add field
                  </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {this.props.btnText}
          </Button>
        </Form.Item>
      </Form>
    );
  };
}



export default CreateMove;
