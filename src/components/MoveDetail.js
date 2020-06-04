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
				<div style={{ backgroundColor: "#df7366", color: "white",  width:100, padding: 7}}>{this.props.move.name}</div>
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