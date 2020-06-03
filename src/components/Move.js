import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

// what does the Meta do? 
const { Meta } = Card;

class Move extends React.Component {


	render() {
		return(
			<Card hoverable style={{ width: 300 }} onClick={() => this.props.select_move(this.props.move_idx)}>
			<Meta title={<div>{this.props.move.name} <DeleteOutlined style={{ float: 'right' }} onClick={() => this.props.handle_delete(this.props.move_idx)}/></div>} />
	  		</Card> 
 	)}
}

export default Move;