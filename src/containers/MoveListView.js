import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import $ from 'jquery';
import { Tabs } from 'antd';
import MoveDetail from '../components/MoveDetail';
import MoveList from '../components/MoveList';
import MoveInput from '../components/MoveInput';
import HelpMessages from '../components/HelpMessages';
import { tabNames, cardTypes, menuKeys } from "../constants"
import Slider from "react-slick";
import EditCardName from '../components/EditCardName';

import "../css/containers/Pane.css"
import "../css/containers/MoveListView.css"
import "../css/containers/Column.css"
import "../css/components/HelpMessages.css"
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
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
		mobileView: false,
	}

	updateSelectedMoveIdx(newIdx) {
		this.setState({
			selectedMoveIdx: newIdx
		})
		// slide to move detail when selecting a card
		if(this.state.mobileView){
			this.slider.slickGoTo(1)
		}
	}

	updateMoveList(newList) {
		// const { user, isAuthenticated } = this.props.auth0; 
		const csrftoken = getCookie('csrftoken');
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

	// set height of columns equal to view height, must do this here since Slider overrides columns inline styles
	// this function runs after render so we write in the height after Slider writes its inline styles in
	componentDidUpdate(){
		const mainViewHeight = $("#mainViewContainer").height()
		// make space for slider dots if on mobile view
		const slickDotsHeight = this.state.mobileView ? 25 : 0
		$(".Column").height(mainViewHeight - slickDotsHeight)
	}

	// componentDidMount fixes a bug, but we can't check the token like componentWillReceiveProps. Figure this out later.
	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				moveList: res.data.moveList,
				loading: false
			});
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
		if(window.innerWidth < 576){
			this.setState({
				mobileView: true
			})
		} else {
			this.setState({
				mobileView: false
			})
		}
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
		   const messages = [
		    {
		      title: <center>
		      		 	<FontAwesomeIcon
					        icon={faEdit}
					     />
					 </center>,
		      content: <div>
					     Select a move to <span>edit</span> details 
					     (reversability, type, description)
					   </div>,
		    },
		    {
		      title: <center>
		      		 	<FontAwesomeIcon
					        icon={faPlus}
					     />
					 </center>,
		      content: <div>
					     Select type and input name to 
					     <span> add</span> new moves
					   </div>,
		    },
		    {
		      title: <center>
		      			<FontAwesomeIcon
					        icon={faHandRock}
					     />
				     </center>,
		      content: this.state.mobileView ?
		      		   <div>
		      			 	<span>Drag and drop</span> {"moves to reorder them (disabled on mobile view)"}			     
					   </div>
					   :
					   <div>
					   		<span>Drag and drop</span> {"moves to reorder them"}
					   </div>,
		    },
		  ];
		const panes = [
					<div className="col-xs-12 col-sm-4 Column">
						<MoveList
							updateSelectedMoveIdx={this.updateSelectedMoveIdx.bind(this)}
							updateMoveList={this.updateMoveList.bind(this)}
							updateSelectedTab={this.updateSelectedTab.bind(this)}
							moveList={this.state.moveList}
							selectedMoveIdx={this.state.selectedMoveIdx}
							currentTab={this.state.currentTab}
							enableDrag={!this.state.mobileView}
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
					<div className="col-xs-12 col-sm-8 Column">
						<EditCardName
							selectedIdx={this.state.selectedMoveIdx}
							updateCardList={this.updateMoveList.bind(this)}
							cardList={this.state.moveList}
						/>
					   	<MoveDetail 
					    	move={this.state.moveList[this.state.selectedMoveIdx]} 
					    	moveList={this.state.moveList}
					    	selectedMoveIdx={this.state.selectedMoveIdx}
					    	currentTab={this.state.currentTab}
					    	updateMoveList={this.updateMoveList.bind(this)}
				    	/>
					</div>
					:
					<div className="col-xs-12 col-sm-8 Column">
						{this.state.mobileView ?
							null
							:
							<div className="Image"> 
								<img src={ require('../img/dan.png') } width="auto" height="100%"/>
							</div>
						}
						<div className="HelpMsg">
							<HelpMessages 
								data={messages}
								// add 3% bottom margin to col-xs-12 if mobile view
								// stack help messages if md threshold so the text doesnt get too scrunched up
								columnClass={this.state.mobileView ? "col-md-4 col-xs-12" : "col-md-4"}
							/>
						</div>

					</div>
				]
	    var settings = {
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      infinite: false,
	      draggable: true,
	      swipe: true,
	      dots: true,
	      initialSlide: 1
	    };
		// add slider for panes if window width is small (mobile)
		if(this.state.mobileView) {
			return (
				<Slider ref={slider => (this.slider = slider)} {...settings}>
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