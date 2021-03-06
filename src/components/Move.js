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

	getReverseIconClass(reverseEnabled) {
		var classList = ""
		if(this.isSelected()) {
			classList = "SelectedReverse"
			if(reverseEnabled) {
				classList = classList.concat(" SelectedToggledReverse")
			}
		} else {
			classList = "NormalReverse"
			if(reverseEnabled) {
				classList = classList.concat(" ToggledReverse")
			}
		}
		return classList
	}


	render() {
		var cardButtons = 
				<div>
					{this.props.move.name} 
					<DeleteOutlined className={this.isSelected() ? "SelectedDelete" : "NormalDelete"} onClick={(e) => this.deleteMove(e)}/> 
						{this.props.showReverseIcon ? 
						<ReloadOutlined className={this.getReverseIconClass(this.props.move.reverseEnabled)} onClick={(e) => this.toggleReverse(e)}/>
						:
						null
					}
				</div>
		var card =
				<Card 
					hoverable 
					className={this.isSelected() ? "SelectedCard" : "NormalCard"}
					onClick={() => this.props.selectMove(this.props.moveIdx)}
				>
					<Meta 
						title={<div className={(this.isSelected() ? "SelectedTitle" : "NormalTitle")}>
									{this.props.showCardButtons ? cardButtons : this.props.move.name}
							   </div>} 
					/>
		  		</Card> 
		if (this.props.shouldRender) {
				return(
					this.props.enableDrag ?
					<Draggable draggableId={String(this.props.moveIdx)} index={this.props.moveIdx}>
					{provided => (
						<div 
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							{card}
				  		</div>
					)}
					</Draggable>
					:
					card
		 		)
 		} else {
 			return(null)
 		}
 	}
}

export default Move;