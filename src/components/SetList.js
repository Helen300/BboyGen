import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from './CardList';

import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';

import { Tabs } from 'antd';
import "../css/containers/Pane.css"

import { setTabNames, cardTypes } from "../constants"



// import { Input } from 'antd';
// contains List of Moves and Form to add moves 

const { TabPane } = Tabs;


class SetList extends React.Component {

	tabsChange = (key) => {
		this.props.updateSelectedSetIdx(-1)
		this.props.updateSelectedSetTab(key)
	}



	render() {
		return (
			<Tabs defaultActiveKey={setTabNames[0]} onChange={(key) => this.tabsChange(key)}>
				<TabPane className="Pane SetsPane" tab={setTabNames[0]} key={setTabNames[0]}>
					<CardList 
						cardType={cardTypes.SET}
						cardList={this.props.setList} 
						currentTab={setTabNames[0]}
						selectedIdx={this.props.selectedSetIdx}
						updateSelectedIdx={this.props.updateSelectedSetIdx}
						updateCardList={this.props.updateSetList}
						enableDrag={true}
						loading={this.props.loading}
					/>
				</TabPane>
				<TabPane className="Pane SetsPane" tab={setTabNames[1]} key={setTabNames[1]}>
					<CardList 
						cardType={cardTypes.SET}
						cardList={this.props.setList} 
						currentTab={setTabNames[1]}
						selectedIdx={this.props.selectedSetIdx}
						updateSelectedIdx={this.props.updateSelectedSetIdx}
						updateCardList={this.props.updateSetList}
						enableDrag={true}
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

export default connect(mapStateToProps)(SetList);