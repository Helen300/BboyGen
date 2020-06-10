import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import MoveList from '../components/MoveList';
import SetView from '../components/SetView';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { tabNames, paneNames } from "../constants"

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
			selectedSetIdx: selectedSetIdx
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

	addSet() {
			var newList = this.state.setList.concat([{
						"name": "Set #".concat(this.state.setList.length),
						"description": "", 
						"moves": [],
					}])
			this.updateSetList(newList)
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
		return (

			<div className="row h-100">
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={paneNames[0]}>
						<TabPane className="Pane" tab={paneNames[0]} key={paneNames[0]}>
							<CardList 
								renderMoves={false}
								cardList={this.state.setList} 
								currentTab={paneNames[0]}
								selectedIdx={this.state.selectedSetIdx}
								updateSelectedIdx={this.updateSelectedSetIdx.bind(this)}
								updateCardList={this.updateSetList.bind(this)}
								enableDrag={true}
							/>
						</TabPane>
					</Tabs>
					<Button type="primary" onClick={()=>this.addSet()}>Add Set</Button>
				</div>	
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={paneNames[1]}>
						<TabPane className="Pane" tab={paneNames[1]} key={paneNames[1]}>
							<SetView 
								set={this.state.setList[this.state.selectedSetIdx]} 
								setList={this.state.setList}
								selectedSetIdx={this.state.selectedSetIdx}
								updateSetList={this.updateSetList.bind(this)}
							/>
						</TabPane>
					</Tabs>
				</div>
				<div className="col-md-4 h-100">
					<MoveList
						updateSelectedTab={this.updateSelectedTab.bind(this)}
						moveList={this.state.moveList}
						currentTab={this.state.currentTab}
						enableDrag={false}
					/>
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