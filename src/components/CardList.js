import React from 'react';
import { connect } from 'react-redux';
import Move from '../components/Move';
import MoveUndraggable from '../components/MoveUndraggable';
import MoveSet from '../components/MoveSet';

import $ from 'jquery';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

// import 'antd/dist/antd.css';

import "../css/components/CardList.css"

import { cardTypes } from "../constants"


// contains List of Moves and Form to add moves 

class CardList extends React.Component {
	onDragEnd = result => {
		const { destination, source, draggableId } = result;
		// if dropped outside of droppable area, do nothing
		if(!destination) {
			return;
		}
		// if dropped in the same area and index, do nothing
		if(destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}
		// if move a card from behind selected card to in front of it or replacing it, update selectIdx
		if(source.index < this.props.selectedIdx && destination.index >= this.props.selectedIdx) {
			this.props.updateSelectedIdx(this.props.selectedIdx - 1)
		}
		// if move a card from in front selected card to behind it or replacing it, update selectIdx
		if(source.index > this.props.selectedIdx && destination.index <= this.props.selectedIdx) {
			this.props.updateSelectedIdx(this.props.selectedIdx + 1)
		}
		// if we move the selected card
		if(this.props.selectedIdx === source.index) {
			this.props.updateSelectedIdx(destination.index)
		}
		// make a copy of list
		var newList = this.props.cardList.slice()
		// remove item
		var movedItem = newList.splice(source.index, 1)
		// add item
		newList.splice(destination.index, 0, movedItem[0])
		this.props.updateCardList(newList)
	};

	deleteCard = (cardIdx) => {
		// generating a new list and removing item
		var newList = this.props.cardList.slice()
		newList.splice(cardIdx, 1)
		// if less, then selected move should shift down, if greater, selected move doesnt shift anywhere
		if(cardIdx < this.props.selectedIdx) {
			this.props.updateSelectedIdx(this.props.selectedIdx - 1)
		}
		if(cardIdx === this.props.selectedIdx) {
			this.props.updateSelectedIdx(-1)
		}
		console.log('newwwww LIST DEELLELELETE CARD', newList);
		this.props.updateCardList(newList)
	}

	toggleIcon = (cardIdx) => {
		// generating a new list and updating it 
		var newList = this.props.cardList.slice()
		newList[cardIdx].reverse = !newList[cardIdx].reverse
		this.props.updateCardList(newList)
	}

	selectCard = (moveIdx) => {
		// unselect the move if it is selected again
		if(moveIdx === this.props.selectedIdx) {
			this.props.updateSelectedIdx(-1)
		} else {
			this.props.updateSelectedIdx(moveIdx)
		}
	}

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

	renderCards = (cardType) => {
		console.log(cardType)
		console.log('here');
		if(cardType === cardTypes.MOVE) {
			return(
				this.props.cardList.map((move, idx) => 
					<Move
			          // goes to slash that link 
			          move={move}
			          moveIdx={idx}
			          deleteMove={this.deleteCard}
			          selectMove={this.selectCard}
			          shouldRender={this.moveFilter(move)}
			          toggleReverse={this.toggleIcon}
			          //description={item.id}
			        />
				)
			)
		} else if(cardType === cardTypes.SET){
			return(
				this.props.cardList.map((moveSet, idx) => 
					<MoveSet
			          // goes to slash that link 
			          moveSet={moveSet}
			          setIdx={idx}
			          deleteSet={this.deleteCard}
			          selectSet={this.selectCard}
			          // shouldRender={this.moveFilter(move)}
			          selectedSetIdx={this.props.selectedIdx}
			          // toggleReverse={this.props.toggleReverse}
			          //description={item.id}
			        />
				)
			)
		} else if(cardType === cardTypes.MOVEUNDRAGGABLE) {
			return(
				this.props.cardList.map((move, idx) => 
					<MoveUndraggable
			          // goes to slash that link 
			          move={move}
			          moveIdx={idx}
			          shouldRender={this.moveFilter(move)}
			          moveList={this.props.cardList}
			          addMove={this.props.updateMoveToSetList}
			          //description={item.id}
			        />
				)
			)
		}
	}

	render() {
		if(this.props.enableDrag) {
			console.log('drag');
			return (
				<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId={this.props.currentTab}>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							class="MoveListDiv"
						>
						{
							this.renderCards(this.props.cardType)					
						}
						{provided.placeholder}
						</div>
					)}
				</Droppable>
				</DragDropContext>
			);
		} else {
			console.log('no drag');
			return(
				<div class="MoveListDiv">
					{this.renderCards(this.props.cardType)}
				</div>
			)
		}
	}
}

const mapStateToProps = state => {
	return {
		// whether or not token = null (isAuthenticated = False)
		token: state.token

	}
}

export default connect(mapStateToProps)(CardList);