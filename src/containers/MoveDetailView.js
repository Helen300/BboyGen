import React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';

class MoveDetail extends React.Component {

	state = {
		move: {},

	}

	handleDelete = (event) => {
		const moveID = this.props.match.params.moveID;
		console.log('deleting move with ID: ', moveID);
		axios.delete(`http://127.0.0.1:8000/api/${moveID}/`)
		this.props.history.push('/');
		// THIS DOESN'T ACTUALLY REFRESH THE PAGE 
	}

	// called every time component is remounted 
	componentDidMount() {
		const moveID = this.props.match.params.moveID;
		console.log('moveID', moveID)
		axios.get(`http://127.0.0.1:8000/api/${moveID}/`)
			.then(res => {
				this.setState({
					move: res.data,
					moveID: moveID
				});
			}) 
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

export default MoveDetail