import React from 'react';
import { connect } from 'react-redux';
import "../css/components/MoveDetail.css"
import { Input } from 'antd';

const { TextArea } = Input;




// for all moves, there exists one moveDetail div that gets updated 
class MoveDetail extends React.Component {

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
				<div className="MoveName">Name of Move: {this.props.move.name}</div>
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
						  onChange={() => this.props.updateDescription()}
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