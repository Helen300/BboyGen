import React from 'react';
import { List } from 'antd';
import Move from '../components/Move';

// be wary of ` verus '
class Moves extends React.Component {

  moveFilter = (item) => {

    // console.log(' in move filter item is', item);
    // RETURNS EITHER ALL, TOPROCK, FOOTWORK, FREEZES, POWER...
    const key = this.props.currentTab;
    if (key == 'All') {
      return true
    }

    // console.log('item type', item.type == key);
    // console.log('=== ', item.type === key);
    return item.type === key
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
          moveIdx={idx}
          handleDelete={this.props.handleDelete}
          selectMove={this.props.selectMove}
          shouldRender={this.moveFilter(item)}
          selectedMoveIdx={this.props.selectedMoveIdx}
          //description={item.id}
     
        />

        )}
    />
    );
  }
} 


export default Moves;