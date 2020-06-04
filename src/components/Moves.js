import React from 'react';
import { List } from 'antd';
import Move from '../components/Move';

// be wary of ` verus '
class Moves extends React.Component {

  moveFilter = (item) => {

     console.log(' in move filter ');
     const checkType = (key) => {
      switch ( key ) {

      case '1':
        return ''
      case '2':
        return 'toprock'
      case '3':
        return 'footwork'
      case '4':
        return 'freezes'
      case '5':
        return 'power'
    }
  }

    const key = this.props.current_tab;
    if (key == '1') {
      return true
    }
    console.log(type);
    const type = checkType(key);
    console.log('item type', item.type == type);
    console.log('=== ', item.type === type);
    return item.type === type
  }



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
          shouldRender={this.moveFilter(item)}
          //description={item.id}
     
        />

        )}
    />
    );
  }
} 


export default Moves;