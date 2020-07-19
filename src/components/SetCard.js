import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import "../css/components/Move.css"
import { Draggable } from 'react-beautiful-dnd';


const { Meta } = Card;


class SetCard extends React.Component {

	isSelected() {
		return this.props.setIdx === this.props.selectedSetIdx
	}

	deleteSet(e) {
		e.stopPropagation()
		this.props.deleteSet(this.props.setIdx)
	}

	render(){
		var card = <Card 
						hoverable 
						className={this.isSelected() ? "SelectedCard" : "NormalCard"}
						onClick={() => this.props.selectSet(this.props.setIdx)}
					>
						<Meta 
							title={<div className={(this.isSelected() ? "SelectedTitle" : "NormalTitle")}>{this.props.moveSet.name} 
									{this.props.showCardButtons ?
										<DeleteOutlined 
											className={this.isSelected() ? "SelectedDelete" : "NormalDelete"} 
											onClick={(e) => this.deleteSet(e)}
										/>
										:
										null
									}
								   </div>} 
						/>
			  		</Card> 
		if(this.props.shouldRender) {
			return(
				this.props.enableDrag ? 
				<Draggable draggableId={String(this.props.setIdx)} index={this.props.setIdx}>
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


export default SetCard;