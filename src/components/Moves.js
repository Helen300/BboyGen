import React from 'react';
import { List, Card } from 'antd';
import Move from '../components/Move';

// be wary of ` verus '
class Moves extends React.Component {

  render() {
    return (
    <List
      itemLayout="horizontal"
      dataSource={this.props.data}
      renderItem={item => (
  
          <Move
            // goes to slash that link 
            move={item}
            //description={item.id}
          />

   
      )}
    />
    );
  }
} 


export default Moves;