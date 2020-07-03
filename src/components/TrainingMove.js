import React from 'react';
import { Card } from 'antd';
import "../css/components/Move.css"

// what does the Meta do? 
const { Meta } = Card;


class TrainingMove extends React.Component {

	render() {
			return(
					<Card 
						hoverable 
						className={"NormalCard TrainingCard"}
					>
						<Meta 
							title={<div className={"NormalTitle"}>
										{this.props.move.name}
								   </div>} 
						/>
			  		</Card> 
	 		)
 	}
}

export default TrainingMove;