import React from 'react'
import axios from 'axios'
import $ from 'jquery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock, faEdit } from '@fortawesome/free-regular-svg-icons'
import { faPlus, faQuestion } from '@fortawesome/free-solid-svg-icons'

import CardList from '../components/CardList';
import MoveList from '../components/MoveList';
import SetList from '../components/SetList';
import HelpMessages from '../components/HelpMessages';
import EditCardName from '../components/EditCardName';
import EditValues from '../components/EditValues';
import RandomMove from '../RandomMove';
import { Tabs, Button } from 'antd';
import { tabNames, cardTypes, menuKeys, setTabNames, editValueTypes } from "../constants";

import Slider from "react-slick";

import "../css/containers/Pane.css"
import "../css/containers/Column.css"
import "../css/containers/GeneratorView.css"
import "../css/components/HelpMessages.css"
import "../css/components/Image.css"
import 'bootstrap/dist/css/bootstrap.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


// CONNECTING AND REQUEST AUTH0, connect for store and react-redux 
import { getCookie } from "../utils/getCookie"
import { withAuth0 } from '@auth0/auth0-react';
import ReactGA from 'react-ga';
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
		if (this.state.mobileView){
			this.slider.slickGoTo(1)
		}
	}

	updateSetList(newList) {
		this.setState({
			setList: newList
		})
		const csrftoken = getCookie('csrftoken')
		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
		}
		
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/updateSets/')
		axios.post(apiUrl, {
				  userId: localStorage.getItem("userId"),
	              setList: newList,
	    })
	    .then(res => {
	    })
	    .catch(error => console.error(error));
	}

	updateProbs(newProbs) {
		this.setState({
			probs: newProbs
		})
		const csrftoken = getCookie('csrftoken')
		// console.log(csrftoken)
		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
		}
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
		apiUrl = apiUrl.concat('/updateProbabilities/')
		axios.post(apiUrl, {
		  userId: localStorage.getItem("userId"),
          probs: newProbs,
      	})
      	.then(res => {
      	})
      	.catch(error => console.error(error));

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

		// slide to set move list when selecting a set
		if (this.state.mobileView){
			this.slider.slickGoTo(0)
		}
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
		ReactGA.pageview(window.location.pathname + window.location.search);
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("userId"))
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
		const csrftoken = getCookie('csrftoken');
		axios.defaults.headers = {
			"Content-Type": "application/json",
			"X-CSRFToken": csrftoken
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

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowWidth)
	}

	render() {
		const messages = [
		    {
		      title: <center>
		      		 	<FontAwesomeIcon
					        icon={faEdit}
					     />
					 </center>,
		      content: <div>
					     Select a set to <span>modify</span> set moves
					   </div>,
		    },
		    {
		      title: <center>
		      			<FontAwesomeIcon
					        icon={faPlus}
					     />
				     </center>,
		      content: <div>
					     Click on a move on the right to <span>add</span> it 
					     to the current set
					   </div>,
		    },
		    {
		      title: <center>
		  				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dice-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" d="M13 1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/>
							<circle cx="4" cy="4" r="1.5"/>
							<circle cx="12" cy="12" r="1.5"/>
							<circle cx="8" cy="8" r="1.5"/>
						</svg>
					 </center>,
		      content: <div>
					     <span>Edit probabilities</span> to customize
					     transitions between move types when adding random moves 
					   </div>,
		    },
		    {
			    title: <center>
			      		 	<FontAwesomeIcon
						        icon={faQuestion}
						     />
						</center>,
		     	content: <div>
						     Adding <span> random move</span> transitions from the 
						     last move based on probabilities
					   	</div>,
		    },
		  ];

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
							mobileView={this.state.mobileView}
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
					<div className="col-xs-12 col-sm-8 Column">
						{this.state.mobileView ? 
							null
							:
							<img src={ require('../img/FreezeImages2.png') } class="Image"/>
						}
						<div className="HelpMsg">
							<HelpMessages 
								data={messages}
								// add 3% bottom margin to col-xs-12 if mobile view
								columnClass={this.state.mobileView ? "col-md-3 col-xs-12" : "col-md-3"}
							/>
						</div>

					</div>
					]
	    var settings = {
	      speed: 500,
	      slidesToShow: 1,
	      slidesToScroll: 1,
	      infinite: false,
	      adaptiveHeight: true,
	      draggable: true,
	      swipe: true,
	      dots: true,
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



export default withAuth0(GeneratorView);