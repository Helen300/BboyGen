import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import "../css/components/Move.css"

// what does the Meta do? 
const { Meta } = Card;

class Move extends React.Component {

	isSelected() {
		return this.props.moveIdx == this.props.selectedMoveIdx
	}

	deleteMove(e) {
		e.stopPropagation()
		this.props.deleteMove(this.props.moveIdx)
	}

	render() {
		if (this.props.shouldRender) {
			if(this.isSelected()) {
				return(
					<Card hoverable className="SelectedCard" onClick={() => this.props.selectMove(this.props.moveIdx)}>
					<Meta title={<div className="SelectedTitle">{this.props.move.name} <DeleteOutlined className="SelectedDelete" onClick={(e) => this.deleteMove(e)}/></div>} />
			  		</Card> 
		 		)
			} else {
				return(
					<Card hoverable className="NormalCard" onClick={() => this.props.selectMove(this.props.moveIdx)}>
					<Meta title={<div className="NormalTitle">{this.props.move.name} <DeleteOutlined className="NormalDelete" onClick={(e) => this.deleteMove(e)}/></div>} />
			  		</Card> 
		 		)
			}
 		}
 		return(null)
 	}
}

export default Move;