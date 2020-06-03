import React from 'react';
import { connect } from 'react-redux';
import Moves from './Moves';


import 'antd/dist/antd.css';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';

const { Search } = Input;
const { Option } = Select;


// contains List of Moves and Form to add moves 

class MoveList extends React.Component {
	state = {
		type: null,
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

	addMove = (value) => {
		this.props.addMove(value, this.state.type);
	}


	render() {
		return (
			<div>
				<Moves data={this.props.moves_list} handle_delete={this.props.deleteMove} select_move={this.props.select_move}/>

				  <Select
				    showSearch
				    style={{ width: 180, display:'inline-block' }}
				    placeholder="Select Move Type"
				    optionFilterProp="children"
				    onChange={this.onChange}
				    onFocus={this.onFocus}
				    onBlur={this.onBlur}
				    onSearch={this.onSearch}
				    filterOption={(input, option) =>
				      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				    }
				  >
				   
				    <Option value="toprock">Toprock</Option>
				    <Option value="footwork">Footwork</Option>
				    <Option value="freezes">Freezes</Option>
				    <Option value="power">Power</Option>
				  </Select>

		  		<Search style={{ width: 300, display:'inline-block' }} placeholder="Add Move" onSearch={this.addMove} enterButton={<PlusOutlined />} />
	
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