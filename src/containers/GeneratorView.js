import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import MoveList from '../components/MoveList';
import SetMovesList from '../components/SetMovesList';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { tabNames, paneNames, cardTypes } from "../constants"

import "../css/containers/Pane.css"
import "../css/containers/GeneratorView.css"
import 'bootstrap/dist/css/bootstrap.css';

const { TabPane } = Tabs;

class GeneratorView extends React.Component {

	state = {
		setList: [], 
		selectedSetIdx: -1,
		moveList: [],
		currentTab: tabNames[0]
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
	}

	// adds a new move to a selected set 
	addToSetList(newMove) {
		var newSetList = this.state.setList;
		var newList = newSetList[this.state.selectedSetIdx].moves.concat(newMove);
		newSetList[this.state.selectedSetIdx].moves = newList;
		this.updateSetList(newSetList);
	}

	// componentDidMount fixes a bug, but we can't check the token like componentWillReceiveProps. Figure this out later.

	componentDidMount() {
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
		console.log(this.state.setList[this.state.selectedSetIdx]);
		return (

			<div className="row h-100">
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={paneNames.ALL_SETS}>
						<TabPane className="Pane" tab={paneNames.ALL_SETS} key={paneNames.ALL_SETS}>
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
					<SetMovesList
						set={this.state.setList[this.state.selectedSetIdx]} 
						setList={this.state.setList}
						selectedSetIdx={this.state.selectedSetIdx}
						updateSetList={this.updateSetList.bind(this)}
					/>
				</div>
				<div className="col-md-4 h-100">
					{this.state.selectedSetIdx == -1 ? null : 
						<MoveList
							updateSelectedTab={this.updateSelectedTab.bind(this)}
							moveList={this.state.moveList}
							currentTab={this.state.currentTab}
							enableDrag={false}
							cardType={cardTypes.MOVEUNDRAGGABLE}
							updateMoveToSetList={this.addToSetList.bind(this)}
						/>
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