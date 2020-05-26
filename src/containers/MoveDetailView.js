import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';


// Should get rid of this 
class MoveDetail extends React.Component {

	state = {
		move: {},

	}

	componentWillReceiveProps(newProps) {
		console.log(newProps);
		// get new token 
		if (newProps.token) {
			// set Headers
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: newProps.token
			}
			const moveID = this.props.match.params.moveID;
			console.log('moveID', moveID)
			// create request 
			axios.get(`/api/${moveID}/`)
				.then(res => {
					this.setState({
						move: res.data,
						moveID: moveID
					});
				}) 
		}

	}

	handleDelete = (event) => {
		if (this.props.token !== null) {
			const moveID = this.props.match.params.moveID;
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			console.log('deleting move with ID: ', moveID);
			axios.delete(`/api/${moveID}/`)
			this.props.history.push('/');

		}
		else {
			// show some message 
		}
	
	// THIS DOESN'T ACTUALLY REFRESH THE PAGE 
	}



	render() {
		return (
			// since we need to return one div
			<div>
			<Card title={this.state.move.name}>
				<p>{this.state.move.id}</p>
			</Card>
			{/* not sure why we must use lower case form */}
			<form onSubmit={this.handleDelete}>
				<Button type="danger" htmlType="submit">Delete</Button>
			</form>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token
	}
}

export default connect(mapStateToProps)(MoveDetail);