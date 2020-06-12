import React from 'react';
import { connect } from 'react-redux';
import Move from '../components/Move';
import MoveAddable from '../components/MoveAddable';
import SetCard from '../components/SetCard';

import $ from 'jquery';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { animateScroll } from "react-scroll";

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
		if(!this.props.updateSelectedIdx) {
			return
		}
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


	componentDidUpdate() {
		console.log('COMPOENNT UPDATED');
    	this.scrollToBottom();
	}


	scrollToBottom() {
	 	console.log('scrollingggg');
	    animateScroll.scrollToBottom({
	      containerId: "MoveList"
	    });
	}


	renderCards = (cardType) => {
		switch(cardType) {
			case cardTypes.MOVE:
				return(
					this.props.cardList.map((move, idx) => 
						<Move
				          // goes to slash that link 
				          move={move}
				          moveIdx={idx}
				          deleteMove={this.deleteCard}
				          selectMove={this.selectCard}
				          shouldRender={this.moveFilter(move)}
				          selectedMoveIdx={this.props.selectedIdx}
				          toggleSetGenReverse={false}
				          //description={item.id}
				        />
					)
				)
			case cardTypes.SET:
				return(
					this.props.cardList.map((moveSet, idx) => 
						<SetCard
				          // goes to slash that link 
				          moveSet={moveSet}
				          setIdx={idx}
				          deleteSet={this.deleteCard}
				          selectSet={this.selectCard}
				 
				          selectedSetIdx={this.props.selectedIdx}
				  
				        />
					)
				)
			case cardTypes.MOVE_ADDABLE:
				return(
					this.props.cardList.map((move, idx) => 
						<MoveAddable
				          // goes to slash that link 
				          move={move}
				          shouldRender={this.moveFilter(move)}
				          addMove={this.props.addToSetMoveList}

				        />
					)
				)
			case cardTypes.SET_MOVE:
				return(
					this.props.cardList.map((move, idx) => {
						// move.reverse = false; 
						return (

								<Move
					          // goes to slash that link 
					          move={move}
					          moveIdx={idx}
					          deleteMove={this.deleteCard}
					          selectMove={this.selectCard}
					          shouldRender={this.moveFilter(move)}
					          selectedMoveIdx={this.props.selectedIdx}
					          toggleReverse={this.props.toggleReverseIcon}
					          toggleSetGenReverse={true}
					        />

						)


					}
					)
				)
		}
	}

	render() {
		if(this.props.enableDrag) {
			return (
				<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId={this.props.currentTab}>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							id="MoveList" 
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
			return(
				<div id="MoveList" class="MoveListDiv">
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