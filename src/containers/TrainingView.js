import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import EditProbs from '../components/EditProbs';
import CardList from '../components/CardList';
import { tabNames, menuKeys, cardTypes } from "../constants";
import { Button } from 'antd';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';
import RandomMove from '../RandomMove';


import "../css/containers/TrainingView.css"
import 'bootstrap/dist/css/bootstrap.css';

class TrainingView extends React.Component {

	state = {
		currSet: [],
		probs: [],
		moveList: [],
		show: false, 
		playing: false,
		moveBacklog: 0
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

	fillMoves() {
		const maxBacklog = 20
		var fill = maxBacklog - this.state.moveBacklog
		if(fill <= 0) {
			return
		}
		var totalAdded = 0
		var addedMoves = []
		while(fill > 0) {
			var nextMove = RandomMove.getRandomMove(this.state.currSet, this.state.moveList, this.state.probs)
			switch(nextMove.type) {
				case tabNames[1]:
					fill -= 1
					totalAdded += 1
					nextMove.length = nextMove.originalLength = 1
					break;
				case tabNames[2]:
					fill -= 2
					totalAdded += 2
					nextMove.length = nextMove.originalLength = 2
					break;
				case tabNames[3]:
					fill -= 3
					totalAdded += 3
					nextMove.length = nextMove.originalLength = 3
					break;
				case tabNames[4]:
					fill -= 4
					totalAdded += 4
					nextMove.length = nextMove.originalLength = 4
					break;
			}
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
		clearInterval(this.interval)
	}

	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				probs: res.data.probs,
				moveList: res.data.moveList,
				show: true,
			});
			// if empty, initialize probabilities to uniform
	        if(Object.keys(this.state.probs).length === 0) {
	        	var testProbs = {}
	        	var uni = 1 / (tabNames.length - 1)
		        testProbs[tabNames[1]] = [uni, uni, uni, uni]
		        testProbs[tabNames[2]] = [uni, uni, uni, uni]
		        testProbs[tabNames[3]] = [uni, uni, uni, uni]
		        testProbs[tabNames[4]] = [uni, uni, uni, uni]
		    	this.updateProbs(testProbs)
	        }
		})
        .catch(error => console.error(error));
        localStorage.setItem('menuKey', menuKeys.TRAINING)
	}

	render() {
		return (
			<div className="col-md-12 h-100">
				Training
					<div>
						<CardList
							cardType={cardTypes.TRAINING_MOVE}
							cardList={this.state.currSet}
							enableDrag={false}
							currentTab={tabNames[0]}
						/>
					</div>
					<div>
						{ this.state.playing ? 
							<Button type="primary" className={"PlayButtons"} onClick={() => this.stopPlaying()}><PauseOutlined /></Button>
							:
							<Button type="primary" className={"PlayButtons"} onClick={() => this.startPlaying()}><CaretRightOutlined /></Button>
						}
					</div>
				{this.state.show ? 
					<div>
						<Button type="primary" className={"TrainingButton"}>Save Set</Button>
						<EditProbs
							probs={this.state.probs}
							updateProbs={this.updateProbs.bind(this)}
						/>
					</div>
				:
				null 
				}
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

