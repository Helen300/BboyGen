import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoveDetail from '../components/MoveDetail';
import MoveList from '../components/MoveList';

import $ from 'jquery';

import 'antd/dist/antd.css';
import { Row, Col, Tabs, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


// import { Input } from 'antd';
// contains List of Moves and Form to add moves 

const { TabPane } = Tabs;
const { Search } = Input;
const { Option } = Select;
const tabNames = ['All', 'Toprock', 'Footwork', 'Freezes', 'Power'];


class MoveListView extends React.Component {
	state = {
		movesList: [],
		selectedMove: null,
		selectedMoveIdx: -1,
		currentTab: tabNames[0],
		selectedMoveType: "Toprock",
		inputValue: ''
	}

	addMove() {
		console.log('currentTab ', this.state.currentTab);
		console.log(this.state.selectedMoveType);
		var inputMove = this.state.inputValue;
		var type = this.state.selectedMoveType;
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			var newList = this.state.movesList.concat([{
						"name" : inputMove,
						"description": "", 
						"type": type,
					}])
			this.setState({ 
				movesList: newList,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              movesList: newList,
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	      else {

	      }
	      this.setState({
			inputValue: ''
		  })
	}

	deleteMove = (moveIdx) => {
		console.log('deleting...');
		// simply creating headers 
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')

			// generating a new list and updating it 
			var newList = this.state.movesList.slice(0, moveIdx).concat(this.state.movesList.slice(moveIdx + 1))
			this.setState({ 
				movesList: newList,
				selectedMove: null,
				selectedCard: null,
				selectedMoveIdx: -1,
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              movesList: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
		}
		else {
			// show some message 
		}
	
	// THIS DOESN'T ACTUALLY REFRESH THE PAGE 
	}

	selectMove = (moveIdx) => {
		this.setState({ 
			selectedMove: this.state.movesList[moveIdx],
			selectedMoveIdx: moveIdx
		});
	}

	updateDescription() {
		var newDescription = $("#moveDescription").val()
		console.info("^^^^")
		console.info(newDescription)
		console.info("^^^^")
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateMoves/')
			// make copy of array
			var newList = this.state.movesList.slice()
			newList[this.state.selectedMoveIdx].description = newDescription
			this.setState({
				movesList: newList,
				selectedMove: newList[this.state.selectedMoveIdx]
			})
			axios.post(apiUrl, {
	              username: localStorage.getItem("username"),
	              movesList: newList
	          })
	          .then(res => {
	          })
	          .catch(error => console.error(error));
	      }
	      else {
	      	
	      }
	}

	// when new props arrive, component rerenders
	componentWillReceiveProps(newProps) {
		console.log(newProps);
		console.log('username$$$$', localStorage.getItem('username'));
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
					movesList: res.data.movesList
				});
			})
	        .catch(error => console.error(error));
			}
	}


	tabsChange = (key) => {
		this.setState({ 
			selectedMove: null,
			selectedMoveIdx: -1,
			currentTab: key,
		})
	}


	onTypeChange = (value) => {
		this.setState({ selectedMoveType: value });
	}

	onTypeBlur = () => {
	  console.log('blur');

	}

	onTypeFocus = () => {
	  console.log('focus');

	}

	onTypeSearch = (val) => {
	  console.log('search:', val);
	 
	}

	updateInput = () => {
		this.setState({
			inputValue: $("#addMoveInput").val()
		})
	}



	render() {
		return (
			<Row>
			<Col span={10}>
			<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
				<TabPane tab={tabNames[0]} key={tabNames[0]}>
			  			<MoveList 
					    	addMove={this.addMove.bind(this)} 
					    	deleteMove={this.deleteMove.bind(this)} 
					    	movesList={this.state.movesList} 
					    	selectMove={this.selectMove.bind(this)}
					    	currentTab={this.state.currentTab}
					    	selectedMoveIdx={this.state.selectedMoveIdx}
				    	/>
			 	</TabPane>
		  		<TabPane tab={tabNames[1]} key={tabNames[1]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	movesList={this.state.movesList} 
				    	selectMove={this.selectMove.bind(this)}
				    	currentTab={this.state.currentTab}
				    	selectedMoveIdx={this.state.selectedMoveIdx}
			    	/>
			 	</TabPane>

		  		<TabPane tab={tabNames[2]} key={tabNames[2]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	movesList={this.state.movesList} 
				    	selectMove={this.selectMove.bind(this)}
				    	currentTab={this.state.currentTab}
				    	selectedMoveIdx={this.state.selectedMoveIdx}
			    	/>
			 	</TabPane>

			 	<TabPane tab={tabNames[3]} key={tabNames[3]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	movesList={this.state.movesList} 
				    	selectMove={this.selectMove.bind(this)}
				    	currentTab={this.state.currentTab}
				    	selectedMoveIdx={this.state.selectedMoveIdx}
			    	/>
			 	</TabPane>


		  		<TabPane tab={tabNames[4]} key={tabNames[4]}>
		  			<MoveList 
				    	addMove={this.addMove.bind(this)} 
				    	deleteMove={this.deleteMove.bind(this)} 
				    	movesList={this.state.movesList} 
				    	selectMove={this.selectMove.bind(this)}
				    	currentTab={this.state.currentTab}
				    	selectedMoveIdx={this.state.selectedMoveIdx}
			    	/>
			 	</TabPane>
			</Tabs>
				<Row>
				  <Select
				    showSearch
				    style={{ width: 180, display:'inline-block', marginRight:10, marginTop: 10 }}
				    placeholder="Select Move Type"
				    optionFilterProp="children"
				    onChange={this.onTypeChange}
				    onFocus={this.onTypeFocus}
				    onBlur={this.onTypeBlur}
				    onSearch={this.onTypeSearch}
				    defaultValue="Toprock"
				    filterOption={(input, option) =>
				      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				    }
				  >
				    <Option value="Toprock">Toprock</Option>
				    <Option value="Footwork">Footwork</Option>
				    <Option value="Freezes">Freezes</Option>
				    <Option value="Power">Power</Option>
				  </Select>

		  		<Search 
		  			id="addMoveInput" 
		  			style={{ width: 300, display:'inline-block', marginTop: 10 }} 
		  			value={this.state.inputValue} 
		  			onChange={this.updateInput} 
		  			placeholder="Add Move" 
		  			onSearch={(value) => this.addMove()} 
		  			refresh={this.state.refresh} 
		  			enterButton={<PlusOutlined />} 
		  		/>
				</Row>
			</Col>
			<Col span={14} >
			   	<MoveDetail 
			    	move={this.state.selectedMove} 
			    	updateDescription={this.updateDescription.bind(this)}
		    	/>
			</Col>
			</Row>

		);
	}

}

const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token

	}
}

export default connect(mapStateToProps)(MoveListView);