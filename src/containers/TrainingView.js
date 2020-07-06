import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import EditValues from '../components/EditValues';
import CardList from '../components/CardList';
import { tabNames, menuKeys, cardTypes, setTabNames, editValueTypes } from "../constants";
import { Button } from 'antd';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import RandomMove from '../RandomMove';


import "../css/containers/TrainingView.css"
import 'bootstrap/dist/css/bootstrap.css';

class TrainingView extends React.Component {

	state = {
		currSet: [],
		probs: [],
		allMoves: [],
		currMoveList: [],
		playing: false,
		moveBacklog: 0,
		selectedSetIdx: -1,
		trainingSetList: [],
		durations: {}
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
			var nextMove = RandomMove.getRandomMove(this.state.currSet, this.state.currMoveList, this.state.probs)
			var moveDuration = this.state.durations.types[nextMove.type]
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
		this.setState({
			playing: true
		})
		if(this.state.currMoveList.length === 0) {
			return
		}
		// 40 fps
		this.interval = setInterval(() => {
			// if no moves yet, fill
			if(this.state.currSet.length == 0) {
				this.fillMoves()
			}
			// if first move is out of length, remove first and fill with more
			else if(this.state.currSet[0].length <= 0) {
				this.setState({
					moveBacklog: this.state.moveBacklog - this.state.currSet[0].originalLength,
					currSet: this.state.currSet.slice(1),
				})
				this.fillMoves()
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
		if(newIdx === -1) {
			this.setState({
				currMoveList: this.state.allMoves
			})
		} else {
			this.setState({
				currMoveList: this.state.trainingSetList[newIdx].moves
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

	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				probs: res.data.probs,
				allMoves: res.data.moveList,
				currMoveList: res.data.moveList,
				trainingSetList: res.data.setList.filter(item => item.type === setTabNames[1]),
				durations: res.data.durations
			});
			// if empty, initialize probabilities to uniform
	        if(Object.keys(res.data.probs).length === 0) {
	        	var testProbs = {}
	        	var uni = 1 / (tabNames.length - 1)
		        testProbs[tabNames[1]] = [uni, uni, uni, uni]
		        testProbs[tabNames[2]] = [uni, uni, uni, uni]
		        testProbs[tabNames[3]] = [uni, uni, uni, uni]
		        testProbs[tabNames[4]] = [uni, uni, uni, uni]
		    	this.updateProbs(testProbs)
	        }
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
	}

	render() {
		return (
			<div className="col-md-12 h-100">
				<h4>Training</h4>
					<div>
						<CardList
							cardType={cardTypes.TRAINING_MOVE}
							cardList={this.state.currSet}
							enableDrag={false}
							currentTab={tabNames[0]}
						/>
					</div>
					<div class="ButtonsDiv">
						{ this.state.playing ? 
							<Button type="primary" className={"PlayButtons"} onClick={() => this.stopPlaying()}><PauseOutlined /></Button>
							:
							<Button type="primary" className={"PlayButtons"} onClick={() => this.startPlaying()}><CaretRightOutlined /></Button>
						}
						{Object.keys(this.state.probs).length !== 0 ? 
							<div>
								<EditValues
									values={this.state.probs}
									updateValues={this.updateProbs.bind(this)}
									valueType={editValueTypes.PROBS}
								/>
							</div>
							:
							null 
						}
						{Object.keys(this.state.durations).length !== 0 ? 
							<div>
								<EditValues
									values={this.state.durations}
									updateValues={this.updateDurations.bind(this)}
									valueType={editValueTypes.DURATIONS}
								/>
							</div>
							:
							null 
						}
					</div>
					<CardList
						cardType={cardTypes.SET}
						cardList={this.state.trainingSetList}
						enableDrag={false}
						selectedIdx={this.state.selectedSetIdx}
						currentTab={setTabNames[1]}
						updateSelectedIdx={this.updateSelectedSetIdx.bind(this)}
					/>
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

export default connect(mapStateToProps)(TrainingView);

