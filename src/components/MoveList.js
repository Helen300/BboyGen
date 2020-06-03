import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Moves from './Moves';

import 'antd/dist/antd.css';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

// contains List of Moves and Form to add moves 

class MoveList extends React.Component {

	render() {
		return (
			<div>
				<Moves data={this.props.moves_list} handle_delete={this.props.deleteMove} select_move={this.props.select_move}/>
				<Search placeholder="Add Move" onSearch={value => this.props.addMove(value)} enterButton={<PlusOutlined />} />
			</div>
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