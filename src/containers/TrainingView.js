import React from 'react';
import axios from 'axios';

import EditValues from '../components/EditValues';
import CardList from '../components/CardList';
import { tabNames, menuKeys, cardTypes, setTabNames, editValueTypes } from "../constants";
import { Button } from 'antd';
import { PauseOutlined, CaretRightOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import RandomMove from '../RandomMove';
import $ from 'jquery';
import Slider from "react-slick";

import "../css/containers/TrainingView.css"
import "../css/containers/Column.css"
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { withAuth0 } from '@auth0/auth0-react';
import { getCookie } from "../utils/getCookie"

class TrainingView extends React.Component {

	state = {
		currSet: [],
		backlogSet: [],
		currSetSize: 0,
		backlogSetSize: 0,
		probs: {},
		allMoves: [],
		currMoveList: [],
		playing: false,
		selectedSetIdx: -1,
		trainingSetList: [],
		durations: {},
		voiceOn: true,
		loading: true,
		mobileView: false, 
		horizontalMobileView: false, 
	}

	updateProbs(newProbs) {
		this.setState({
			probs: newProbs
		})
		const csrftoken = getCookie('csrftoken');

		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
		}
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/updateProbabilities/')
		axios.post(apiUrl, {
		  userId: localStorage.getItem("userId"),
          probs: newProbs,
      	})
      	.then(res => {
      	})
      	.catch(error => console.error(error));

	}

	updateDurations(newDurations) {
		this.setState({
			durations: newDurations
		})

		const csrftoken = getCookie('csrftoken');

		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
		}
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/updateDurations/')
		axios.post(apiUrl, {
		  userId: localStorage.getItem("userId"),
          durations: newDurations,
      	})
      	.then(res => {
      	})
      	.catch(error => console.error(error));

	}

	fillBacklog() {
		const maxBacklog = 20
		var fill = maxBacklog - this.state.backlogSetSize
		if (fill <= 0) {
			return
		}
		var totalAdded = 0
		var addedMoves = []
		while(fill > 0) {
			var nextMove = RandomMove.getRandomMove(this.state.backlogSet, this.state.currMoveList, this.state.probs['typeProbs'], this.state.probs['reverseProb'])
			if (nextMove === null) {
				return; 
			}
			var moveDuration = (nextMove.name in this.state.durations.moves) ? 
				this.state.durations.moves[nextMove.name] 
				: 
				this.state.durations.types[nextMove.type]
			fill -= moveDuration
			totalAdded += moveDuration
			nextMove.length = nextMove.originalLength = moveDuration
			addedMoves.push(nextMove)
		}
		this.setState({
			backlogSet: this.state.backlogSet.concat(addedMoves)
		})
		this.setState({
			backlogSetSize: this.state.backlogSetSize + totalAdded
		})
	}

	// similar to fillMoves but we fill currSet drawing from backlogSet instead
	addMovesFromBacklog() {
		const maxCurrSet = 11
		var fill = maxCurrSet - this.state.currSetSize
		if (fill <= 0) {
			return
		}
		var totalAdded = 0
		var addedMoves = []
		var i;
		for (i = 0; i < this.state.backlogSet.length && fill > 0; i++) {
			var currMove = this.state.backlogSet[i]
			fill -= currMove.length
			totalAdded += currMove.length
			addedMoves.push(currMove)
		}
		this.setState({
			backlogSet: this.state.backlogSet.slice(i)
		})
		this.setState({
			backlogSetSize: this.state.backlogSetSize - totalAdded
		})

		this.setState({
			currSet: this.state.currSet.concat(addedMoves)
		})
		this.setState({
			currSetSize: this.state.currSetSize + totalAdded
		})
	}

	startPlaying() {
		var synth = window.speechSynthesis;
		this.setState({
			playing: true
		})
		if (this.state.currMoveList.length === 0) {
			return
		}
		// 40 fps
		this.interval = setInterval(() => {
			// if no moves yet, fill backlog, then fill backlogSet with backlog, then refill backlog
			if (this.state.backlogSet.length == 0) {
				this.fillBacklog()
				// this.addMovesFromBacklog()
				// this.fillBacklog()
				if(this.state.voiceOn) {
					var textToSay = new SpeechSynthesisUtterance(this.state.backlogSet[0].name);
					textToSay.rate = 1
					synth.speak(textToSay)
				}
			}
			// if first move is out of length, remove first and fill with more
			else if (this.state.backlogSet[0].length <= 0) {
				this.setState({
					backlogSetSize: this.state.backlogSetSize - this.state.backlogSet[0].originalLength,
					backlogSet: this.state.backlogSet.slice(1),
				})
				// this.addMovesFromBacklog()
				this.fillBacklog()
				if(this.state.voiceOn) {
					// if moves are going too fast, then cut off previous speech midway
					speechSynthesis.cancel()
					var textToSay = new SpeechSynthesisUtterance(this.state.backlogSet[0].name);
					textToSay.rate = 1
					synth.speak(textToSay)
				}
			// otherwise, keep decreasing first move's length
			} else {
				var newList = this.state.backlogSet.slice()
				newList[0].length -= 0.025
				this.setState({
					backlogSet: newList
				})
			}
		}, 25)
	}

	stopPlaying() {
		this.setState({
			playing: false
		})
		if(this.state.currMoveList.length === 0) {
			return
		}
		clearInterval(this.interval)
	}

	updateSelectedSetIdx(newIdx) {
		this.setState({
			selectedSetIdx: newIdx
		})
		// use all moves if no set selected
		if (newIdx === -1) {
			this.setState({
				currMoveList: this.state.allMoves
			})
		} else {
			this.setState({
				currMoveList: this.state.trainingSetList[newIdx].moves
			})
		}
		// clear current playing and pause
		if (this.state.playing) {
			this.stopPlaying()
		}
		this.setState({
			currSet: [],
			backlogSet: [],
			currSetSize: 0,
			backlogSetSize: 0
		})

		// slide to set move list when selecting a set
		// if unselect current card, should not slide to move list 
		if (this.state.mobileView && newIdx !== -1){
			this.slider.slickGoTo(2)
		}


	}

	updateWindowWidth() {
		if (window.innerWidth < 576){
			this.setState({
				mobileView: true
			})
		} 
		else {
			this.setState({
				mobileView: false
			})
		}
		if (window.innerHeight < 576) {
			this.setState({
				horizontalMobileView: true
			})
		}
		else {
			this.setState({
				horizontalMobileView: false
			})
		}
		
	}

	constructor(props) {
		super(props)
		this.updateWindowWidth = this.updateWindowWidth.bind(this)
	}

	// set height of columns equal to view height, must do this here since Slider overrides columns inline styles
	// this function runs after render so we write in the height after Slider writes its inline styles in
	componentDidUpdate(){
		const mainViewHeight = $("#mainViewContainer").height()
		// stack cols for desktop view (2 rows, half height each)
		if (this.state.mobileView || this.state.horizontalMobileView) {
			// make space for slider dots if on mobile view
			const slickDotsHeight = 25
			$(".Column").height(mainViewHeight - slickDotsHeight)
		} else {
			$(".Column").height(mainViewHeight / 2)
		}
	}

	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				probs: res.data.probs,
				allMoves: res.data.moveList,
				currMoveList: res.data.moveList,
				trainingSetList: res.data.setList.filter(item => item.type === setTabNames[1]),
				durations: res.data.durations,
				loading: false
			});
			// if empty, initialize probabilities to uniform
	        if (Object.keys(res.data.probs).length === 0) {
	        	var testProbs = {}
	        	var uni = 1 / (tabNames.length - 1)
		        testProbs[tabNames[1]] = [uni, uni, uni, uni]
		        testProbs[tabNames[2]] = [uni, uni, uni, uni]
		        testProbs[tabNames[3]] = [uni, uni, uni, uni]
		        testProbs[tabNames[4]] = [uni, uni, uni, uni]
		        var newProbs = {"typeProbs": testProbs, "reverseProb": 0.5}
		    	this.updateProbs(testProbs)
	        }
	        /* if (res.data.probs['reverseProb'] == null) {
	        	 var newProbs = {"typeProbs": res.data.probs['typeProbs'], "reverseProb": 0.5}
	        	 this.updateProbs(newProbs)
	        } */ 
	        // if empty, initialize durations to uniform
	        if (Object.keys(res.data.durations).length === 0) {
	        	var initDurations = {}
	        	initDurations.types = {
	        		[tabNames[1]]: 2,
	        		[tabNames[2]]: 2,
	        		[tabNames[3]]: 2,
	        		[tabNames[4]]: 2
	        	}
	        	initDurations.moves = {}
		    	this.updateDurations(initDurations)
	        }
		})
        .catch(error => console.error(error));
        localStorage.setItem('menuKey', menuKeys.TRAINING)

        // keep track of window width
        this.updateWindowWidth();
  		window.addEventListener('resize', this.updateWindowWidth);
	}

	componentWillUnmount() {
		if (this.state.playing) {
			this.stopPlaying()
		}
		window.removeEventListener('resize', this.updateWindowWidth)
	}

	render() {
		const panes = [
					<div class="col-sm-12 Column">
						<h4>Training</h4>
						<div class="SlidingMovesContainer">
							<CardList
								cardType={cardTypes.TRAINING_MOVE}
								cardList={this.state.backlogSet}
								enableDrag={false}
								currentTab={tabNames[0]}
								divClass={"SlidingContainer"}
								horizontalMobileView={this.state.horizontalMobileView}
							/>
							{/*//dont show backlog on horizontal mobile view
								this.state.horizontalMobileView ?
								null
								:
								<CardList
									cardType={cardTypes.TRAINING_MOVE}
									cardList={this.state.backlogSet}
									enableDrag={false}
									currentTab={tabNames[0]}
									divClass={"SlidingContainerBacklog"}
								/>
							*/}
						</div>
						<div class="ButtonsDiv">
							<div className="ButtonContainer-Train">
							{ this.state.playing ? 
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.stopPlaying()}>
								<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pause" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								  <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
								</svg>
								</Button>
								:
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.startPlaying()}>
								<svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								 	<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
								</svg>
								</Button>
							}
							</div>
							<div className="ButtonContainer-Train">
							{ this.state.voiceOn ? 
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.setState({voiceOn: false})}>
									<svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-volume-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
									  <path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04L4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04z"/>
									  <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
									  <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
									  <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"/>
									</svg>
								</Button>
								:
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.setState({voiceOn: true})}>
								<svg width="1.4em" height="1.4em" viewBox="0 0 16 16" class="bi bi-volume-mute" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
								  <path fill-rule="evenodd" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04L4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04zm7.854.606a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708l4-4a.5.5 0 0 1 .708 0z"/>
								  <path fill-rule="evenodd" d="M9.146 5.646a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0z"/>
								</svg>
								</Button>
							}
							</div>
							{Object.keys(this.state.probs).length !== 0 ? 
								<EditValues
									values={this.state.probs['typeProbs']}
									reverseProb={this.state.probs['reverseProb']}
									updateValues={this.updateProbs.bind(this)}
									valueType={editValueTypes.PROBS}
									buttonClass={"EditValuesContainer-Train"}
									mobileView={this.state.mobileView}
								/>
								:
								null
							}
							{Object.keys(this.state.durations).length !== 0 ? 
								<EditValues
									values={this.state.durations}
									updateValues={this.updateDurations.bind(this)}
									valueType={editValueTypes.DURATIONS}
									allMoves={this.state.allMoves}
									buttonClass={"EditValuesContainer-Train"}
									mobileView={this.state.mobileView}
								/>
								:
								null
							}
						</div>
					</div>,

					<div className="col-xs-12 col-sm-6 Column">
						<h5>Training Sets</h5>
						<div class="Pane">
							<CardList
								cardType={cardTypes.SET}
								cardList={this.state.trainingSetList}
								enableDrag={false}
								selectedIdx={this.state.selectedSetIdx}
								currentTab={setTabNames[1]}
								updateSelectedIdx={this.updateSelectedSetIdx.bind(this)}
								loading={this.state.loading}
								showCardButtons={false}
							/>
						</div>
					</div>,

					<div className="col-xs-12 col-sm-6 Column">
						<h5>{this.state.selectedSetIdx !== -1 ? "Moves in Set" : "All Moves"}</h5>
							<div class="Pane">
							<CardList
								cardType={cardTypes.SET_MOVE}
								cardList={this.state.currMoveList}
								enableDrag={false}
								currentTab={tabNames[0]}
								showCardButtons={false}
							/>
							</div>
					</div>
		]

	    var settings = {
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      infinite: false,
	      dots: true
	    };
		// add slider for panes if window width is small (mobile) vertical 
		if (this.state.mobileView) {
			return (
				<Slider ref={slider => (this.slider = slider)} {...settings}>
					{panes}
				</Slider>
			)
		} 
		// detect for horizontal mobile view 
		else if (this.state.horizontalMobileView) {
			const horizontalPanes = 
			[
				panes[0], 
				<div class="row HorizontalTrainSets">{panes[1]}{panes[2]}</div>
			]
			return (
				<Slider {...settings}>
					{horizontalPanes}
				</Slider>
			)
		}
		else {
			return(
				<div class="TrainingViewContainer">
					<div class="row TrainingViewRow">
						{panes[0]}
					</div>
					<div className="row TrainingViewRow">
						{panes[1]}
						{panes[2]}
					</div>
				</div>
			)
		}
	}
}



export default withAuth0(TrainingView);
