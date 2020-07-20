import React from 'react';
import { connect } from 'react-redux';
import "../css/components/MoveDetail.css"
import { Input, Select, Button } from 'antd';
import axios from 'axios';
import $ from 'jquery';

import "../css/containers/Column.css"

const { TextArea } = Input;
const { Option } = Select;




// for all moves, there exists one moveDetail div that gets updated 
class MoveDetail extends React.Component {

	updateDescription() {
		var newDescription = $("#moveDescription").val()
		// make copy of array
		var newList = this.props.moveList.slice()
		newList[this.props.selectedMoveIdx].description = newDescription
		this.props.updateMoveList(newList);
	}

	updateType = (value) => {
		var newType = value;
		// make copy of array
		var newList = this.props.moveList.slice();
		newList[this.props.selectedMoveIdx].type = value;
		this.props.updateMoveList(newList);
	}

	toggleReverse(e) {
		// e.stopPropagation()
		var newList = this.props.moveList.slice()
		newList[this.props.selectedMoveIdx].reversible = !newList[this.props.selectedMoveIdx].reversible
		this.props.updateMoveList(newList);
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


	render() {
			return (
				// since we need to return one div
				<div class="MoveDetailContainer">
					<div>
						<Select
					  	id="selectType"
					    showSearch
					    optionFilterProp="children"
					    onChange={this.updateType}
					    onFocus={this.onTypeFocus}
					    onBlur={this.onTypeBlur}
					    onSearch={this.onTypeSearch}
					    // defaultValue={this.state.selectedMoveType}
					    value={this.props.move.type}
					    filterOption={(input, option) =>
					      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					    }
					    className="MoveDetailType"
					  >
					    <Option value="Toprock">Toprock</Option>
					    <Option value="Footwork">Footwork</Option>
					    <Option value="Freezes">Freezes</Option>
					    <Option value="Power">Power</Option>
					  </Select>
					 </div>
					 <div>
							<Button
								id="ReversibleButton"
								className={this.props.move.reversible ? "Reversible" : "NotReversible" }
								onClick={(e) => this.toggleReverse(e)}>
								{this.props.move.reversible ? "Reversible" :"Not Reversible"}
							</Button>
					</div>
					<TextArea id="moveDescription"  
							  value={this.props.move.description} 
							  onChange={() => this.updateDescription()}
				    />
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

export default connect(mapStateToProps)(MoveDetail);