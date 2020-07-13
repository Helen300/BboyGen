import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import MoveList from '../components/MoveList';
import SetList from '../components/SetList';
import SetMoveList from '../components/SetMoveList';
import EditValues from '../components/EditValues';
import RandomMove from '../RandomMove';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { tabNames, cardTypes, menuKeys, setTabNames, editValueTypes } from "../constants";
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
		currentSetTab: setTabNames[0],
		probs: {},
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

	updateSelectedSetTab(newTab) {
		this.setState({
			currentSetTab: newTab
		})
	}

	// adds a new set 
	addSet() {
		var setNum = this.state.setList.filter(moveSet => moveSet.type === this.state.currentSetTab).length
		var newList = this.state.setList.concat([{
					"name": "Set #".concat(setNum),
					"id": this.state.currentTab.concat(" ".concat(setNum)),
					"description": "", 
					"moves": [],
					"type": this.state.currentSetTab
				}])
		this.updateSetList(newList)
		this.scrollSetsToBottom()
	}

	// duplicates a set 
	copySet() {
		var copySet = this.state.setList[this.state.selectedSetIdx];
		var newList = this.state.setList.concat([{
					"name": "Copy of ".concat(copySet.name),
					"id": copySet.id.concat(" Copy"),
					"description": copySet.description, 
					"moves": JSON.parse(JSON.stringify(copySet.moves)),
					"type": copySet.type
				}])
		this.updateSetList(newList);
		this.scrollSetsToBottom();
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
		var randomMove = RandomMove.getRandomMove(this.state.setList[this.state.selectedSetIdx].moves, this.state.moveList, this.state.probs['typeProbs'], this.state.probs['reverseProb'])
		this.addToSetMoveList(randomMove)
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
				probs: res.data.probs,
			});
			console.log(res.data.probs)
			// if empty, initialize probabilities to uniform
	        if(Object.keys(res.data.probs).length === 0) {
	        	var testProbs = {}
	        	var uni = 1 / (tabNames.length - 1)
		        testProbs[tabNames[1]] = [uni, uni, uni, uni]
		        testProbs[tabNames[2]] = [uni, uni, uni, uni]
		        testProbs[tabNames[3]] = [uni, uni, uni, uni]
		        testProbs[tabNames[4]] = [uni, uni, uni, uni]
		        var newProbs = {"typeProbs": testProbs, "reverseProb": 0.5}
		    	this.updateProbs(newProbs)
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
					<SetList
						updateSelectedSetIdx={this.updateSelectedSetIdx.bind(this)}
						updateSelectedSetTab={this.updateSelectedSetTab.bind(this)}
						setList={this.state.setList}
						selectedSetIdx={this.state.selectedSetIdx}
						updateSetList={this.updateSetList.bind(this)}
					/>
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
							<Button type="primary" className={"AddSetButton"} onClick={()=>this.copySet()}>Copy Set</Button>
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
							<Button type="primary" className={"AddMoveButton"} onClick={() => this.addRandom()}>Add Random Move</Button>
							<EditValues
								values={this.state.probs['typeProbs']}
								reverseProb={this.state.probs['reverseProb']}
								updateValues={this.updateProbs.bind(this)}
								valueType={editValueTypes.PROBS}
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