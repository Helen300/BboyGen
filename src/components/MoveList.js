import React from 'react';
import { connect } from 'react-redux';
import Move from '../components/Move';
import MoveSet from '../components/MoveSet';

import $ from 'jquery';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

// import 'antd/dist/antd.css';

import "../css/components/MoveList.css"


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

	renderCards = (renderMoves) => {
		if(renderMoves) {
			return(
				this.props.moveList.map((move, idx) => 
					<Move
			          // goes to slash that link 
			          move={move}
			          moveIdx={idx}
			          deleteMove={this.props.deleteMove}
			          selectMove={this.props.selectMove}
			          shouldRender={this.moveFilter(move)}
			          selectedMoveIdx={this.props.selectedMoveIdx}
			          toggleReverse={this.props.toggleReverse}
			          //description={item.id}
			        />
				)
			)
		} else {
			return(
				this.props.setList.map((set, idx) => 
					<MoveSet
			          // goes to slash that link 
			          set={set}
			          setIdx={idx}
			          deleteSet={this.props.deleteSet}
			          selectSet={this.props.selectSet}
			          // shouldRender={this.moveFilter(move)}
			          selectedSetIdx={this.props.selectedSetIdx}
			          // toggleReverse={this.props.toggleReverse}
			          //description={item.id}
			        />
				)
			)
		}
	}

	render() {
		return (
			<DragDropContext onDragEnd={this.props.onDragEnd}>
			<Droppable droppableId={this.props.currentTab}>
				{provided => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						class="MoveListDiv"
					>
					{
						this.renderCards(this.props.renderMoves)						
					}
					{provided.placeholder}
					</div>
				)}
			</Droppable>
			</DragDropContext>
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