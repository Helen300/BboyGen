import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from './CardList';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

import { Tabs } from 'antd';
import "../css/containers/Pane.css"

import { tabNames } from "../constants"



// import { Input } from 'antd';
// contains List of Moves and Form to add moves 

const { TabPane } = Tabs;


class MoveList extends React.Component {

	tabsChange = (key) => {
		if(this.props.updateSelectedMoveIdx) {
			this.props.updateSelectedMoveIdx(-1)
		}
		this.props.updateSelectedTab(key)
	}



	render() {
		return (
			<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
				<TabPane className="Pane" tab={tabNames[0]} key={tabNames[0]}>
		  			<CardList
			  			cardType={this.props.cardType}
				    	cardList={this.props.moveList} 
				    	currentTab={this.props.currentTab}
				    	selectedIdx={this.props.selectedMoveIdx}
				    	updateSelectedIdx={this.props.updateSelectedMoveIdx}
				    	updateCardList={this.props.updateMoveList}
				    	addToSetMoveList={this.props.addToSetMoveList}
				    	enableDrag={this.props.enableDrag}
				  		loading={this.props.loading}
				    	/>
			 	</TabPane>
		  		<TabPane className="Pane" tab={tabNames[1]} key={tabNames[1]}>
		  			<CardList
		  				cardType={this.props.cardType}
				    	cardList={this.props.moveList} 
				    	currentTab={this.props.currentTab}
				    	selectedIdx={this.props.selectedMoveIdx}
				    	updateSelectedIdx={this.props.updateSelectedMoveIdx}
				    	updateCardList={this.props.updateMoveList}
				    	addToSetMoveList={this.props.addToSetMoveList}
				    	enableDrag={this.props.enableDrag}
				    	loading={this.props.loading}

			    	/>
			 	</TabPane>

		  		<TabPane className="Pane" tab={tabNames[2]} key={tabNames[2]}>
		  			<CardList
		  				cardType={this.props.cardType}
				    	cardList={this.props.moveList} 
				    	currentTab={this.props.currentTab}
				    	selectedIdx={this.props.selectedMoveIdx}
				    	updateSelectedIdx={this.props.updateSelectedMoveIdx}
				    	updateCardList={this.props.updateMoveList}
				    	addToSetMoveList={this.props.addToSetMoveList}
				    	enableDrag={this.props.enableDrag}
				    	loading={this.props.loading}
			    	/>
			 	</TabPane>

			 	<TabPane className="Pane" tab={tabNames[3]} key={tabNames[3]}>
		  			<CardList 
		  				cardType={this.props.cardType}
				    	cardList={this.props.moveList} 
				    	currentTab={this.props.currentTab}
				    	selectedIdx={this.props.selectedMoveIdx}
				    	updateSelectedIdx={this.props.updateSelectedMoveIdx}
				    	updateCardList={this.props.updateMoveList}
				    	addToSetMoveList={this.props.addToSetMoveList}
				    	enableDrag={this.props.enableDrag}
				    	loading={this.props.loading}
			    	/>
			 	</TabPane>


		  		<TabPane className="Pane" tab={tabNames[4]} key={tabNames[4]}>
		  			<CardList 
		  				cardType={this.props.cardType}
				    	cardList={this.props.moveList} 
				    	currentTab={this.props.currentTab}
				    	selectedIdx={this.props.selectedMoveIdx}
				    	updateSelectedIdx={this.props.updateSelectedMoveIdx}
				    	updateCardList={this.props.updateMoveList}
				    	addToSetMoveList={this.props.addToSetMoveList}
				    	enableDrag={this.props.enableDrag}
				    	loading={this.props.loading}
			    	/>
			 	</TabPane>
			</Tabs>
		);
	}

}

const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token

	}
}

export default connect(mapStateToProps)(MoveList);