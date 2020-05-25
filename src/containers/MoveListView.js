import React from 'react';
import axios from 'axios';

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
	// called every time component is remounted 
	componentDidMount() {
		axios.get('/api/')
			.then(res => {
				this.setState({
					moves: res.data, 
				});
				console.log('printing data', res.data);
			}) 
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

export default MoveList