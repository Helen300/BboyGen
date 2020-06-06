import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import "../css/components/Move.css"
import { Draggable } from 'react-beautiful-dnd';

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
					<Draggable draggableId={this.props.moveIdx} index={this.props.moveIdx}>
					{(provided) => (
						<Card 
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							innerRef={provided.innerRef}
							hoverable 
							className="SelectedCard" 
							onClick={() => this.props.selectMove(this.props.moveIdx)}
						>
							<Meta title={<div className="SelectedTitle">{this.props.move.name} <DeleteOutlined className="SelectedDelete" onClick={(e) => this.deleteMove(e)}/></div>} />
				  		</Card> 
					)}
					</Draggable>
		 		)
			} else {
				return(
					<Draggable draggableId={this.props.moveIdx} index={this.props.moveIdx}>
					{(provided) => (
						<Card 
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							innerRef={provided.innerRef}
							hoverable 
							className="NormalCard" 
							onClick={() => this.props.selectMove(this.props.moveIdx)}>
							<Meta title={<div className="NormalTitle">{this.props.move.name} <DeleteOutlined className="NormalDelete" onClick={(e) => this.deleteMove(e)}/></div>} />
				  		</Card> 
			  		)}
			  		</Draggable>
		 		)
			}
 		}
 		return(null)
 	}
}

export default Move;