import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import MoveList from '../components/MoveList';
import SetMoveList from '../components/SetMoveList';
import EditProbs from '../components/EditProbs';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { tabNames, paneNames, cardTypes, menuKeys } from "../constants";
import $ from 'jquery';

import "../css/containers/Pane.css"
import "../css/containers/GeneratorView.css"
import 'bootstrap/dist/css/bootstrap.css';

const { TabPane } = Tabs;

class GeneratorView extends React.Component {

	state = {
		setList: [], 
		selectedSetIdx: -1,
		moveList: [],
		currentTab: tabNames[0],
		probs: [],
	}

	updateSelectedSetIdx(selectedSetIdx) {
		this.setState({
			selectedSetIdx: selectedSetIdx,
		})
	}

	updateSetList(newList) {
		this.setState({
			setList: newList
		})
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateSets/')
			axios.post(apiUrl, {
					  username: localStorage.getItem("username"),
		              setList: newList,
		          })
		          .then(res => {
		          })
		          .catch(error => console.error(error));
		}
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

	updateSelectedTab(newTab) {
		this.setState({
			currentTab: newTab
		})
	}

	// adds a new set 
	addSet() {
		var newList = this.state.setList.concat([{
					"name": "Set #".concat(this.state.setList.length),
					"id": "Set".concat(this.state.setList.length),
					"description": "", 
					"moves": [],
				}])
		this.updateSetList(newList)
		this.scrollSetsToBottom()
	}

	// duplicates a set 
	dupSet() {
		var dupSet = this.state.setList[this.state.selectedSetIdx];
		var newList = this.state.setList.concat([{
					"name": "Copy of ".concat(dupSet.name),
					"id": "Set".concat(this.state.setList.length),
					"description": dupSet.description, 
					"moves": JSON.parse(JSON.stringify(dupSet.moves)),
				}])
		this.updateSetList(newList);
		this.scrollSetsToBottom();
	}


	getRandomType(probs) {
		var target = Math.random()
		var runningProb = 0
		var i;
		for (i = 0; i < probs.length; i++) {
			if(target >= runningProb && target <= runningProb + probs[i]) {
			// add 1 to skip the first tab "All"
				return tabNames[i + 1]
			}
			runningProb += probs[i]
		}
		// error, should not reach this line. User probably input invalid probs
		return tabNames[i]
	}

	// adds a new move to a selected set 
	addToSetMoveList(newMove) {
		var newSetList = this.state.setList;
		// make a copy of newMove
		var newList = newSetList[this.state.selectedSetIdx].moves.concat(Object.assign({}, newMove));
		newSetList[this.state.selectedSetIdx].moves = newList;
		this.updateSetList(newSetList);
		this.scrollMovesToBottom()
	}

	scrollMovesToBottom() {
		$(".MovesPane").animate({
			scrollTop: $('.MovesPane')[0].scrollHeight
		})
	}	

	scrollSetsToBottom() {
		$(".SetsPane").animate({
			scrollTop: $('.SetsPane')[0].scrollHeight
		})
	}

	// adds a random move based on probabilities
	addRandom() {
		var currentSetMoveList = this.state.setList[this.state.selectedSetIdx].moves
		var lastAddedType = tabNames[0]
		// select uniform random if no previous added move
		if(currentSetMoveList.length == 0) {
			// subract first type
			var uniformProbs = Array(tabNames.length - 1).fill(1/(tabNames.length - 1))
			lastAddedType = this.getRandomType(uniformProbs)
		} else {
			lastAddedType = currentSetMoveList[currentSetMoveList.length - 1].type
		}
		var filteredList = []
		// if user does not have moves in each category, keep picking random one until we find one with moves
		while(filteredList.length == 0) {
			var newType = this.getRandomType(this.state.probs[lastAddedType])
			filteredList = this.state.moveList.filter(move => move.type == newType);
		}
		
		// get random move of that type and make shallow copy
		var newMove = Object.assign({}, filteredList[Math.floor(Math.random() * filteredList.length)])
		this.addToSetMoveList(newMove)
	}

	// componentDidMount fixes a bug, but we can't check the token like componentWillReceiveProps. Figure this out later.

	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				setList: res.data.setList,
				moveList: res.data.moveList,
				probs: res.data.probs
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
        localStorage.setItem('menuKey', menuKeys.GENERATOR)
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
					setList: res.data.setList,
					moveList: res.data.moveList
				});
			})
	        .catch(error => console.error(error));
		}
	}



	render() {
		return (
			<div className="row h-100">
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={paneNames.ALL_SETS}>
						<TabPane className="Pane SetsPane" tab={paneNames.ALL_SETS} key={paneNames.ALL_SETS}>
							<CardList 
								cardType={cardTypes.SET}
								cardList={this.state.setList} 
								currentTab={paneNames.ALL_SETS}
								selectedIdx={this.state.selectedSetIdx}
								updateSelectedIdx={this.updateSelectedSetIdx.bind(this)}
								updateCardList={this.updateSetList.bind(this)}
								enableDrag={true}
							/>
						</TabPane>
					</Tabs>
					<Button type="primary" className={"AddSetButton"} onClick={()=>this.addSet()}>Add Set</Button>
				</div>	
				<div className="col-md-4 h-100">
					{this.state.selectedSetIdx == -1 ? null :
						<div>
							<SetMoveList
								className={"SetMoveList"}
								setList={this.state.setList}
								selectedSetIdx={this.state.selectedSetIdx}
								updateSetList={this.updateSetList.bind(this)}
							/>
							<Button type="primary" className={"AddSetButton"} onClick={()=>this.dupSet()}>Copy Set</Button>
						</div>
					}
				</div>
				<div className="col-md-4 h-100">
					{this.state.selectedSetIdx == -1 ? null : 
						<div>
							<MoveList
								updateSelectedTab={this.updateSelectedTab.bind(this)}
								moveList={this.state.moveList}
								currentTab={this.state.currentTab}
								enableDrag={false}
								cardType={cardTypes.MOVE_ADDABLE}
								addToSetMoveList={this.addToSetMoveList.bind(this)}
							/>
							<Button type="primary" className={"AddMoveButton"} onClick={()=>this.addRandom()}>Add Random Move</Button>
							<EditProbs
								probs={this.state.probs}
								updateProbs={this.updateProbs.bind(this)}
							/>
						</div>
					}
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