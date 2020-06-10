import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoveDetail from '../components/MoveDetail';
import CardList from '../components/CardList';
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

	updateSelectedMoveIdx(newIdx) {
		this.setState({
			selectedMoveIdx: newIdx
		})
	}

	updateMoveList(newList) {
		this.setState({
			moveList: newList
		})
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			axios.post(apiUrl, {
		              username: localStorage.getItem("username"),
		              moveList: newList,
		          })
		          .then(res => {
		          })
		          .catch(error => console.error(error));
		}
	}

	// componentDidMount fixes a bug, but we can't check the token like componentWillReceiveProps. Figure this out later.

	componentDidMount() {
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
					  			<CardList
						  			renderMoves={true}
							    	cardList={this.state.moveList} 
							    	currentTab={this.state.currentTab}
							    	selectedIdx={this.state.selectedMoveIdx}
							    	updateSelectedIdx={this.updateSelectedMoveIdx.bind(this)}
							    	updateCardList={this.updateMoveList.bind(this)}
							    	/>
						 	</TabPane>
					  		<TabPane className="TabPane" tab={tabNames[1]} key={tabNames[1]}>
					  			<CardList
					  				renderMoves={true}
							    	cardList={this.state.moveList} 
							    	currentTab={this.state.currentTab}
							    	selectedIdx={this.state.selectedMoveIdx}
							    	updateSelectedIdx={this.updateSelectedMoveIdx.bind(this)}
							    	updateCardList={this.updateMoveList.bind(this)}
						    	/>
						 	</TabPane>

					  		<TabPane className="TabPane" tab={tabNames[2]} key={tabNames[2]}>
					  			<CardList
					  				renderMoves={true}
							    	cardList={this.state.moveList} 
							    	currentTab={this.state.currentTab}
							    	selectedIdx={this.state.selectedMoveIdx}
							    	updateSelectedIdx={this.updateSelectedMoveIdx.bind(this)}
							    	updateCardList={this.updateMoveList.bind(this)}
						    	/>
						 	</TabPane>

						 	<TabPane className="TabPane" tab={tabNames[3]} key={tabNames[3]}>
					  			<CardList 
					  				renderMoves={true}
							    	cardList={this.state.moveList} 
							    	currentTab={this.state.currentTab}
							    	selectedIdx={this.state.selectedMoveIdx}
							    	updateSelectedIdx={this.updateSelectedMoveIdx.bind(this)}
							    	updateCardList={this.updateMoveList.bind(this)}
						    	/>
						 	</TabPane>


					  		<TabPane className="TabPane" tab={tabNames[4]} key={tabNames[4]}>
					  			<CardList 
					  				renderMoves={true}
							    	cardList={this.state.moveList} 
							    	currentTab={this.state.currentTab}
							    	selectedIdx={this.state.selectedMoveIdx}
							    	updateSelectedIdx={this.updateSelectedMoveIdx.bind(this)}
							    	updateCardList={this.updateMoveList.bind(this)}
						    	/>
						 	</TabPane>
						</Tabs>
						<MoveInput 
							currentTab={this.state.currentTab} 
							moveList={this.state.moveList}
							updateMoveList={this.updateMoveList.bind(this)}
						/>
						</div>
						<div className="col-md-8">
						   	<MoveDetail 
						    	move={this.state.moveList[this.state.selectedMoveIdx]} 
						    	moveList={this.state.moveList}
						    	selectedMoveIdx={this.state.selectedMoveIdx}
						    	currentTab={this.state.currentTab}
						    	updateMoveList={this.updateMoveList.bind(this)}
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