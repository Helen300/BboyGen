import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';
import { Tabs, Input } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons'
import CardList from '../components/CardList';
import { paneNames, cardTypes } from "../constants"

import "../css/containers/Pane.css"
const { TabPane } = Tabs;
const { TextArea } = Input;

// for all moves, there exists one moveDetail div that gets updated 
class SetMoveList extends React.Component {

	state = {
		setIdx: -1,
		currentTab: 'All',
		editingName: false,
		currentName: "",
	}

	updateSetMoveList(newList) {
		var newSetList = this.props.setList;
		newSetList[this.props.selectedSetIdx].moves = newList;
		this.props.updateSetList(newSetList);

	}

	toggleReverseIcon(moveIdx) {
		var newSetList = this.props.setList.slice();
		newSetList[this.props.selectedSetIdx].moves[moveIdx].reverseEnabled = !newSetList[this.props.selectedSetIdx].moves[moveIdx].reverseEnabled
		this.props.updateSetList(newSetList);

	}

	changeSetName() {
		var newName = this.state.currentName;
		var newSetList = this.props.setList;
		newSetList[this.props.selectedSetIdx].name = newName;
		this.setState({
			editingName: false,
		})
		this.props.updateSetList(newSetList);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.selectedSetIdx != -1) {
			this.setState({
				currentName: newProps.setList[newProps.selectedSetIdx].name,
			})
		}
	}

	changingName() {
		var newName = $('#SetName').val()
		this.setState({
			currentName: newName,
		})

	}


	render() {
		if (this.props.selectedSetIdx == -1) {
			return (
				// since we need to return one div
				<div>
				</div>
			);
		} else {
			return (
				// since we need to return one div
				<div>
					<div>
						{this.state.editingName ? 
							<div>
							<TextArea 
								id="SetName" 
								rows={1}
								value={this.state.currentName} 
								onChange={() => this.changingName()}/>
							<CheckOutlined onClick={() => this.changeSetName()}/>
							</div>
						:
						<h4>{this.props.setList[this.props.selectedSetIdx].name}
							<EditOutlined onClick={() => this.setState({editingName:true})}/>
						</h4>

						}
					</div>
					<div className="Pane">
						<CardList
							cardType={cardTypes.SET_MOVE}
							cardList={this.props.setList[this.props.selectedSetIdx].moves}
							updateCardList={this.updateSetMoveList.bind(this)}
							enableDrag={true}
							currentTab={this.state.currentTab}
							toggleReverseIcon={this.toggleReverseIcon.bind(this)}
						/>
					</div>
			
				</div>
			);
		}
	}

}

const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token
	}
}

export default SetMoveList;