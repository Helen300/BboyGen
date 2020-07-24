import React from 'react';
import { Card } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import ReactTooltip from "react-tooltip";
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
							data-tip="Move Added!"
						>
							{this.props.mobileView ?
								<ReactTooltip 
									event="click"
									eventOff="click"
									isCapture={true} // allows onClick to propagate down and add move as well as trigger tooltip
									delayHide={500}
									backgroundColor="rgba(0,0,0,0)" // transparent background
									textColor="#5f6bb2"
									place="right"
								/>
								:
								null
							}

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