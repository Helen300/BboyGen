import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import $ from 'jquery';

import CardList from '../components/CardList';


// for all moves, there exists one moveDetail div that gets updated 
class SetView extends React.Component {

	state = {
		moveList: [],
		selectedMoveIdx: -1,
		currentTab: 'All',
	}


	updateSelectedMoveIdx(newIdx) {
		this.setState({
			selectedMoveIdx: newIdx
		})
	}


	updateMoveList(newList) {

		console.log('helooooooo');

	}


	render() {
		if (this.props.set == null) {
			return (
				// since we need to return one div
				<div>
				</div>
			);
		} else {
			console.log('~~~returning moves');
			console.log(this.props.set.moves);
			return (
				// since we need to return one div
				<div>
				<CardList
					renderMoves={true}
					cardList={this.props.set.moves}
					currentTab={this.state.currentTab}
					selectedIdx={this.state.selectedMoveIdx}
					updateSelectedIdx={this.updateSelectedMoveIdx.bind(this)}
					updateCardList={this.updateMoveList.bind(this)}
				/>
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

export default SetView;