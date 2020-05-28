import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Moves from '../components/Moves';
import CustomForm from '../components/Form';
import CreateMove from '../components/CreateMove';

// contains List of Moves and Form to add moves 

class MoveList extends React.Component {
	state = {
		moves: [],
	}

	updateMoves(newMoves) {
		console.log('updating state');
		this.setState({
			moves: newMoves,
		});
	}

	handler(newMoves) {
		console.log('updating page with new moves');
		axios.get('/api/moves/')
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
			axios.get('/api/moves/')
				.then(res => {
					this.setState({
						moves: res.data, 
					});
					console.log('getting in list and trying to print');
					console.log('printing data', res.data);
				}) 
		}

	}

	render() {
		return (
			<div>
			<Row>
		      <Col span={12}>

		  		<Moves data={this.state.moves} />
		      </Col>
		      <Col span={12}>
		      	<CreateMove 
		      		requestType="post" 
		      		btnText="Create" 
		      		action={this.updateMoves.bind(this)}
		      		currMoves ={this.state.moves}
		      	/>
		      </Col>
		    </Row>
			<br />
			{/* <h2>Create a Move</h2> */}
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