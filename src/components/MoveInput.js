import React from 'react';
import $ from 'jquery';

import { Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { tabNames } from "../constants";


import 'antd/dist/antd.css';
import "../css/components/MoveInput.css"

const { Search } = Input;
const { Option } = Select;



class MoveInput extends React.Component {
	state = {
		selectedMoveType: "Toprock",
		inputValue: '',
	}


	onTypeChange = (value) => {
		this.setState({ selectedMoveType: value });
	}

	onTypeBlur = () => {
	  console.log('blur');

	}

	onTypeFocus = () => {
	  console.log('focus');

	}

	onTypeSearch = (val) => {
	  console.log('search:', val);
	 
	}

	updateInput = () => {
		this.setState({
			inputValue: $("#addMoveInput").val()
		})
	}

	addMove = () => {
		var newMove = this.state.inputValue;
		this.setState({
			inputValue: ''
		})
		var newList = this.props.moveList.concat([{
					// "name" : inputMove,
					"name": newMove,
					"description": "", 
					"type": this.state.selectedMoveType,
					"reversible": false,
					"reverseEnabled": false
				}])
		this.props.updateMoveList(newList);
		this.props.scrollToBottom();
	}

	componentWillReceiveProps(newProps) {
		var type = newProps.currentTab;
		if (newProps.currentTab !== 'All') {
			this.onTypeChange(type);
		}
	}

	render() {
		return (
			<div className="MoveInput">
				  <Select
				  	id="selectType"
				    showSearch
				    placeholder="Select Move Type"
				    optionFilterProp="children"
				    onChange={this.onTypeChange}
				    onFocus={this.onTypeFocus}
				    onBlur={this.onTypeBlur}
				    onSearch={this.onTypeSearch}
				    // defaultValue={this.state.selectedMoveType}
				    value={this.state.selectedMoveType}
				    filterOption={(input, option) =>
				      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				    }
				    className="SelectType"
				  >
				    <Option value={tabNames[1]}>{tabNames[1]}</Option>
				    <Option value={tabNames[2]}>{tabNames[2]}</Option>
				    <Option value={tabNames[3]}>{tabNames[3]}</Option>
				    <Option value={tabNames[4]}>{tabNames[4]}</Option>
				  </Select>

					<Search 
						id="addMoveInput" 
						value={this.state.inputValue} 
						onChange={this.updateInput} 
						placeholder="Add Move" 
						onSearch={() => this.addMove()} 
						refresh={this.state.refresh} 
						enterButton={<div style={{ textAlign:"center" }}><PlusOutlined /></div>} 
						className="InputMove"
					/>
			</div>

	)}


}


export default MoveInput;