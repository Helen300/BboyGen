import React from 'react';
import { connect } from 'react-redux';
import Move from '../components/Move';
import MoveAddable from '../components/MoveAddable';
import TrainingMove from '../components/TrainingMove';
import SetCard from '../components/SetCard';

import $ from 'jquery';
import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { animateScroll } from "react-scroll";

// import 'antd/dist/antd.css';

import "../css/components/CardList.css"

import { cardTypes } from "../constants"
import PropTypes from 'prop-types';


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

	selectCard = (cardIdx) => {
		// unselect the move if it is selected again
		if(!this.props.updateSelectedIdx) {
			return
		}
		if(cardIdx === this.props.selectedIdx) {
			this.props.updateSelectedIdx(-1)
		} else {
			this.props.updateSelectedIdx(cardIdx)
		}
	}

	cardFilter = (item) => {
	    const key = this.props.currentTab;
	    if (key == 'All') {
	      return true
	    }
	    return item.type === key
  	}

	renderCards = (cardType) => {
		switch(cardType) {
			case cardTypes.MOVE:
				return(
					this.props.cardList.map((move, idx) => 
						<Move
				          move={move}
				          moveIdx={idx}
				          deleteMove={this.deleteCard}
				          selectMove={this.selectCard}
				          shouldRender={this.cardFilter(move)}
				          selectedMoveIdx={this.props.selectedIdx}
				          showReverseIcon={false}
				        />
					)
				)
			case cardTypes.SET:
				return(
					this.props.cardList.map((moveSet, idx) => 
						<SetCard
				          moveSet={moveSet}
				          setIdx={idx}
				          deleteSet={this.deleteCard}
				          selectSet={this.selectCard}
				          selectedSetIdx={this.props.selectedIdx}
				          shouldRender={this.cardFilter(moveSet)}
				        />
					)
				)
			case cardTypes.MOVE_ADDABLE:
				return(
					this.props.cardList.map((move, idx) => 
						<MoveAddable
				          move={move}
				          shouldRender={this.cardFilter(move)}
				          addMove={this.props.addToSetMoveList}

				        />
					)
				)
			case cardTypes.SET_MOVE:
				return(
					this.props.cardList.map((move, idx) => {
						return (
								<Move
						          move={move}
						          moveIdx={idx}
						          deleteMove={this.deleteCard}
						          selectMove={this.selectCard}
						          shouldRender={true}
						          selectedMoveIdx={this.props.selectedIdx}
						          toggleReverse={this.props.toggleReverseIcon}
						          showReverseIcon={move.reversible}
						        />
						)
					})
				)
			case cardTypes.TRAINING_MOVE:
				return(
					this.props.cardList.map((move, idx) => {
						return (
								<TrainingMove
						          move={move}
						        />

						)
					})
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
			var containerClass = this.props.cardType === cardTypes.TRAINING_MOVE ? "SlidingContainer" : "MoveListDiv"
			return(
				<div id="MoveList" class={containerClass}>
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

CardList.propTypes = {
	cardList: PropTypes.array.isRequired,
	cardType: PropTypes.string.isRequired,
	enableDrag: PropTypes.bool.isRequired,
	selectedIdx: PropTypes.number,
	updateSelectedIdx: PropTypes.func,
	updateCardList: PropTypes.func,
	currentTab: PropTypes.string,
	addToSetMoveList: PropTypes.func,
	toggleReverseIcon: PropTypes.func,
}

export default connect(mapStateToProps)(CardList);