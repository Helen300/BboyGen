import React from 'react';
import { Card } from 'antd';
import "../css/components/Move.css"

// what does the Meta do? 
const { Meta } = Card;

class MoveUndraggable extends React.Component {
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
						<Card 
							hoverable 
							className="NormalCard"
							onClick={() => {}}
						>
							<Meta 
								title={<div className="NormalTitle">
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

export default Move;