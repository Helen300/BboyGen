import React from 'react';
import { Card } from 'antd';
import "../css/components/Move.css"

// what does the Meta do? 
const { Meta } = Card;

class MoveUndraggable extends React.Component {

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