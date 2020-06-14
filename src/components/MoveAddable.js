import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import "../css/components/Move.css"

// what does the Meta do? 
const { Meta } = Card;


class MoveAddable extends React.Component {

	render() {
		if (this.props.shouldRender) {
				return(
						<Card 
							hoverable 
							className={"NormalCard"}
							onClick={() => {this.props.addMove(this.props.move)}}
						>
							<Meta 
								title={<div className={"NormalTitle"}>
											{this.props.move.name}
										<PlusOutlined className={"NormalAdd"}/>
									   </div>} 
							/>
				  		</Card> 
		 		)
 		} else {
 			return(null)
 		}
 	}
}

export default MoveAddable;