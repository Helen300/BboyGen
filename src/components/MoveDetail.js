import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;

// Should get rid of this 
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
				<TextArea id="move-description" 
						  rows={4} 
						  defaultValue={this.props.move.description} 
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