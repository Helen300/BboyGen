import React from 'react';
import { Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons'

const { Meta } = Card;

class Move extends React.Component {

  render() {
    return(
		<Card hoverable style={{ width: 240 }} onClick={() => this.props.select_move(this.props.move_idx)}>
	    <Meta title={<div>{this.props.move.name} <CloseOutlined onClick={() => this.props.handle_delete(this.props.move_idx)}/></div>} />
	  	</Card> 
 	)}
}

export default Move;