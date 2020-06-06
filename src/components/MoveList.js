import React from 'react';
import { connect } from 'react-redux';
import Moves from './Moves';
import Move from '../components/Move';

import $ from 'jquery';
import { Droppable } from 'react-beautiful-dnd';

// import 'antd/dist/antd.css';


// contains List of Moves and Form to add moves 

class MoveList extends React.Component {
	moveFilter = (item) => {

	    // console.log(' in move filter item is', item);
	    // RETURNS EITHER ALL, TOPROCK, FOOTWORK, FREEZES, POWER...
	    const key = this.props.currentTab;
	    if (key == 'All') {
	      return true
	    }

	    // console.log('item type', item.type == key);
	    // console.log('=== ', item.type === key);
	    return item.type === key
	  }
	render() {
		return (
			<div>
				{this.props.movesList.map((move, idx) => 
					<Move
			          // goes to slash that link 
			          move={move}
			          moveIdx={idx}
			          deleteMove={this.props.deleteMove}
			          selectMove={this.props.selectMove}
			          shouldRender={this.moveFilter(move)}
			          selectedMoveIdx={this.props.selectedMoveIdx}
			          //description={item.id}
			     
			        />
				)}
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