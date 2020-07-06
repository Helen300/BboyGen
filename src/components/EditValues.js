import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Input, Form, Button } from 'antd';
import { tabNames, editValueTypes } from "../constants";
import Modal from 'react-bootstrap/Modal'

import "../css/components/EditValues.css"

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
	<Form form={form} component={false}>
	  <EditableContext.Provider value={form}>
	    <tr {...props} />
	  </EditableContext.Provider>
	</Form>
	);
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef();
	const form = useContext(EditableContext);
	useEffect(() => {
	if (editing) {
	  inputRef.current.focus();
	}
	}, [editing]);

	const toggleEdit = () => {
	setEditing(!editing);
	form.setFieldsValue({
	  [dataIndex]: record[dataIndex],
	});
	};

	const save = async e => {
	try {
	  const values = await form.validateFields();
	  toggleEdit();
	  handleSave({ ...record, ...values });
	} catch (errInfo) {
	  console.log('Save failed:', errInfo);
	}
	};

	let childNode = children;

	if (editable) {
	childNode = editing ? (
	  <Form.Item
	    style={{
	      margin: '-10%',
	    }}
	    name={dataIndex}
	    rules={[
	      {
	        required: true,
	        message: `${title} is required.`,
	      },
	    ]}
	  >
	    <Input ref={inputRef} onPressEnter={save} onBlur={save} type='number'/>
	  </Form.Item>
	) : (
	  <div
	    className="editable-cell-value-wrap"
	    style={{
	      paddingRight: 24,
	    }}
	    onClick={toggleEdit}
	  >
	    {children}
	  </div>
	);
	}

	return <td {...restProps}>{childNode}</td>;
};

class EditValues extends React.Component {
	showModal() {
		this.setState({
			show: true
		})
	}
	closeModal() {
		this.setState({
			show: false
		})
	}

	saveNewProbs() {
		var newProbs = {}
        newProbs[tabNames[1]] = [parseFloat(this.state.dataSource[0][tabNames[1]]), 
						        parseFloat(this.state.dataSource[0][tabNames[2]]), 
						        parseFloat(this.state.dataSource[0][tabNames[3]]), 
						        parseFloat(this.state.dataSource[0][tabNames[4]])]
        newProbs[tabNames[2]] = [parseFloat(this.state.dataSource[1][tabNames[1]]), 
						        parseFloat(this.state.dataSource[1][tabNames[2]]), 
						        parseFloat(this.state.dataSource[1][tabNames[3]]), 
						        parseFloat(this.state.dataSource[1][tabNames[4]])]
		newProbs[tabNames[3]] = [parseFloat(this.state.dataSource[2][tabNames[1]]), 
						        parseFloat(this.state.dataSource[2][tabNames[2]]), 
						        parseFloat(this.state.dataSource[2][tabNames[3]]), 
						        parseFloat(this.state.dataSource[2][tabNames[4]])]
		newProbs[tabNames[4]] = [parseFloat(this.state.dataSource[3][tabNames[1]]), 
						        parseFloat(this.state.dataSource[3][tabNames[2]]), 
						        parseFloat(this.state.dataSource[3][tabNames[3]]), 
						        parseFloat(this.state.dataSource[3][tabNames[4]])]
		this.props.updateValues(newProbs)
	}

	saveNewDurations() {
		var newDurations = {
			"types": {},
			"moves": {}
		}
		newDurations.types[tabNames[1]] = parseFloat(this.state.dataSource[0]['Duration (s)'])
		newDurations.types[tabNames[2]] = parseFloat(this.state.dataSource[1]['Duration (s)'])
		newDurations.types[tabNames[3]] = parseFloat(this.state.dataSource[2]['Duration (s)'])
		newDurations.types[tabNames[4]] = parseFloat(this.state.dataSource[3]['Duration (s)'])
		newDurations.moves = this.props.values.moves
		this.props.updateValues(newDurations)
	}

	saveNewValues() {
		if(this.props.valueType === editValueTypes.PROBS) {
			this.saveNewProbs()
		} else if (this.props.valueType == editValueTypes.DURATIONS) {
			this.saveNewDurations()
		}
	}

