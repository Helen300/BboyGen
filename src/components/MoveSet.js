import React from 'react';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import "../css/components/Move.css"
import { Draggable } from 'react-beautiful-dnd';


const { Meta } = Card;


class MoveSet extends React.Component {

	isSelected() {
		return this.props.setIdx === this.props.selectedSetIdx
	}

	deleteSet(e) {
		e.stopPropagation()
		this.props.deleteSet(this.props.setIdx)
	}

	render(){
		return(
			<Draggable draggableId={String(this.props.setIdx)} index={this.props.setIdx}>
				{provided => (
				<div 
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<Card 
						hoverable 
						className={this.isSelected() ? "SelectedCard" : "NormalCard"}
						onClick={() => this.props.selectSet(this.props.setIdx)}
					>
						<Meta 
							title={<div className={(this.isSelected() ? "SelectedTitle" : "NormalTitle")}>{this.props.moveSet.name} 
									<DeleteOutlined 
										className={this.isSelected() ? "SelectedDelete" : "NormalDelete"} 
										onClick={(e) => this.deleteSet(e)}/>
								   </div>} 
						/>
			  		</Card> 
		  		</div>
				)}
			</Draggable>
		);
	}



}


export default MoveSet;