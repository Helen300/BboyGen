import React from 'react';
import { List, Card } from 'antd';



class HelpMessages extends React.Component {

  render() {

      const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item style={{ marginBottom: 0}} >
            <Card title={item.title}>Card content</Card>
          </List.Item>
        )}
      />
    )
  }







}






export default HelpMessages