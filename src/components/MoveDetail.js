import React from 'react';
import { connect } from 'react-redux';
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
			console.info("####")
			console.info(this.props.move.description)
			console.info("####")
			return (
				// since we need to return one div
				<div>
				<h3> Move Description </h3>
				<div style={{ backgroundColor: "#939BCB", color: "white",  width:100, padding: 7}}>{this.props.move.name}</div>
				{
					this.props.currentTab == 'All' ?
					<div>Type: {this.props.move.type}</div>
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