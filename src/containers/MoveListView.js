import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Moves from '../components/Moves';
import CustomForm from '../components/Form';
import CreateMove from '../components/CreateMove';

import 'antd/dist/antd.css';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

// contains List of Moves and Form to add moves 

class MoveList extends React.Component {
	state = {
		moves_list: [],
	}

	addMove(newMove) {
		console.log('updating database and state');
		var newList = this.state.moves_list.push({
			"name" : newMove,
			"description": ""
		})
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/update-moves/')
		this.setState({
			moves_list: newList,
		});
		axios.post(apiUrl, {
              username: localStorage.getItem("username"),
              moves_list: this.state.moves_list 
          })
          .then(
          res => console.log(res), 
          )
          .catch(error => console.err(error));
	}

	handler(newMoves) {
		console.log('updating page with new moves');
		axios.get('/api/moves/')
			.then(res => {
				this.setState({
					moves_list: res.data, 
				});
				console.log('printing data', res.data);
			}) 
	}
	// when new props arrive, component rerenders
	componentWillReceiveProps(newProps) {
		console.log(newProps);
		console.log('username$$$$', localStorage.getItem('username'));
		if (newProps.token) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: newProps.token
			}
			axios.get('/api/moves/')
				.then(res => {
					this.setState({
						moves_list: res.data, 
					});
					console.log('getting in list and trying to print');
					console.log('printing data', res.data);
				}) 
		}

	}

	render() {
		return (
			<Search placeholder="Add Move" onSearch={value => this.addMove(value)} enterButton={<PlusOutlined />} />
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