import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import "../css/components/Move.css"

// what does the Meta do? 
const { Meta } = Card;


class MoveUndraggable extends React.Component {


	isSelected() {
		return this.props.moveIdx === this.props.selectedMoveIdx
	}

	addMoveToSet(e) {
		e.stopPropagation();
		console.log('~~~~add this move to list');
		this.props.addMove(this.props.move);
	}


	render() {
		if (this.props.shouldRender) {
				return(
						<Card 
							hoverable 
							className={"NormalCard"}
							onClick={() => {}}
						>
							<Meta 
								title={<div className={"NormalTitle"}>
											{this.props.move.name}
										<PlusOutlined 
											className={"NormalDelete"}
											onClick={(e) => this.addMoveToSet(e)} />
									   </div>} 
							/>
				  		</Card> 
		 		)
 		} else {
 			return(null)
 		}
 	}
}

export default MoveUndraggable;