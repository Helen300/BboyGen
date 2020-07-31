import React from 'react';
import { List, Card } from 'antd';


class HelpMessages extends React.Component {

  render() {


    return (
      <List
        grid={{ gutter: 16, column: this.props.data.length }}
        dataSource={this.props.data}
        renderItem={item => (
          <List.Item style={{ marginBottom: 0}} >
            <Card title={item.title}>{item.content}</Card>
          </List.Item>
        )}
      />
    )
  }

}






export default HelpMessages;