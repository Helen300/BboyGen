import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import MoveDetail from '../components/MoveDetail';
import MoveList from '../components/MoveList';

import 'antd/dist/antd.css';
import { Input } from 'antd';
// contains List of Moves and Form to add moves 

class MoveListView extends React.Component {
	state = {
		moves_list: [],
	}

	// when new props arrive, component rerenders
	componentWillReceiveProps(newProps) {
		console.log(newProps);
	}

	render() {
		return (
			<table>
			  <tr>
			    <td>
			    	<MoveList/>
			    </td>
			    <td>
			    	<MoveDetail/>
			    </td>
			  </tr>
			</table>
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