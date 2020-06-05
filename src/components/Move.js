import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

// what does the Meta do? 
const { Meta } = Card;

class Move extends React.Component {

	isSelected() {
		return this.props.moveIdx == this.props.selectedMoveIdx
	}

	determineColor() {
		if (this.isSelected()) {
			return "white";
		}
		return null;
	}

	determineBackgroundColor() {
		if (this.isSelected()) {
			return "#939BCB";
		}
		return null;

	handleDelete(e) {
		e.stopPropagation()
		this.props.handleDelete(this.props.moveIdx)
	}

	render() {
		if (this.props.shouldRender) {
			return(
				<Card hoverable style={{ width: 300, backgroundColor:this.determineBackgroundColor() }} onClick={() => this.props.selectMove(this.props.moveIdx)}>
				<Meta title={<div style={{color:this.determineColor() }}>{this.props.move.name} <DeleteOutlined style={{ float: 'right', color:this.determineColor() }} onClick={(e) => this.handleDelete(e)}/></div>} />
		  		</Card> 
	 		)
 		}
 		return(null)
 	}
}

export default Move;