import React from 'react';
import { Card } from 'antd';

class Move extends React.Component {

  render() {
    return(
      <Card 
        title={<a href={`/moves/${this.props.move.id}/`}>{this.props.move.name}</a>} />
      
 	)}
}

export default Move;