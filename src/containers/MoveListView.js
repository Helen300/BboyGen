import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Tabs } from 'antd';
import MoveDetail from '../components/MoveDetail';
import MoveList from '../components/MoveList';
import MoveInput from '../components/MoveInput';
import { tabNames, cardTypes, menuKeys } from "../constants"
import Slider from "react-slick";

import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import "../css/containers/Pane.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { withAuth0 } from '@auth0/auth0-react'
import { getCookie } from "../utils/getCookie"

// contains List of Moves and Form to add moves 


class MoveListView extends React.Component {
	state = {
		moveList: [],
		selectedMoveIdx: -1,
		currentTab:tabNames[0],
		loading: true,
		windowWidth: 0
	}

	updateSelectedMoveIdx(newIdx) {
		this.setState({
			selectedMoveIdx: newIdx
		})
	}

	updateMoveList(newList) {
		// const { user, isAuthenticated } = this.props.auth0; 
		const csrftoken = getCookie('csrftoken');
		console.log(csrftoken)
		this.setState({
			moveList: newList
		})
		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
		}
			
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/updateMoves/')
		axios.post(apiUrl, {
          userId: localStorage.getItem("userId"),
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
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/')
		console.log(apiUrl)
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				moveList: res.data.moveList,
				loading: false
			});
			console.log('in component did mount')
		})
        .catch(error => console.error(error));

        localStorage.setItem('menuKey', menuKeys.LIST)
        // keep track of window width
        this.updateWindowWidth();
  		window.addEventListener('resize', this.updateWindowWidth);
	}

	// when new props arrive, component rerenders
	componentWillReceiveProps(newProps) {
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
				moveList: res.data.moveList,
				loading: false
			});
		})
        .catch(error => console.error(error));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowWidth)
	}

	updateWindowWidth() {
	  this.setState({ windowWidth: window.innerWidth });
	}

	constructor(props) {
		super(props)
		this.updateWindowWidth = this.updateWindowWidth.bind(this)
	}

	scrollToBottom() {
		$(".Pane").animate({
			scrollTop: $('.Pane')[0].scrollHeight
		})
	}	

	render() {
		const panes = [
					<div className="col-sm-12 col-md-4 h-100">
						<MoveList
							updateSelectedMoveIdx={this.updateSelectedMoveIdx.bind(this)}
							updateMoveList={this.updateMoveList.bind(this)}
							updateSelectedTab={this.updateSelectedTab.bind(this)}
							moveList={this.state.moveList}
							selectedMoveIdx={this.state.selectedMoveIdx}
							currentTab={this.state.currentTab}
							enableDrag={true}
							cardType={cardTypes.MOVE}
							loading={this.state.loading}
						/>
						<MoveInput 
							currentTab={this.state.currentTab} 
							moveList={this.state.moveList}
							scrollToBottom={this.scrollToBottom.bind(this)}
							updateMoveList={this.updateMoveList.bind(this)}
						/>
					</div>,

					this.state.selectedMoveIdx !== -1 ?
					<div className="col-sm-12 col-md-8 h-100">
						   	<MoveDetail 
						    	move={this.state.moveList[this.state.selectedMoveIdx]} 
						    	moveList={this.state.moveList}
						    	selectedMoveIdx={this.state.selectedMoveIdx}
						    	currentTab={this.state.currentTab}
						    	updateMoveList={this.updateMoveList.bind(this)}
					    	/>
					</div>
					:
					null
				]
	    var settings = {
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      infinite: false,
	      adaptiveHeight: true,
	      draggable: true,
	      swipe: true,
	      dots: true
	    };
		// add slider for panes if window width is small (mobile)
		if(this.state.windowWidth < 768) {
			return (
				<Slider {...settings}>
					{panes}
				</Slider>
			)
		} else {
			return(
				<div className="row h-100">
					{panes}
				</div>
			)
		}
	}

}


export default withAuth0(MoveListView);