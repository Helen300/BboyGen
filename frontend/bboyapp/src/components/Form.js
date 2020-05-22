import React from 'react';
import { Form, Input, Button} from 'antd';

class CustomForm extends React.Component {

  checkwork(event) {
    event.preventDefault();
    console.log('working');

  }

  handleFormSubmit = (event) => {
    // so it doesn't submit and reload 
    // event.preventDefault();
    console.log(event.target.elements.move.value);
    const name = event.target.elements.move.value;
    const type = event.target.elements.type.value;
    console.log('submitting', name, type);
  };

  render () {
    return (
      <div>
        <Form onSubmit={this.checkwork}>
          <Form.Item label="Name of Move">
            <Input name="move" placeholder="Name your move" />
          </Form.Item>
          <Form.Item label="Type of Move">
            <Input name="type" placeholder="Choose your type of move" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
      );
  }
}

export default CustomForm;