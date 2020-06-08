import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import MoveList from '../components/MoveList';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const tabNames = ['All', 'Toprock', 'Footwork', 'Freezes', 'Power'];

class GeneratorView extends React.Component {

	state = {

	}


	render() {
		return (

			<div className="row h-100">
				<div className="col-md-4 h-100">
					<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
						<TabPane className="TabPane" tab={tabNames[0]} key={tabNames[0]}>
							<MoveList />
						</TabPane>
					</Tabs>
				</div>

			</div>

	)}

}


const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token

	}
}

export default connect(mapStateToProps)(GeneratorView);