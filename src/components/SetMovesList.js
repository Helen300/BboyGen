import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';
import { Tabs } from 'antd';
import CardList from '../components/CardList';
import { paneNames, cardTypes } from "../constants"

import "../css/containers/Pane.css"
const { TabPane } = Tabs;


// for all moves, there exists one moveDetail div that gets updated 
class SetMovesList extends React.Component {

	state = {
		moveList: [],
		selectedMoveIdx: -1,
		setIdx: -1,
		currentTab: 'All',
	}


	updateSelectedMoveIdx(newIdx) {
		this.setState({
			selectedMoveIdx: newIdx,
		})
	}


	updateMoveList(newList) {
		this.setState({
			moveList: newList
		})
		var newSetList = this.props.setList;
		newSetList[this.props.selectedSetIdx].moves = newList;
		this.props.updateSetList(newSetList);

	}


	render() {
		if (this.props.set == null) {
			return (
				// since we need to return one div
				<div>
				</div>
			);
		} else {
			return (
				// since we need to return one div
				<div>
				<Tabs defaultActiveKey={paneNames.CURRENT_SET}>
					<TabPane className="Pane" tab={paneNames.CURRENT_SET} key={paneNames.CURRENT_SET}>
						<CardList
							cardType={cardTypes.MOVE}
							cardList={this.props.set.moves}
							selectedIdx={this.state.selectedMoveIdx}
							updateSelectedIdx={this.updateSelectedMoveIdx.bind(this)}
							updateCardList={this.updateMoveList.bind(this)}
							enableDrag={true}
							currentTab={this.state.currentTab}
						/>
					</TabPane>
				</Tabs>
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

export default SetMovesList;