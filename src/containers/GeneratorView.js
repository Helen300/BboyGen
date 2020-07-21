import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import MoveList from '../components/MoveList';
import SetList from '../components/SetList';
import EditCardName from '../components/EditCardName';
import EditValues from '../components/EditValues';
import RandomMove from '../RandomMove';
import { Tabs } from 'antd';
import { Button } from 'antd';
import { tabNames, cardTypes, menuKeys, setTabNames, editValueTypes } from "../constants";
import $ from 'jquery';
import Slider from "react-slick";

import "../css/containers/Pane.css"
import "../css/containers/Column.css"
import "../css/containers/GeneratorView.css"
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const { TabPane } = Tabs;

class GeneratorView extends React.Component {

	state = {
		setList: [], 
		selectedSetIdx: -1,
		moveList: [],
		currentTab: tabNames[0],
		currentSetTab: setTabNames[0],
		probs: {},
		loading: true,
		mobileView: false, 
		horizontalMobileView: false
	}

	updateSelectedSetIdx(selectedSetIdx) {
		this.setState({
			selectedSetIdx: selectedSetIdx,
		})
		// slide to set move list when selecting a set
		if(this.state.mobileView){
			this.slider.slickGoTo(1)
		}
	}

	updateSetList(newList) {
		this.setState({
			setList: newList
		})
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateSets/')
			axios.post(apiUrl, {
					  username: localStorage.getItem("username"),
		              setList: newList,
		          })
		          .then(res => {
		          })
		          .catch(error => console.error(error));
		}
	}

	updateProbs(newProbs) {
		this.setState({
			probs: newProbs
		})
		if (this.props.token !== null) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: this.props.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/updateProbabilities/')
			axios.post(apiUrl, {
					  username: localStorage.getItem("username"),
		              probs: newProbs,
		          })
		          .then(res => {
		          })
		          .catch(error => console.error(error));
		}
	}


	updateSelectedTab(newTab) {
		this.setState({
			currentTab: newTab
		})
	}

	updateSelectedSetTab(newTab) {
		this.setState({
			currentSetTab: newTab
		})
	}

	// adds a new set 
	addSet() {
		var setNum = this.state.setList.filter(moveSet => moveSet.type === this.state.currentSetTab).length
		var newList = this.state.setList.concat([{
					"name": "Set #".concat(setNum),
					"id": this.state.currentTab.concat(" ".concat(setNum)),
					"description": "", 
					"moves": [],
					"type": this.state.currentSetTab
				}])
		this.updateSetList(newList)
		this.scrollSetsToBottom()
	}

	// duplicates a set 
	copySet() {
		var copySet = this.state.setList[this.state.selectedSetIdx];
		var newList = this.state.setList.concat([{
					"name": "Copy of ".concat(copySet.name),
					"id": copySet.id.concat(" Copy"),
					"description": copySet.description, 
					"moves": JSON.parse(JSON.stringify(copySet.moves)),
					"type": copySet.type
				}])
		this.updateSetList(newList);
		this.scrollSetsToBottom();
	}

	// adds a new move to a selected set 
	addToSetMoveList(newMove) {
		var newSetList = this.state.setList;
		// make a copy of newMove
		var newList = newSetList[this.state.selectedSetIdx].moves.concat(Object.assign({}, newMove));
		newSetList[this.state.selectedSetIdx].moves = newList;
		this.updateSetList(newSetList);
		this.scrollMovesToBottom()
	}


	updateSetMoveList(newList) {
		var newSetList = this.state.setList;
		newSetList[this.state.selectedSetIdx].moves = newList;
		this.updateSetList(newSetList);

	}

	toggleReverseIcon(moveIdx) {
		var newSetList = this.state.setList.slice();
		newSetList[this.state.selectedSetIdx].moves[moveIdx].reverseEnabled = !newSetList[this.state.selectedSetIdx].moves[moveIdx].reverseEnabled
		this.updateSetList(newSetList);

	}

	scrollMovesToBottom() {
		$(".MovesPane").animate({
			scrollTop: $('.MovesPane')[0].scrollHeight
		})
	}	

	scrollSetsToBottom() {
		$(".SetsPane").animate({
			scrollTop: $('.SetsPane')[0].scrollHeight
		})
	}

	// adds a random move based on probabilities
	addRandom() {
		var randomMove = RandomMove.getRandomMove(this.state.setList[this.state.selectedSetIdx].moves, this.state.moveList, this.state.probs['typeProbs'], this.state.probs['reverseProb'])
		if (randomMove === null) {
			console.log('no random move')
			return null
		}
		this.addToSetMoveList(randomMove)
	}

	updateWindowWidth() {
		if(window.innerWidth < 576){
			this.setState({
				mobileView: true
			})
		} else {
			this.setState({
				mobileView: false
			})
		}
		if(window.innerHeight < 576) {
			this.setState({
				horizontalMobileView: true
			})
		}
		else {
			this.setState({
				horizontalMobileView: false
			})
		}
	}

	constructor(props) {
		super(props)
		this.updateWindowWidth = this.updateWindowWidth.bind(this)
	}

	// set height of columns equal to view height, must do this here since Slider overrides columns inline styles
	// this function runs after render so we write in the height after Slider writes its inline styles in
	componentDidUpdate(){
		const mainViewHeight = $("#mainViewContainer").height()
		// make space for slider dots if on mobile view
		const slickDotsHeight = this.state.mobileView ? 25 : 0
		$(".Column").height(mainViewHeight - slickDotsHeight)
	}

	// componentDidMount fixes a bug, but we can't check the token like componentWillReceiveProps. Figure this out later.
	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			this.setState({
				setList: res.data.setList,
				moveList: res.data.moveList,
				probs: res.data.probs,
				loading: false,
			});
			// if empty, initialize probabilities to uniform
	        if(Object.keys(res.data.probs).length === 0) {
	        	var testProbs = {}
	        	var uni = 1 / (tabNames.length - 1)
		        testProbs[tabNames[1]] = [uni, uni, uni, uni]
		        testProbs[tabNames[2]] = [uni, uni, uni, uni]
		        testProbs[tabNames[3]] = [uni, uni, uni, uni]
		        testProbs[tabNames[4]] = [uni, uni, uni, uni]
		        var newProbs = {"typeProbs": testProbs, "reverseProb": 0.5}
		    	this.updateProbs(newProbs)
	        }
	      /*  if (res.data.probs['reverseProb'] == null) {
	        	 var newProbs = {"typeProbs": res.data.probs['typeProbs'], "reverseProb": 0.5}
	        	 this.updateProbs(newProbs)
	        } */ 
		})
        .catch(error => console.error(error));
        localStorage.setItem('menuKey', menuKeys.GENERATOR)

        // keep track of window width
        this.updateWindowWidth();
  		window.addEventListener('resize', this.updateWindowWidth);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.token) {
			axios.defaults.headers = {
				"Content-Type": "application/json",
				Authorization: newProps.token
			}
			var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
			apiUrl = apiUrl.concat('/')
			axios.get(apiUrl)
			.then(res => {
				this.setState({
					setList: res.data.setList,
					moveList: res.data.moveList,
					loading: false,
				});
			})
	        .catch(error => console.error(error));
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowWidth)
	}

	render() {
	    const panes = [ 
					<div className="col-xs-12 col-sm-4 Column">
						<SetList
							updateSelectedSetIdx={this.updateSelectedSetIdx.bind(this)}
							updateSelectedSetTab={this.updateSelectedSetTab.bind(this)}
							setList={this.state.setList}
							selectedSetIdx={this.state.selectedSetIdx}
							updateSetList={this.updateSetList.bind(this)}
							loading={this.state.loading}
							enableDrag={!this.state.mobileView}
						/>
						<Button type="primary" className={"AddSetButton"} onClick={()=>this.addSet()}>Add Set</Button>
					</div>,

					this.state.selectedSetIdx !== -1 ?
					<div className="col-xs-12 col-sm-4 Column">
						<EditCardName
							selectedIdx={this.state.selectedSetIdx}
							updateCardList={this.updateSetList.bind(this)}
							cardList={this.state.setList}
						/>
						<div className="Pane MovesPane">
						<CardList
							cardType={cardTypes.SET_MOVE}
							cardList={this.state.setList[this.state.selectedSetIdx].moves}
							updateCardList={this.updateSetMoveList.bind(this)}
							enableDrag={!this.state.mobileView}
							currentTab={tabNames[0]}
							toggleReverseIcon={this.toggleReverseIcon.bind(this)}
							showCardButtons={true}
						/>
						</div>
						<Button type="primary" className={"AddSetButton"} onClick={()=>this.copySet()}>Copy Set</Button>
					</div>
					:
					null,

					this.state.selectedSetIdx !== -1 ?
					<div className="col-xs-12 col-sm-4 Column">
						<MoveList
							updateSelectedTab={this.updateSelectedTab.bind(this)}
							moveList={this.state.moveList}
							currentTab={this.state.currentTab}
							enableDrag={false}
							cardType={cardTypes.MOVE_ADDABLE}
							addToSetMoveList={this.addToSetMoveList.bind(this)}
						/>
						<div class="ButtonsContainer">
							<Button type="primary" className={"AddMoveButton"} onClick={() => this.addRandom()}>Add Random Move</Button>
							<EditValues
								values={this.state.probs['typeProbs']}
								reverseProb={this.state.probs['reverseProb']}
								updateValues={this.updateProbs.bind(this)}
								valueType={editValueTypes.PROBS}
								buttonClass={"EditValuesContainer-Gen"}
								mobileView={this.state.horizontalMobileView}
							/>
						</div>
					</div>
					:
					null
					]
	    var settings = {
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      infinite: false,
	      adaptiveHeight: true,
	      draggable: true,
	      swipe: true,
	      dots: true
	    };
		// add slider for panes if window width is small (mobile)
		if(this.state.mobileView) {
			return (
				<Slider ref={slider => (this.slider = slider)} {...settings}>
					{panes}
				</Slider>
			)
		} else {
			return(
				<div className="row h-100">
					{panes}
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

export default connect(mapStateToProps)(GeneratorView);