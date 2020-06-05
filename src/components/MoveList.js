import React from 'react';
import { connect } from 'react-redux';
import Moves from './Moves';

import $ from 'jquery';

import 'antd/dist/antd.css';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { Alert, Row } from 'antd';


const { Search } = Input;
const { Option } = Select;


// contains List of Moves and Form to add moves 

class MoveList extends React.Component {
	state = {
		type: null,
		inputValue: ''
	}

	onChange = (value) => {
		this.setState({ type: value });
		console.log(`selected ${value}`);
		console.log(this);
		console.log(this.state);
		console.log(this.state.type);
	}

	onBlur = () => {
	  console.log('blur');

	}

	onFocus = () => {
	  console.log('focus');

	}

	onSearch = (val) => {
	  console.log('search:', val);
	 
	}

	updateInput = () => {
		this.setState({
			inputValue: $("#addMoveInput").val()
		})
	}

	addMove = (value) => {
		if (this.state.type == null) {
			console.log('must select a type of move');
			return;
		}
		this.setState({
			inputValue: ''
		})
		this.props.addMove(value, this.state.type);
	}


	render() {
		return (
			<div>
				<Moves 
					data={this.props.movesList} 
					currentTab={this.props.currentTab} 
					handleDelete={this.props.deleteMove} 
					selectMove={this.props.selectMove}
					selectedMoveIdx={this.props.selectedMoveIdx}
				/>
				<Row>
				  <Select
				  	id="selectType"
				    showSearch
				    style={{ width: 180, display:'inline-block', marginRight:10, marginTop: 10 }}
				    placeholder="Select Move Type"
				    optionFilterProp="children"
				    onChange={this.onChange}
				    onFocus={this.onFocus}
				    onBlur={this.onBlur}
				    onSearch={this.onSearch}
				    defaultValue="Toprock"
				    filterOption={(input, option) =>
				      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				    }
				  >
				   
				    <Option value="Toprock">Toprock</Option>
				    <Option value="Footwork">Footwork</Option>
				    <Option value="Freezes">Freezes</Option>
				    <Option value="Power">Power</Option>
				  </Select>

		  		<Search id="addMoveInput" style={{ width: 300, display:'inline-block', marginTop: 10 }} value={this.state.inputValue} onChange={this.updateInput} placeholder="Add Move" onSearch={(value) => this.addMove(value)} refresh={this.state.refresh} enterButton={<PlusOutlined />} />
				</Row>
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