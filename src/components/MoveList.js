import React from 'react';
import { connect } from 'react-redux';
import Moves from './Moves';

// import 'antd/dist/antd.css';

import "../css/components/MoveList.css"


// contains List of Moves and Form to add moves 

class MoveList extends React.Component {
	render() {
		return (
			<div class="MoveListDiv">
				<Moves 
					data={this.props.movesList} 
					currentTab={this.props.currentTab} 
					deleteMove={this.props.deleteMove} 
					selectMove={this.props.selectMove}
					selectedMoveIdx={this.props.selectedMoveIdx}
				/>
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