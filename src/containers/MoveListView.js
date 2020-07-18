import React from 'react'
import axios from 'axios'
import $ from 'jquery'

import MoveList from '../components/MoveList'
import MoveInput from '../components/MoveInput'
import MoveDetail from '../components/MoveDetail'
import { tabNames, cardTypes } from "../constants"


// import { Tabs } from 'antd'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.css'
import "../css/containers/Pane.css"

import { withAuth0 } from '@auth0/auth0-react'
import { getCookie } from "../utils/getCookie"
// import { connect } from 'react-redux'


// contains List of Moves and Form to add moves 
class MoveListView extends React.Component {
	state = {
		moveList: [],
		selectedMoveIdx: -1,
		currentTab:tabNames[0],
	}

	updateSelectedMoveIdx(newIdx) {
		this.setState({
			selectedMoveIdx: newIdx
		})
	}


	updateMoveList(newList) {
		const { user, isAuthenticated } = this.props.auth0; 
		const csrftoken = getCookie('csrftoken');
		console.log(csrftoken)
		this.setState({
			moveList: newList
		})
		/* if (this.state.user !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			} */ 

		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
		}
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem('userId'))
		apiUrl = apiUrl.concat('/updateMoves/')
		axios.post(apiUrl, {
              userId: localStorage.getItem('userId'),
              moveList: newList,
          })
          .then(res => {
          })
          .catch(error => console.error(error));

	}


	updateSelectedTab(newTab) {
		this.setState({
			currentTab: newTab
		})
	}


	// componentDidMount fixes a bug, but we can't check the token like componentWillReceiveProps. Figure this out later.

	componentDidMount() {
		// const { user, isAuthenticated, getAccessTokenSilently } = this.props.auth0; 
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem('userId'))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				moveList: res.data.moveList,
			});
		})
        .catch(error => console.error(error))
	}

	// when new props arrive, component rerenders
	componentWillReceiveProps(newProps) {
		/* if (newProps.token) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: newProps.token
			} */ 
		const csrftoken = getCookie('csrftoken');

		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
		}
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem('userId'))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				moveList: res.data.moveList
			});
		})
        .catch(error => console.error(error))
	}

	scrollToBottom() {
		$(".Pane").animate({
			scrollTop: $('.Pane')[0].scrollHeight
		})
	}	



	render() {
		return (
				<div className="row h-100">
					<div className="col-md-4 h-100">
						<MoveList
							updateSelectedMoveIdx={this.updateSelectedMoveIdx.bind(this)}
							updateMoveList={this.updateMoveList.bind(this)}
							updateSelectedTab={this.updateSelectedTab.bind(this)}
							moveList={this.state.moveList}
							selectedMoveIdx={this.state.selectedMoveIdx}
							currentTab={this.state.currentTab}
							enableDrag={true}
							cardType={cardTypes.MOVE}
						/>
						<MoveInput 
							currentTab={this.state.currentTab} 
							moveList={this.state.moveList}
							scrollToBottom={this.scrollToBottom.bind(this)}
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


export default withAuth0(MoveListView);