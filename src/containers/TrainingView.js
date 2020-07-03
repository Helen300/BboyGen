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

	startPlaying() {
		const maxBacklog = 20
		this.setState({
			playing: true
		})
		var fill = maxBacklog - this.state.moveBacklog
		var totalAdded = 0
		var addedMoves = []
		while(fill > 0) {
			var nextMove = RandomMove.getRandomMove(this.state.currSet, this.state.moveList, this.state.probs)
			addedMoves.push(nextMove)
			switch(nextMove.type) {
				case tabNames[1]:
					fill -= 1
					totalAdded += 1
					break;
				case tabNames[2]:
					fill -= 2
					totalAdded += 2
					break;
				case tabNames[3]:
					fill -= 3
					totalAdded += 3
					break;
				case tabNames[4]:
					fill -= 4
					totalAdded += 4
					break;
			}
		}
		this.setState({
			currSet: this.state.currSet.concat(addedMoves)
		})
		this.setState({
			moveBacklog: this.state.moveBacklog + totalAdded
		})
	}

	stopPlaying() {
		this.setState({
			playing: false
		})
	}

	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			console.log(res.data.probs);
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
					<div className="SlidingContainer">
						<CardList
							cardType={cardTypes.SET_MOVE}
							cardList={this.state.currSet}
							enableDrag={false}
							currentTab={tabNames[0]}
						/>
					</div>
					<div>
						<Button type="primary" className={"TrainingButton"}>Start Training</Button>
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

