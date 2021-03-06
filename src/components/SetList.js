import React from 'react';
import $ from 'jquery';
import CardList from './CardList';


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
						enableDrag={this.props.enableDrag}
						loading={this.props.loading}
						showCardButtons={true}
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
						enableDrag={this.props.enableDrag}
						loading={this.props.loading}
						showCardButtons={true}
					/>
				</TabPane>
			</Tabs>
		);
	}

}



export default SetList;