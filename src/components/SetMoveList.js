import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Tabs, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import CardList from '../components/CardList';
import EditSetName from '../components/EditSetName';
import { cardTypes, tabNames } from "../constants"

import "../css/containers/Pane.css"

const { TabPane } = Tabs;

// for all moves, there exists one moveDetail div that gets updated 
class SetMoveList extends React.Component {

	state = {
		setIdx: -1,
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


	render() {
		return (
			// since we need to return one div
			<div>
				<EditSetName
					selectedSetIdx={this.props.selectedSetIdx}
					updateSetList={this.props.updateSetList.bind(this)}
					setList={this.props.setList}
				/>
				<div className="Pane MovesPane">
					<CardList
						cardType={cardTypes.SET_MOVE}
						cardList={this.props.setList[this.props.selectedSetIdx].moves}
						updateCardList={this.updateSetMoveList.bind(this)}
						enableDrag={true}
						currentTab={tabNames[0]}
						toggleReverseIcon={this.toggleReverseIcon.bind(this)}
					/>
				</div>
		
			</div>
		);
	}

}


export default SetMoveList;