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
					<EditOutlined onClick={() => this.setState({editingName:true})}/>
				</h4>

				}
			</div>
		);
	}

}


export default EditCardName;