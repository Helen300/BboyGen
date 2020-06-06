import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoveDetail from '../components/MoveDetail';
import MoveList from '../components/MoveList';
import MoveInput from '../components/MoveInput';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

import 'antd/dist/antd.css';
import { Row, Col, Tabs } from 'antd';
import "../css/containers/MoveListView.css"


// import { Input } from 'antd';
// contains List of Moves and Form to add moves 

const { TabPane } = Tabs;
const tabNames = ['All', 'Toprock', 'Footwork', 'Freezes', 'Power'];


class MoveListView extends React.Component {
	state = {
		movesList: [],
		selectedMoveIdx: -1,
		currentTab: tabNames[0],
	}
	
	addMove(newMove, type) {
		console.log('currentTab ', this.state.currentTab);
		console.log('adding move of type ', type);
		/* console.log(this.state.selectedMoveType);
		var inputMove = this.state.inputValue;
		var type = this.state.selectedMoveType; */ 
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			var newList = this.state.movesList.concat([{
						// "name" : inputMove,
						"name": newMove,
						"description": "", 
						"type": type,
					}])
			this.setState({ 
				movesList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              movesList: newList,
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	      else {

	      }
	}

	deleteMove = (moveIdx) => {
		console.log('deleting...');
		// simply creating headers 
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')

			// generating a new list and updating it 
			var newList = this.state.movesList.slice(0, moveIdx).concat(this.state.movesList.slice(moveIdx + 1))
			// if less, then selected move should shift down, if greater, selected move doesnt shift anywhere
			if(moveIdx < this.state.selectedMoveIdx) {
				this.setState({ 
					movesList: newList,
					selectedMoveIdx: this.state.selectedMoveIdx - 1,
				})
			}
			if(moveIdx == this.state.selectedMoveIdx) {
				this.setState({ 
					movesList: newList,
					selectedMoveIdx: -1,
				})
			} else {
				this.setState({ 
					movesList: newList,
				})
			}
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              movesList: newList
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

	selectMove = (moveIdx) => {
		// unselect the move if it is selected again
		if(moveIdx == this.state.selectedMoveIdx) {
			this.setState({ 
				selectedMoveIdx: -1
			});
		} else {
			this.setState({ 
				selectedMoveIdx: moveIdx
			});
		}
	}

	updateDescription() {
		var newDescription = $("#moveDescription").val()
		console.info("^^^^")
		console.info(newDescription)
		console.info("^^^^")
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			// make copy of array
			var newList = this.state.movesList.slice()
			newList[this.state.selectedMoveIdx].description = newDescription
			this.setState({
				movesList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              movesList: newList
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
					movesList: res.data.movesList
				});
			})
	        .catch(error => console.error(error));
			}
	}


	tabsChange = (key) => {
		this.setState({ 
			selectedMoveIdx: -1,
			currentTab: key,
		})

	}


	render() {
		return (
			<div className="row">
				<div className="col-md-4">
				<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
					<TabPane className="TabPane" tab={tabNames[0]} key={tabNames[0]}>
				  			<MoveList 
						    	addMove={this.addMove.bind(this)} 
						    	deleteMove={this.deleteMove.bind(this)} 
						    	movesList={this.state.movesList} 
						    	selectMove={this.selectMove.bind(this)}
						    	currentTab={this.state.currentTab}
						    	selectedMoveIdx={this.state.selectedMoveIdx}
					    	/>
				 	</TabPane>
			  		<TabPane tab={tabNames[1]} key={tabNames[1]}>
			  			<MoveList 
					    	addMove={this.addMove.bind(this)} 
					    	deleteMove={this.deleteMove.bind(this)} 
					    	movesList={this.state.movesList} 
					    	selectMove={this.selectMove.bind(this)}
					    	currentTab={this.state.currentTab}
					    	selectedMoveIdx={this.state.selectedMoveIdx}
				    	/>
				 	</TabPane>

			  		<TabPane tab={tabNames[2]} key={tabNames[2]}>
			  			<MoveList 
					    	addMove={this.addMove.bind(this)} 
					    	deleteMove={this.deleteMove.bind(this)} 
					    	movesList={this.state.movesList} 
					    	selectMove={this.selectMove.bind(this)}
					    	currentTab={this.state.currentTab}
					    	selectedMoveIdx={this.state.selectedMoveIdx}
				    	/>
				 	</TabPane>

				 	<TabPane tab={tabNames[3]} key={tabNames[3]}>
			  			<MoveList 
					    	addMove={this.addMove.bind(this)} 
					    	deleteMove={this.deleteMove.bind(this)} 
					    	movesList={this.state.movesList} 
					    	selectMove={this.selectMove.bind(this)}
					    	currentTab={this.state.currentTab}
					    	selectedMoveIdx={this.state.selectedMoveIdx}
				    	/>
				 	</TabPane>


			  		<TabPane tab={tabNames[4]} key={tabNames[4]}>
			  			<MoveList 
					    	addMove={this.addMove.bind(this)} 
					    	deleteMove={this.deleteMove.bind(this)} 
					    	movesList={this.state.movesList} 
					    	selectMove={this.selectMove.bind(this)}
					    	currentTab={this.state.currentTab}
					    	selectedMoveIdx={this.state.selectedMoveIdx}
				    	/>
				 	</TabPane>
				</Tabs>
				<MoveInput 
					addMove={this.addMove.bind(this)} 
					currentTab={this.state.currentTab} />
				</div>
				<div className="col-md-8">
				   	<MoveDetail 
				    	move={this.state.movesList[this.state.selectedMoveIdx]} 
				    	updateDescription={this.updateDescription.bind(this)}
				    	currentTab={this.state.currentTab}
			    	/>
				</div>
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

export default connect(mapStateToProps)(MoveListView);