import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import EditProbs from '../components/EditProbs';
import CardList from '../components/CardList';
import { tabNames, menuKeys, cardTypes } from "../constants";
import { Button } from 'antd';
import { PauseOutlined, CaretRightOutlined } from '@ant-design/icons';


import "../css/containers/TrainingView.css"
import 'bootstrap/dist/css/bootstrap.css';


class TrainingView extends React.Component {

	state = {
		currSet: [],
		probs: [],
		show: false, 
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

	componentDidMount() {
		var apiUrl = '/api/userprofiles/'.concat(localStorage.getItem("username"))
		apiUrl = apiUrl.concat('/')
		axios.get(apiUrl)
		.then(res => {
			console.log(res.data.probs);
			this.setState({
				probs: res.data.probs,
				show: true,
			});
			// if empty, initialize probabilities to uniform
	        if(Object.keys(this.state.probs).length === 0) {
	        	var testProbs = {}
	        	var uni = 1 / (tabNames.length - 1)
		        testProbs[tabNames[1]] = [uni, uni, uni, uni]
		        testProbs[tabNames[2]] = [uni, uni, uni, uni]
		        testProbs[tabNames[3]] = [uni, uni, uni, uni]
		        testProbs[tabNames[4]] = [uni, uni, uni, uni]
		    	this.updateProbs(testProbs)
	        }
		})
        .catch(error => console.error(error));
        localStorage.setItem('menuKey', menuKeys.TRAINING)
	}

	render() {
		return (
			<div className="col-md-4 h-100">
				Training
					<div className="Pane MovesPane">
						<CardList
							cardType={cardTypes.SET_MOVE}
							cardList={this.state.currSet}
							enableDrag={false}
						/>
					</div>
					<div>
						<Button type="primary" className={"TrainingButton"}>Start Training</Button>
						<Button type="primary" className={"PlayButtons"}><PauseOutlined /></Button>
						<Button type="primary" className={"PlayButtons"}><CaretRightOutlined /></Button>
					</div>
				{this.state.show ? 
					<div>
						<Button type="primary" className={"TrainingButton"}>Save Set</Button>
						<EditProbs
							probs={this.state.probs}
							updateProbs={this.updateProbs.bind(this)}
						/>
					</div>
				:
				null 
				}
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

export default connect(mapStateToProps)(TrainingView);

