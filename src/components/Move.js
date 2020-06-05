import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

// what does the Meta do? 
const { Meta } = Card;

class Move extends React.Component {

	handleDelete(e) {
		e.stopPropagation()
		this.props.handleDelete(this.props.moveIdx)
	}

	render() {
		if (this.props.shouldRender) {
			return(
				<Card hoverable style={{ width: 300 }} onClick={() => this.props.selectMove(this.props.moveIdx)}>
				<Meta title={<div>{this.props.move.name} <DeleteOutlined style={{ float: 'right' }} onClick={(e) => this.handleDelete(e)}/></div>} />
		  		</Card> 
	 		)
 		}
 		return(null)
 	}
}

export default Move;