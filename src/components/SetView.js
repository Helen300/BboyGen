import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';


// for all moves, there exists one moveDetail div that gets updated 
class SetView extends React.Component {


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
				<h4>Set</h4>
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

export default SetView;