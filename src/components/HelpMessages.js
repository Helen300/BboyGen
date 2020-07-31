import React from 'react';
import { Card } from 'antd';


class HelpMessages extends React.Component {
  renderCards = () => {
    return(
      this.props.data.map(message =>
          <div class={this.props.columnClass}>
            <Card title={message.title}>{message.content}</Card>
          </div>
      )
    )
  }
  render() {
    return (
      <div class="row h-100">
        {this.renderCards()}
      </div>
    )
  }

}






export default HelpMessages;