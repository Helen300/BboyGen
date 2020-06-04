import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

// what does the Meta do? 
const { Meta } = Card;

class Move extends React.Component {

	state = {
		isActive: false, 

	}

	determineColor() {
		if (this.state.isActive) {
			return "white";
		}
		return null;
	}

	determineBackgroundColor() {
		if (this.state.isActive) {
			return "#939BCB";
		}
		return null;
	}

	render() {
		if (this.props.shouldRender) {
			return(
				<Card hoverable style={{ width: 300, backgroundColor:this.determineBackgroundColor() }} onClick={() => this.props.selectMove(this.props.moveIdx, this)}>
				<Meta title={<div style={{color:this.determineColor() }}>{this.props.move.name} <DeleteOutlined style={{ float: 'right', color:this.determineColor() }} onClick={() => this.props.handleDelete(this.props.moveIdx)}/></div>} />
		  		</Card> 
	 		)
 		}
 		return(null)
 	}
}

export default Move;