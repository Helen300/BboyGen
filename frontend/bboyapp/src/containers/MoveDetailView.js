import React from 'react';
import axios from 'axios';
import { Card } from 'antd';

class MoveDetail extends React.Component {

	state = {
		move: {}
	}
	// called every time component is remounted 
	componentDidMount() {
		const moveID = this.props.match.params.moveID;
		console.log('moveID', moveID)
		axios.get(`http://127.0.0.1:8000/api/${moveID}`)
			.then(res => {
				this.setState({
					move: res.data
				});
			}) 
	}
	render() {
		return (
			<Card title={this.state.move.name}>
				<p>{this.state.move.id}</p>
			</Card>
		);
	}

}

export default MoveDetail