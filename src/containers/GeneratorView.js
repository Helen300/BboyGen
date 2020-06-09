import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import { Tabs } from 'antd';
import { Button } from 'antd';

const { TabPane } = Tabs;
const tabNames = ['All Sets', 'STUFFF', 'Footwork', 'Freezes', 'Power'];

class GeneratorView extends React.Component {

	state = {
		setList: [], 
		selectedSetIdx: -1,
		currentTab:tabNames[0],
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

	addSet() {
			var newList = this.state.setList.concat([{
						"name": "Set #".concat(this.state.setList.length),
						"description": "", 
						"moves": [],
					}])
			this.updateSetList(newList)
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
					setList: res.data.setList
				});
			})
	        .catch(error => console.error(error));
			}
	}



	render() {
		return (

			<div className="row h-100">
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
						<TabPane className="TabPane" tab={tabNames[0]} key={tabNames[0]}>
							<CardList 
								renderMoves={false}
								cardList={this.state.setList} 
								currentTab={this.state.currentTab}
								selectedIdx={this.state.selectedSetIdx}
								updateSelectedIdx={this.updateSelectedSetIdx.bind(this)}
								updateCardList={this.updateSetList.bind(this)}
							/>
						</TabPane>
					</Tabs>
					<Button type="primary" onClick={()=>this.addSet()}>Add Set</Button>
				</div>	
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={tabNames[1]} onChange={(key) => this.tabsChange(key)}>
						<TabPane className="TabPane" tab={tabNames[1]} key={tabNames[1]}>
		
						</TabPane>
					</Tabs>
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