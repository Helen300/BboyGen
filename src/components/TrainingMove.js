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
				return "CardColor1"
			case tabNames[2]:
				return "CardColor2"
			case tabNames[3]:
				return "CardColor3"
			case tabNames[4]:
				return "CardColor4"
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
						className={"NormalCard TrainingCard ".concat(this.getCardColor())}
						style={{flexBasis: cardWidth}}
					>
						<Meta 
							title={<div className={"SelectedTitle"}>
									<div>{this.props.move.name}</div>
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