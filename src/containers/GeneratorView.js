import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoveList from '../components/MoveList';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const tabNames = ['All Sets', 'STUFFF', 'Footwork', 'Freezes', 'Power'];

class GeneratorView extends React.Component {

	state = {
		setList: [], 
		selectedSetIdx: -1,
		currentTab:tabNames[0],

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

	addSet(newSet) {
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateSets/')
			var newList = this.state.moveList.concat([{
						// "name" : inputMove,
						"name": newSet,
						"description": "", 
					}])
			this.setState({ 
				setList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              setList: newList,
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	}


	deleteSet(setIdx) {
		console.log('delete a set')
		// simply creating headers 
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateSets/')

			// generating a new list and updating it 
			var newList = this.state.setList.slice(0, setIdx).concat(this.state.setList.slice(setIdx + 1))
			// if less, then selected move should shift down, if greater, selected move doesnt shift anywhere
			if(setIdx < this.state.selectedSetIdx) {
				this.setState({ 
					setList: newList,
					selectedSetIdx: this.state.selectedSetIdx - 1,
				})
			}
			if(setIdx === this.state.selectedSetIdx) {
				this.setState({ 
					setList: newList,
					selectedSetIdx: -1,
				})
			} else {
				this.setState({ 
					setList: newList,
				})
			}
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              setList: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
		}
		else {
			// show some message 
		}
	}

	selectSet(setIdx) {
		// unselect the move if it is selected again
		if(setIdx === this.state.selectedSetIdx) {
			this.setState({ 
				selectedSetIdx: -1
			});
		} else {
			this.setState({ 
				selectedSetIdx: setIdx
			});
		}

	}



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
					setList: res.data.setList
				});
			})
	        .catch(error => console.error(error));
			}
	}



	render() {
		return (

			<div className="row h-100">
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
						<TabPane className="TabPane" tab={tabNames[0]} key={tabNames[0]}>
							<MoveList 
								renderMoves={false}
								addSet={this.addSet.bind(this)} 
								deleteSet={this.deleteSet.bind(this)} 
								setList={this.state.setList} 
								selectSet={this.selectSet.bind(this)}
								selectedSetIdx={this.state.selectedSetIdx}
								currentTab={this.state.currentTab}
								onDragEnd={this.onDragEnd}
							/>
						</TabPane>
					</Tabs>
				</div>	
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={tabNames[1]} onChange={(key) => this.tabsChange(key)}>
						<TabPane className="TabPane" tab={tabNames[1]} key={tabNames[1]}>
		
						</TabPane>
					</Tabs>
				</div>
			</div>

		)
	}
}


const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token

	}
}

export default connect(mapStateToProps)(GeneratorView);