  	constructor(props) {
	    super(props);
	    if(this.props.valueType === editValueTypes.PROBS) {
	    	this.columns = [
		      {
		        title: 'Transition From',
		        dataIndex: 'Transition From',
		        width: '30%',
		      },
		      {
		        title: tabNames[1],
		        dataIndex: tabNames[1],
		        width: '30%',
		        editable: true,
		      },
		      {
		        title: tabNames[2],
		        dataIndex: tabNames[2],
		        width: '30%',
		        editable: true,
		      },
		      {
		        title: tabNames[3],
		        dataIndex: tabNames[3],
		        width: '30%',
		        editable: true,
		      },
		      {
		        title: tabNames[4],
		        dataIndex: tabNames[4],
		        width: '30%',
		        editable: true,
		      },
		    ];
	    } else if(this.props.valueType === editValueTypes.DURATIONS) {
	    	this.columns = [
		      {
		        title: 'Move Type',
		        dataIndex: 'Move Type',
		        width: '30%',
		      },
		      {
		        title: 'Duration (s)',
		        dataIndex: 'Duration (s)',
		        width: '30%',
		        editable: true,
		      }
		    ];
	    }
	    if(this.props.valueType === editValueTypes.PROBS) {
			this.state = {
		    	show: false,
				dataSource: [
					{
					  'key': '0',
					  'Transition From': tabNames[1],
					  [tabNames[1]]: this.props.values[tabNames[1]][0],
					  [tabNames[2]]: this.props.values[tabNames[1]][1],
					  [tabNames[3]]: this.props.values[tabNames[1]][2],
					  [tabNames[4]]: this.props.values[tabNames[1]][3],
					},
					{
					  'key': '1',
					  'Transition From': tabNames[2],
					  [tabNames[1]]: this.props.values[tabNames[2]][0],
					  [tabNames[2]]: this.props.values[tabNames[2]][1],
					  [tabNames[3]]: this.props.values[tabNames[2]][2],
					  [tabNames[4]]: this.props.values[tabNames[2]][3],
					},
					{
					  'key': '2',
					  'Transition From': tabNames[3],
					  [tabNames[1]]: this.props.values[tabNames[3]][0],
					  [tabNames[2]]: this.props.values[tabNames[3]][1],
					  [tabNames[3]]: this.props.values[tabNames[3]][2],
					  [tabNames[4]]: this.props.values[tabNames[3]][3],
					},
					{
					  'key': '3',
					  'Transition From': tabNames[4],
					  [tabNames[1]]: this.props.values[tabNames[4]][0],
					  [tabNames[2]]: this.props.values[tabNames[4]][1],
					  [tabNames[3]]: this.props.values[tabNames[4]][2],
					  [tabNames[4]]: this.props.values[tabNames[4]][3],
					},
				],
				count: 4,
		    };
		} else if (this.props.valueType === editValueTypes.DURATIONS) {
			this.state = {
		    	show: false,
				dataSource: [
					{
					  'key': '0',
					  'Move Type': tabNames[1],
					  'Duration (s)': this.props.values.types[tabNames[1]]
					},
					{
					  'key': '1',
					  'Move Type': tabNames[2],
					  'Duration (s)': this.props.values.types[tabNames[2]]
					},
					{
					  'key': '2',
					  'Move Type': tabNames[3],
					  'Duration (s)': this.props.values.types[tabNames[3]]
					},
					{
					  'key': '3',
					  'Move Type': tabNames[4],
					  'Duration (s)': this.props.values.types[tabNames[4]]
					},
				],
				count: 4,
		    };
		}
  	}

  	handleSave = row => {
	    const newData = [...this.state.dataSource];
	    const index = newData.findIndex(item => row.key === item.key);
	    const item = newData[index];
	    newData.splice(index, 1, { ...item, ...row });
	    this.setState({
	      dataSource: newData,
	    });
  	};

  	getTitle() {
  		if(this.props.valueType === editValueTypes.PROBS) {
  			return("Edit Probabilities")
  		} else if(this.props.valueType === editValueTypes.DURATIONS) {
  			return("Edit Durations")
  		}
  	}

  	getDescription() {
  		if(this.props.valueType === editValueTypes.PROBS) {
  			return("Click on a cell to edit the transition probability when adding a random move.")
  		} else if(this.props.valueType === editValueTypes.DURATIONS) {
  			return("Edit the duration of each move type.")
  		}
  	}

  	render() {
	    const { dataSource } = this.state;
	    // validate each row, only do this for probs modal
	    var valid = true
	    if(this.props.valueType === editValueTypes.PROBS) {
	    	this.state.dataSource.forEach(row => {
		    	var rowSum = parseFloat(row[tabNames[1]]) + parseFloat(row[tabNames[2]]) + parseFloat(row[tabNames[3]]) + parseFloat(row[tabNames[4]])
		    	if(rowSum < 0.99 || rowSum > 1.01) {
		    		valid = false
		    	}
		    })
	    }
	    const components = {
	      body: {
	        row: EditableRow,
	        cell: EditableCell,
	      },
	    };
	    const columns = this.columns.map(col => {
	      if (!col.editable) {
	        return col;
	      }

	      return {
	        ...col,
	        onCell: record => ({
	          record,
	          editable: col.editable,
	          dataIndex: col.dataIndex,
	          title: col.title,
	          handleSave: this.handleSave,
	        }),
	      };
	    });
	    return (
	    	<div className={"EditValuesContainer"}>
			  <Button className={"EditValuesButton"} type="primary" onClick={() => this.showModal()}>
			    {this.getTitle()}
			  </Button>

			  <Modal show={this.state.show} onHide={() => this.closeModal()}>
			    <Modal.Header closeButton>
			      <Modal.Title>{this.getTitle()}</Modal.Title>
			    </Modal.Header>
			    <Modal.Body>
			    	<div className="HelpMessage">{this.getDescription()}</div>
			    	<Table
			          components={components}
			          rowClassName={() => 'editable-row'}
			          bordered
			          dataSource={dataSource}
			          columns={columns}
			          pagination={false} 
			        />
			        { this.props.valueType === editValueTypes.PROBS && !valid ? <div className={"Warning"}>Warning: Each row should add up to 1</div> : null}
			    </Modal.Body>
			    <Modal.Footer>
			      <Button type="primary" className={"SaveButton"} onClick={() => {this.saveNewValues(); this.closeModal();}}>Save</Button>
			    </Modal.Footer>
			  </Modal>
			</div>
	    );
  	}
}

export default EditValues;