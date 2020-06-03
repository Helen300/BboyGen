import React from 'react';
import { List } from 'antd';
import Move from '../components/Move';

// be wary of ` verus '
class Moves extends React.Component {

  render() {
    return (
    <List
      itemLayout="horizontal"
      dataSource={this.props.data}
      renderItem={(item, idx) => (
  
          <Move
            // goes to slash that link 
            move={item}
            move_idx={idx}
            handle_delete={this.props.handle_delete}
            select_move={this.props.select_move}
            //description={item.id}
          />
      )}
    />
    );
  }
} 


export default Moves;