import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Moves from './Moves';

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
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/update-moves/')
		var newList = this.state.moves_list.concat([{
					"name" : newMove,
					"description": ""
				}])
		axios.post(apiUrl, {
              username: localStorage.getItem("username"),
              moves_list: newList
          })
          .then(res => {
          	this.setState({ 
				moves_list: newList
			})
          })
          .catch(error => console.error(error));
	}

	deleteMove = (move_idx) => {
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/update-moves/')
			var newList = this.state.moves_list.slice(0, move_idx).concat(this.state.moves_list.slice(move_idx + 1))
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moves_list: newList
	          })
	          .then(res => {
	          	this.setState({ 
					moves_list: newList
				})
	          })
	          .catch(error => console.error(error));
		}
		else {
			// show some message 
		}
	
	// THIS DOESN'T ACTUALLY REFRESH THE PAGE 
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
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/')
			axios.get(apiUrl)
			.then(res => {
				this.setState({
					moves_list: res.data.moves_list
				});
			})
	        .catch(error => console.error(error));
			}

	}

	render() {
		return (
			<div>
				<Moves data={this.state.moves_list} handle_delete={this.deleteMove}/>
				<Search placeholder="Add Move" onSearch={value => this.addMove(value)} enterButton={<PlusOutlined />} />
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