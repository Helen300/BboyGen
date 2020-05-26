import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Moves from '../components/Moves';
import CustomForm from '../components/Form';


class MoveList extends React.Component {
	state = {
		moves: [],
	}


	handler(newMoves) {
		console.log('updating page with new moves');
		axios.get('/api/')
			.then(res => {
				this.setState({
					moves: res.data, 
				});
				console.log('printing data', res.data);
			}) 
	}
	// when new props arrive, component rerenders
	componentWillReceiveProps(newProps) {
		console.log(newProps);
		if (newProps.token) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: newProps.token
			}
			axios.get('/api/')
				.then(res => {
					this.setState({
						moves: res.data, 
					});
					console.log('printing data', res.data);
				}) 
		}

	}

	render() {
		return (
			<div>
				<Moves data={this.state.moves}/>
				<br />
				<h2>Create a Move</h2>
				<CustomForm 
					requestType="post"
					moveID={null}
					btnText="Create" moves={this.state.moves} action={this.handler.bind(this)}/>
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

export default connect(mapStateToProps)(MoveList);