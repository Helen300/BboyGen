import React from 'react';
import axios from 'axios';

import Moves from '../components/Move';
import CustomForm from '../components/Form';

class MoveList extends React.Component {

	state = {
		moves: []
	}
	// called every time component is remounted 
	componentDidMount() {
		axios.get('http://localhost:8000/api/')
			.then(res => {
				this.setState({
					moves: res.data
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
				<CustomForm />
			</div>


		);
	}

}

export default MoveList