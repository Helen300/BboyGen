import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import EditValues from '../components/EditValues';
import CardList from '../components/CardList';
import { tabNames, menuKeys, cardTypes, setTabNames, editValueTypes } from "../constants";
import { Button } from 'antd';
import { PauseOutlined, CaretRightOutlined, AudioOutlined, AudioMutedOutlined } from '@ant-design/icons';
import RandomMove from '../RandomMove';
import Slider from "react-slick";

import "../css/containers/TrainingView.css"
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class TrainingView extends React.Component {

	state = {
		currSet: [],
		probs: {},
		allMoves: [],
		currSetMoveList: [],
		playing: false,
		moveBacklog: 0,
		selectedSetIdx: -1,
		trainingSetList: [],
		durations: {},
		voiceOn: true,
		loading: true,
		windowWidth: 0
	}

	updateProbs(newProbs) {
		this.setState({
			probs: newProbs
		})
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateProbabilities/')
			axios.post(apiUrl, {
					  username: localStorage.getItem("username"),
		              probs: newProbs,
		          })
		          .then(res => {
		          })
		          .catch(error => console.error(error));
		}
	}

	updateDurations(newDurations) {
		this.setState({
			durations: newDurations
		})
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateDurations/')
			axios.post(apiUrl, {
					  username: localStorage.getItem("username"),
		              durations: newDurations,
		          })
		          .then(res => {
		          })
		          .catch(error => console.error(error));
		}
	}

	fillMoves() {
		const maxBacklog = 20
		var fill = maxBacklog - this.state.moveBacklog
		if(fill <= 0) {
			return
		}
		var totalAdded = 0
		var addedMoves = []
		while(fill > 0) {
			var nextMove = RandomMove.getRandomMove(this.state.currSet, this.state.currSetMoveList, this.state.probs['typeProbs'], this.state.probs['reverseProb'])
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
			currSet: this.state.currSet.concat(addedMoves)
		})
		this.setState({
			moveBacklog: this.state.moveBacklog + totalAdded
		})
	}

	startPlaying() {
		var synth = window.speechSynthesis;
		this.setState({
			playing: true
		})
		if(this.state.currSetMoveList.length === 0) {
			return
		}
		// 40 fps
		this.interval = setInterval(() => {
			// if no moves yet, fill
			if(this.state.currSet.length == 0) {
				this.fillMoves()
				if(this.state.voiceOn) {
					var textToSay = new SpeechSynthesisUtterance(this.state.currSet[0].name);
					textToSay.rate = 1.5
					synth.speak(textToSay)
				}
			}
			// if first move is out of length, remove first and fill with more
			else if(this.state.currSet[0].length <= 0) {
				this.setState({
					moveBacklog: this.state.moveBacklog - this.state.currSet[0].originalLength,
					currSet: this.state.currSet.slice(1),
				})
				this.fillMoves()
				if(this.state.voiceOn) {
					// if moves are going too fast, then cut off previous speech midway
					speechSynthesis.cancel()
					var textToSay = new SpeechSynthesisUtterance(this.state.currSet[0].name);
					textToSay.rate = 1.5
					synth.speak(textToSay)
				}
			// otherwise, keep decreasing first move's length
			} else {
				var newList = this.state.currSet.slice()
				newList[0].length -= 0.025
				this.setState({
					currSet: newList
				})
			}
		}, 25)
	}

	stopPlaying() {
		this.setState({
			playing: false
		})
		if(this.state.currSetMoveList.length === 0) {
			return
		}
		clearInterval(this.interval)
	}

	updateSelectedSetIdx(newIdx) {
		this.setState({
			selectedSetIdx: newIdx
		})
		// use all moves if no set selected
		if(newIdx === -1) {
			this.setState({
				currSetMoveList: this.state.allMoves
			})
		} else {
			this.setState({
				currSetMoveList: this.state.trainingSetList[newIdx].moves
			})
		}
		// clear current playing and pause
		if(this.state.playing) {
			this.stopPlaying()
		}
		this.setState({
			currSet: [],
			moveBacklog: 0
		})
	}

	updateWindowWidth() {
	  this.setState({ windowWidth: window.innerWidth });
	}

	constructor(props) {
		super(props)
		this.updateWindowWidth = this.updateWindowWidth.bind(this)
	}

	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				probs: res.data.probs,
				allMoves: res.data.moveList,
				currSetMoveList: res.data.moveList,
				trainingSetList: res.data.setList.filter(item => item.type === setTabNames[1]),
				durations: res.data.durations,
				loading: false
			});
			// if empty, initialize probabilities to uniform
	        if(Object.keys(res.data.probs).length === 0) {
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
	        if(Object.keys(res.data.durations).length === 0) {
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
		if(this.state.playing) {
			this.stopPlaying()
		}
		window.removeEventListener('resize', this.updateWindowWidth)
	}

	render() {
		const panes = [
					<div class="col-md-12">
						<h4>Training</h4>
						<CardList
							cardType={cardTypes.TRAINING_MOVE}
							cardList={this.state.currSet}
							enableDrag={false}
							currentTab={tabNames[0]}
						/>
						<div class="ButtonsDiv">
							{ this.state.playing ? 
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.stopPlaying()}><PauseOutlined /></Button>
								:
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.startPlaying()}><CaretRightOutlined /></Button>
							}
							{ this.state.voiceOn ? 
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.setState({voiceOn: false})}><AudioOutlined/></Button>
								:
								<Button type="primary" className={"TrainingButtons"} onClick={() => this.setState({voiceOn: true})}><AudioMutedOutlined/></Button>
							}
							{Object.keys(this.state.probs).length !== 0 ? 
								<EditValues
									values={this.state.probs['typeProbs']}
									reverseProb={this.state.probs['reverseProb']}
									updateValues={this.updateProbs.bind(this)}
									valueType={editValueTypes.PROBS}
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
								/>
								:
								null
							}
						</div>
					</div>,

					<div className="col-md-6 col-sm-12">
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
							/>
						</div>
					</div>,

					<div className="col-md-6 col-sm-12">
						<h5>Moves in Set</h5>
							<div class="Pane">
							<CardList
								cardType={cardTypes.SET_MOVE}
								cardList={this.state.currSetMoveList}
								enableDrag={false}
								currentTab={tabNames[0]}
							/>
							</div>
					</div>
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
				<div>
					<div class="row h-40">
						{panes[0]}
					</div>
					<div className="row h-60">
						{panes[1]}
						{panes[2]}
					</div>
				</div>
			)
		}
	}

}


const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token

	}
}

export default connect(mapStateToProps)(TrainingView);

