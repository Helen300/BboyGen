import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoveDetail from '../components/MoveDetail';
import MoveList from '../components/MoveList';

import $ from 'jquery';

import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { Tabs } from 'antd';
// import { Input } from 'antd';
// contains List of Moves and Form to add moves 

const { TabPane } = Tabs;
const tabNames = ['All', 'Toprock', 'Footwork', 'Freezes', 'Power'];

class MoveListView extends React.Component {
	state = {
		moves_list: [],
		selected_move: null,
		selected_move_idx: -1,
		current_tab: tabNames[0],
	}

	addMove(newMove, type) {
		console.log('current_tab ', this.state.current_tab);
		console.log(type);
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/update-moves/')
			var newList = this.state.moves_list.concat([{
						"name" : newMove,
						"description": "", 
						"type": type,
					}])
			this.setState({ 
				moves_list: newList
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moves_list: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	      else {

	      }
	}

	deleteMove = (move_idx) => {
		console.log('deleting...');
		// simply creating headers 
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/update-moves/')

			// generating a new list and updating it 
			var newList = this.state.moves_list.slice(0, move_idx).concat(this.state.moves_list.slice(move_idx + 1))
			this.setState({ 
				moves_list: newList,
				selected_move: null,
				selected_move_idx: -1,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moves_list: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
		}
		else {
			// show some message 
		}
	
	// THIS DOESN'T ACTUALLY REFRESH THE PAGE 
	}

	select_move = (move_idx) => {
		console.log('selecting');
		this.setState({ 
			selected_move: this.state.moves_list[move_idx],
			selected_move_idx: move_idx
		})
	}

	updateDescription() {
		var new_description = $("#move-description").val()
		console.info("^^^^")
		console.info(new_description)
		console.info("^^^^")
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/update-moves/')
			// make copy of array
			var newList = this.state.moves_list.slice()
			newList[this.state.selected_move_idx].description = new_description
			this.setState({
				moves_list: newList,
				selected_move: newList[this.state.selected_move_idx]
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moves_list: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	      else {
	      	
	      }
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


	tabsChange = (key) => {
		console.log('changing tabs to ', key);
		this.setState({ 
			selected_move: null,
			selected_move_idx: -1,
			current_tab: key,
		})
	}

	render() {
		return (
			<Row>
			<Col span={10}>
			<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
				<TabPane tab={tabNames[0]} key={tabNames[0]}>
			  			<MoveList 
					    	addMove={this.addMove.bind(this)} 
					    	deleteMove={this.deleteMove.bind(this)} 
					    	moves_list={this.state.moves_list} 
					    	select_move={this.select_move.bind(this)}
					    	current_tab={this.state.current_tab}
				    	/>
			 	</TabPane>
		  		<TabPane tab={tabNames[1]} key={tabNames[1]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	moves_list={this.state.moves_list} 
				    	select_move={this.select_move.bind(this)}
				    	current_tab={this.state.current_tab}
			    	/>
			 	</TabPane>

		  		<TabPane tab={tabNames[2]} key={tabNames[2]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	moves_list={this.state.moves_list} 
				    	select_move={this.select_move.bind(this)}
				    	current_tab={this.state.current_tab}
			    	/>
			 	</TabPane>

			 	<TabPane tab={tabNames[3]} key={tabNames[3]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	moves_list={this.state.moves_list} 
				    	select_move={this.select_move.bind(this)}
				    	current_tab={this.state.current_tab}
			    	/>
			 	</TabPane>


		  		<TabPane tab={tabNames[4]} key={tabNames[4]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	moves_list={this.state.moves_list} 
				    	select_move={this.select_move.bind(this)}
				    	current_tab={this.state.current_tab}
			    	/>
			 	</TabPane>
			</Tabs>
			</Col>
			<Col span={14} style={{marginTop:62}}>
			   	<MoveDetail 
			    	move={this.state.selected_move} 
			    	updateDescription={this.updateDescription.bind(this)}
		    	/>
			</Col>
			</Row>

		);
	}

}

const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token

	}
}

export default connect(mapStateToProps)(MoveListView);