import React from 'react';
import $ from 'jquery';
import { Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import "../css/components/EditSetName.css"

const { TextArea } = Input;

// for all moves, there exists one moveDetail div that gets updated 
class EditCardName extends React.Component {

	state = {
		editingName: false,
		currentName: "",
	}

	saveNewName() {
		var newName = this.state.currentName;
		var newSetList = this.props.cardList;
		newSetList[this.props.selectedIdx].name = newName;
		this.setState({
			editingName: false,
		})
		this.props.updateCardList(newSetList);
	}

	componentDidMount() {
		if (this.props.selectedIdx != -1) {
			this.setState({
				currentName: this.props.cardList[this.props.selectedIdx].name,
			})
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.selectedIdx != -1) {
			this.setState({
				currentName: newProps.cardList[newProps.selectedIdx].name,
			})
		}
	}

	changingName() {
		var newName = $('#SetName').val()
		this.setState({
			currentName: newName,
		})

	}

	handleEnter(e) {
		if (e.key === 'Enter')  {
			this.saveNewName()
		}
	}


	render() {
		return (
			// since we need to return one div
			<div className="Container">
				{this.state.editingName ? 
					<div>
					<TextArea 
						id="SetName" 
						className={"EditName"}
						rows={1}
						value={this.state.currentName} 
						onChange={() => this.changingName()}
						onKeyDown={(e) => this.handleEnter(e)}/>
					<Button type="primary" className={"SaveNameButton"} onClick={() => this.saveNewName()}>
					Save
					</Button>
					</div>
				:
				<h4>{this.props.cardList[this.props.selectedIdx].name}
					<svg onClick={() => this.setState({editingName:true})} width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg" >
					  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
					  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
					</svg>
				</h4>

				}
			</div>
		);
	}

}


export default EditCardName;