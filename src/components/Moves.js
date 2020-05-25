import React from 'react';
import { List } from 'antd';

// be wary of ` verus '
class Moves extends React.Component {

  render() {
    return (
    <List
      itemLayout="horizontal"
      dataSource={this.props.data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            // goes to slash that link 
            title={<a href={`/${item.id}/`}>{item.name}</a>}
            description={item.id}
          />
        </List.Item>
      )}
    />
    );
  }
}

export default Moves;