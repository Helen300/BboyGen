import React from 'react';
import Moves from '../components/Move';
import axios from 'axios';


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
			<Moves data={this.state.moves}/>

		);
	}

}

export default MoveList