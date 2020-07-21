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
		    // render shorter width for backlog list
		    // default 20 width per second for horizontal
		    // for non-horizontal = 10 width per second
			var factor = this.props.horizontalMobileView ? 20 : 12
			var cardWidth = this.props.move.length * factor
			cardWidth = cardWidth.toString() + "%"
			return(
					<Card 
						hoverable 
						className={"NormalCard TrainingCard"}
						style={{flexBasis: cardWidth, backgroundColor: this.getCardColor()}}
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