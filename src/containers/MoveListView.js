import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoveDetail from '../components/MoveDetail';
import MoveList from '../components/MoveList';
import MoveInput from '../components/MoveInput';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';

import 'antd/dist/antd.css';

import { Tabs } from 'antd';
import "../css/containers/MoveListView.css"



// import { Input } from 'antd';
// contains List of Moves and Form to add moves 

const { TabPane } = Tabs;
const tabNames = ['All', 'Toprock', 'Footwork', 'Freezes', 'Power'];


class MoveListView extends React.Component {
	state = {
		moveList: [],
		selectedMoveIdx: -1,
		currentTab: tabNames[0],
	}

	onDragEnd = result => {
		const { destination, source, draggableId } = result;
		// if dropped outside of droppable area, do nothing
		if(!destination) {
			return;
		}
		// if dropped in the same area and index, do nothing
		if(destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		// if move a card from behind selected card to in front of it or replacing it, update selectMoveIdx
		if(source.index < this.state.selectedMoveIdx && destination.index >= this.state.selectedMoveIdx) {
			this.setState({
				selectedMoveIdx: this.state.selectedMoveIdx - 1
			})
		}
		// if move a card from in front selected card to behind it or replacing it, update selectMoveIdx
		if(source.index > this.state.selectedMoveIdx && destination.index <= this.state.selectedMoveIdx) {
			this.setState({
				selectedMoveIdx: this.state.selectedMoveIdx + 1
			})
		}
		// if we move the selected card
		if(this.state.selectedMoveIdx === source.index) {
			this.setState({
				selectedMoveIdx: destination.index
			})
		}
		// make a copy of list
		var newList = this.state.moveList.slice()
		// remove item
		var movedItem = newList.splice(source.index, 1)
		// add item
		newList.splice(destination.index, 0, movedItem[0])
		this.setState({
			moveList: newList
		})
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/updateMoves/')
		axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moveList: newList,
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	};
	
	addMove(newMove, type) {
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			var newList = this.state.moveList.concat([{
						// "name" : inputMove,
						"name": newMove,
						"description": "", 
						"type": type,
						"reverse": false
					}])
			this.setState({ 
				moveList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moveList: newList,
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	      else {

	      }
	}

	deleteMove = (moveIdx) => {
		// simply creating headers 
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')

			// generating a new list and updating it 
			var newList = this.state.moveList.slice(0, moveIdx).concat(this.state.moveList.slice(moveIdx + 1))
			// if less, then selected move should shift down, if greater, selected move doesnt shift anywhere
			if(moveIdx < this.state.selectedMoveIdx) {
				this.setState({ 
					moveList: newList,
					selectedMoveIdx: this.state.selectedMoveIdx - 1,
				})
			}
			if(moveIdx === this.state.selectedMoveIdx) {
				this.setState({ 
					moveList: newList,
					selectedMoveIdx: -1,
				})
			} else {
				this.setState({ 
					moveList: newList,
				})
			}
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moveList: newList
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
		if(moveIdx === this.state.selectedMoveIdx) {
			this.setState({ 
				selectedMoveIdx: -1
			});
		} else {
			this.setState({ 
				selectedMoveIdx: moveIdx
			});
		}
	}

	toggleReverse = (moveIdx) => {
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')

			// generating a new list and updating it 
			var newList = this.state.moveList.slice()
			newList[moveIdx].reverse = !newList[moveIdx].reverse
			this.setState({ 
				moveList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moveList: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
		}
		else {
			// show some message 
		}
	}

	updateDescription() {
		var newDescription = $("#moveDescription").val()
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			// make copy of array
			var newList = this.state.moveList.slice()
			newList[this.state.selectedMoveIdx].description = newDescription
			this.setState({
				moveList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moveList: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	      else {
	      	
	      }
	}


	updateName() {
		var newName = $("#moveName").val()
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			// make copy of array
			var newList = this.state.moveList.slice()
			newList[this.state.selectedMoveIdx].name = newName;
			this.setState({
				moveList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              moveList: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	}

	// when new props arrive, component rerenders
	componentWillReceiveProps(newProps) {
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
					moveList: res.data.moveList
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
				<div className="row h-100">
					<div className="col-md-4 h-100">
						<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
							<TabPane className="TabPane" tab={tabNames[0]} key={tabNames[0]}>
					  			<MoveList
						  			renderMoves={true}
							    	addMove={this.addMove.bind(this)} 
							    	deleteMove={this.deleteMove.bind(this)} 
							    	moveList={this.state.moveList} 
							    	selectMove={this.selectMove.bind(this)}
							    	currentTab={this.state.currentTab}
							    	selectedMoveIdx={this.state.selectedMoveIdx}
							    	onDragEnd={this.onDragEnd}
							    	toggleReverse={this.toggleReverse}
							    	/>
						 	</TabPane>
					  		<TabPane className="TabPane" tab={tabNames[1]} key={tabNames[1]}>
					  			<MoveList
					  				renderMoves={true}
							    	addMove={this.addMove.bind(this)} 
							    	deleteMove={this.deleteMove.bind(this)} 
							    	moveList={this.state.moveList} 
							    	selectMove={this.selectMove.bind(this)}
							    	currentTab={this.state.currentTab}
							    	selectedMoveIdx={this.state.selectedMoveIdx}
							    	onDragEnd={this.onDragEnd}
							    	toggleReverse={this.toggleReverse}
						    	/>
						 	</TabPane>

					  		<TabPane className="TabPane" tab={tabNames[2]} key={tabNames[2]}>
					  			<MoveList
					  				renderMoves={true}
							    	addMove={this.addMove.bind(this)} 
							    	deleteMove={this.deleteMove.bind(this)} 
							    	moveList={this.state.moveList} 
							    	selectMove={this.selectMove.bind(this)}
							    	currentTab={this.state.currentTab}
							    	selectedMoveIdx={this.state.selectedMoveIdx}
							    	onDragEnd={this.onDragEnd}
							    	toggleReverse={this.toggleReverse}
						    	/>
						 	</TabPane>

						 	<TabPane className="TabPane" tab={tabNames[3]} key={tabNames[3]}>
					  			<MoveList 
					  				renderMoves={true}
							    	addMove={this.addMove.bind(this)} 
							    	deleteMove={this.deleteMove.bind(this)} 
							    	moveList={this.state.moveList} 
							    	selectMove={this.selectMove.bind(this)}
							    	currentTab={this.state.currentTab}
							    	selectedMoveIdx={this.state.selectedMoveIdx}
							    	onDragEnd={this.onDragEnd}
							    	toggleReverse={this.toggleReverse}
						    	/>
						 	</TabPane>


					  		<TabPane className="TabPane" tab={tabNames[4]} key={tabNames[4]}>
					  			<MoveList 
					  				renderMoves={true}
							    	addMove={this.addMove.bind(this)} 
							    	deleteMove={this.deleteMove.bind(this)} 
							    	moveList={this.state.moveList} 
							    	selectMove={this.selectMove.bind(this)}
							    	currentTab={this.state.currentTab}
							    	selectedMoveIdx={this.state.selectedMoveIdx}
							    	onDragEnd={this.onDragEnd}
							    	toggleReverse={this.toggleReverse}
						    	/>
						 	</TabPane>
						</Tabs>
						<MoveInput 
							addMove={this.addMove.bind(this)} 
							currentTab={this.state.currentTab} />
						</div>
						<div className="col-md-8">
						   	<MoveDetail 
						    	move={this.state.moveList[this.state.selectedMoveIdx]} 
						    	updateName={this.updateName.bind(this)}
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