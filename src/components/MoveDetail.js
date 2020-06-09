import React from 'react';
import { connect } from 'react-redux';
import "../css/components/MoveDetail.css"
import { Input } from 'antd';
import axios from 'axios';
import $ from 'jquery';

const { TextArea } = Input;





// for all moves, there exists one moveDetail div that gets updated 
class MoveDetail extends React.Component {

	updateDescription() {
		var newDescription = $("#moveDescription").val()
		// make copy of array
		var newList = this.props.moveList.slice()
		newList[this.props.selectedMoveIdx].description = newDescription
		this.props.updateMoveList(newList);
	}


	updateName() {
		var newName = $("#moveName").val()
		// make copy of array
		var newList = this.props.moveList.slice()
		newList[this.props.selectedMoveIdx].name = newName;
		this.props.updateMoveList(newList);
	}

	render() {
		if (this.props.move == null) {
			return (
				// since we need to return one div
				<div>
				</div>
			);
		} else {
			return (
				// since we need to return one div
				<div>
				<h4 className="MoveDescription">Move Description</h4>
				<div className="MoveName">Name of Move: 
					<TextArea id="moveName"
							  rows={1}
							  value={this.props.move.name}
							  onChange={() => this.updateName()}
					/> 
				</div>
			
				{
				this.props.currentTab === 'All' ?
				<div>
					Type: {this.props.move.type} <br/>
					Reverse Possible: {this.props.move.reverse ? "Yes" : "No"}
				</div>
				:
				null

				}
				<TextArea id="moveDescription" 
						  rows={4} 
						  value={this.props.move.description} 
						  onChange={() => this.updateDescription()}
			    />
				</div>
			);
		}
	}

}

const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token
	}
}

export default connect(mapStateToProps)(MoveDetail);