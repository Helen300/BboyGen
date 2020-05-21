import React from 'react';
import { List, Avatar } from 'antd';

{/* be wary of ` verus ' */}
const Moves = (props) => {
  return (
  <List
    itemLayout="horizontal"
    dataSource={props.data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          // goes to slash that link 
          title={<a href={`/${item.id}`}>{item.name}</a>}
          description={item.id}
        />
      </List.Item>
    )}
  />
  );
}

export default Moves;