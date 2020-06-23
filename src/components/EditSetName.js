import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { Input, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import "../css/components/EditSetName.css"

const { TextArea } = Input;

// for all moves, there exists one moveDetail div that gets updated 
class EditSetName extends React.Component {

	state = {
		editingName: false,
		currentName: "",
	}

	saveNewName() {
		var newName = this.state.currentName;
		var newSetList = this.props.setList;
		newSetList[this.props.selectedSetIdx].name = newName;
		this.setState({
			editingName: false,
		})
		this.props.updateSetList(newSetList);
	}

	componentDidMount() {
		if (this.props.selectedSetIdx != -1) {
			this.setState({
				currentName: this.props.setList[this.props.selectedSetIdx].name,
			})
		}
	}

	componentWillReceiveProps(newProps) {
		if (newProps.selectedSetIdx != -1) {
			this.setState({
				currentName: newProps.setList[newProps.selectedSetIdx].name,
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
				<h4>{this.props.setList[this.props.selectedSetIdx].name}
					<EditOutlined onClick={() => this.setState({editingName:true})}/>
				</h4>

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

export default EditSetName;