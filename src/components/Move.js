import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import "../css/components/Move.css"
import { Draggable } from 'react-beautiful-dnd';

// what does the Meta do? 
const { Meta } = Card;

class Move extends React.Component {

	isSelected() {
		return this.props.moveIdx === this.props.selectedMoveIdx
	}

	deleteMove(e) {
		e.stopPropagation()
		this.props.deleteMove(this.props.moveIdx)
	}

	toggleReverse(e) {
		e.stopPropagation()
		this.props.toggleReverse(this.props.moveIdx)
	}

	getReverseIconClass(reverse) {
		var classList = ""
		if(this.isSelected()) {
			classList = "SelectedReverse"
			if(reverse) {
				classList = classList.concat(" SelectedToggledReverse")
			}
		} else {
			classList = "NormalReverse"
			if(reverse) {
				classList = classList.concat(" ToggledReverse")
			}
		}
		return classList
	}

	render() {
		if (this.props.shouldRender) {
				return(
					<Draggable draggableId={String(this.props.moveIdx)} index={this.props.moveIdx}>
					{provided => (
						<div 
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<Card 
								hoverable 
								className={this.isSelected() ? "SelectedCard" : "NormalCard"}
								onClick={() => this.props.selectMove(this.props.moveIdx)}
							>
								<Meta 
									title={<div className={(this.isSelected() ? "SelectedTitle" : "NormalTitle")}>
												{this.props.move.name} <DeleteOutlined className={this.isSelected() ? "SelectedDelete" : "NormalDelete"} onClick={(e) => this.deleteMove(e)}/> <ReloadOutlined className={this.getReverseIconClass(this.props.move.reverse)} onClick={(e) => this.toggleReverse(e)}/>
										   </div>} 
								/>
					  		</Card> 
				  		</div>
					)}
					</Draggable>
		 		)
 		} else {
 			return(null)
 		}
 	}
}

export default Move;