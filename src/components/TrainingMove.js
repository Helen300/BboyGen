import React from 'react';
import { Card } from 'antd';
import { tabNames } from "../constants";
import { ReloadOutlined } from '@ant-design/icons'
import "../css/components/Move.css"

// what does the Meta do? 
const { Meta } = Card;


class TrainingMove extends React.Component {
	getCardColor() {
		switch(this.props.move.type) {
			case tabNames[1]:
				return "#B0ABCA"
			case tabNames[2]:
				return "#E1C6AC"
			case tabNames[3]:
				return "#A3D6D4"
			case tabNames[4]:
				return "#E2A9BE"
		}
	}


	render() {
			var cardWidth = this.props.move.length * 15
			cardWidth = cardWidth.toString() + "%"
			return(
					<Card 
						hoverable 
						className={"NormalCard TrainingCard"}
						style={{width: cardWidth, backgroundColor: this.getCardColor()}}
					>
						<Meta 
							title={<div className={"SelectedTitle"}>
										{this.props.move.name}
								   
								   {this.props.move.reverseEnabled? 
										<ReloadOutlined className={"SelectedReverse"}/>
										:
									null}
									</div>
								} 
						/>
			  		</Card> 
	 		)
 	}
}

export default TrainingMove;