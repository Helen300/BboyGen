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
							data-tip 
							data-for="addedMoveTip"
						>
							{this.props.mobileView ?
								<ReactTooltip 
									event="mousedown"
									eventOff="mouseup"
									delayHide={750}
									backgroundColor="rgba(0,0,0,0)" // transparent background
									textColor="#5f6bb2"
									place="top"
									id="addedMoveTip"
									effect="solid"
									offset={{top: "-45%", right: "95%"}}
								>
								Move Added!
								</ReactTooltip>
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