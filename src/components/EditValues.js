import React, { useContext, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table, Input, Form, Button } from 'antd';
import { InputNumber } from 'antd';
import { tabNames, editValueTypes } from "../constants";
import Modal from 'react-bootstrap/Modal'
import { Tabs } from 'antd';

import $ from 'jquery';
import "../css/components/EditValues.css"

const { TabPane } = Tabs;

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
			show: true,
			reverseProb: this.props.reverseProb == null ? 0.5 : this.props.reverseProb
		})
	}
	closeModal() {
		this.setState({
			show: false,
			showMoveDurations: false
		})
	}

	saveNewProbs() {
		var newProbs = {}
        newProbs[tabNames[1]] = [parseFloat(this.state.probs[0][tabNames[1]]), 
						        parseFloat(this.state.probs[0][tabNames[2]]), 
						        parseFloat(this.state.probs[0][tabNames[3]]), 
						        parseFloat(this.state.probs[0][tabNames[4]])]
        newProbs[tabNames[2]] = [parseFloat(this.state.probs[1][tabNames[1]]), 
						        parseFloat(this.state.probs[1][tabNames[2]]), 
						        parseFloat(this.state.probs[1][tabNames[3]]), 
						        parseFloat(this.state.probs[1][tabNames[4]])]
		newProbs[tabNames[3]] = [parseFloat(this.state.probs[2][tabNames[1]]), 
						        parseFloat(this.state.probs[2][tabNames[2]]), 
						        parseFloat(this.state.probs[2][tabNames[3]]), 
						        parseFloat(this.state.probs[2][tabNames[4]])]
		newProbs[tabNames[4]] = [parseFloat(this.state.probs[3][tabNames[1]]), 
						        parseFloat(this.state.probs[3][tabNames[2]]), 
						        parseFloat(this.state.probs[3][tabNames[3]]), 
						        parseFloat(this.state.probs[3][tabNames[4]])]
		var reverse = parseFloat(this.state.reverseProb)
		var newProbDict = {'typeProbs': newProbs, 'reverseProb': reverse}
		this.props.updateValues(newProbDict)
	}

	saveNewDurations() {
		var newDurations = {
			"types": {},
			"moves": {}
		}
		// save type durations
		newDurations.types[tabNames[1]] = parseFloat(this.state.typeDurations[0]['Duration (s)'])
		newDurations.types[tabNames[2]] = parseFloat(this.state.typeDurations[1]['Duration (s)'])
		newDurations.types[tabNames[3]] = parseFloat(this.state.typeDurations[2]['Duration (s)'])
		newDurations.types[tabNames[4]] = parseFloat(this.state.typeDurations[3]['Duration (s)'])

		// save move durations, if value is not -1 we save it
		this.state.moveDurations.forEach(moveData => {
			if(moveData['Duration (s)'] > -1) {
				newDurations.moves[moveData['Move']] = parseFloat(moveData['Duration (s)'])
			}
		})
		this.props.updateValues(newDurations)
	}

	saveNewValues() {
		if(this.props.valueType === editValueTypes.PROBS) {
			this.saveNewProbs()
		} else if (this.props.valueType == editValueTypes.DURATIONS) {
			this.saveNewDurations()
		}
	}

	setProbCells() {
		// change these to edit columns of the table
		this.columns = [
	      {
	        title: 'Transition From',
	        dataIndex: 'Transition From',
	        width: '15%',
	      },
	      {
	        title: tabNames[1],
	        dataIndex: tabNames[1],
	        width: '15%',
	        editable: true,
	      },
	      {
	        title: tabNames[2],
	        dataIndex: tabNames[2],
	        width: '15%',
	        editable: true,
	      },
	      {
	        title: tabNames[3],
	        dataIndex: tabNames[3],
	        width: '15%',
	        editable: true,
	      },
	      {
	        title: tabNames[4],
	        dataIndex: tabNames[4],
	        width: '15%',
	        editable: true,
	      },
	    ];
	    // show state for showing/hiding modal
	    // probs is the datasource for probs modal
		this.state = {
	    	show: false,
			probs: [
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
	    };
	}

	setDurationCells() {
		// change these to edit columns of the table
		this.columns = [
	      {
	        title: 'Move',
	        dataIndex: 'Move',
	        width: '30%',
	      },
	      {
	        title: 'Duration (s)',
	        dataIndex: 'Duration (s)',
	        width: '30%',
	        editable: true,
	      }
	    ];

	    // We must provide values for each column (Move and Duration (s))
	    // we can add additional values that arent used by the table, like type
	    // key can be anything, but must be unique
    	var moveMap = (move, idx) => {
    		return({
	    		'key': idx.toString(),
	    		'Move': move.name,
	    		'Duration (s)': move.name in this.props.values.moves ? this.props.values.moves[move.name] : -1,
	    		'type': move.type
	    	})
    	}

    	// showMoveDurations shows advanced view of move durations (durations for individual moves)
		this.state = {
	    	show: false,
	    	showMoveDurations: false,
	    	currentTab: tabNames[0],
	    	moveDurations: this.props.allMoves.map(moveMap),
			typeDurations: [
				{
				  'key': '0',
				  'Move': tabNames[1],
				  'Duration (s)': this.props.values.types[tabNames[1]]
				},
				{
				  'key': '1',
				  'Move': tabNames[2],
				  'Duration (s)': this.props.values.types[tabNames[2]]
				},
				{
				  'key': '2',
				  'Move': tabNames[3],
				  'Duration (s)': this.props.values.types[tabNames[3]]
				},
				{
				  'key': '3',
				  'Move': tabNames[4],
				  'Duration (s)': this.props.values.types[tabNames[4]]
				},
			],
	    };
	}

  	constructor(props) {
	    super(props);
	    if(this.props.valueType === editValueTypes.PROBS) {
	    	this.setProbCells()
		} else if (this.props.valueType === editValueTypes.DURATIONS) {
			this.setDurationCells()
		}
  	}

  	toggleMoveDurations() {
  		this.setState({
  			showMoveDurations: !this.state.showMoveDurations
  		})
  	}

  	// we need a different save function for each view (probs, move durations, move durations advanced)
  	handleSave = row => {
	    if(this.props.valueType === editValueTypes.PROBS) {
	    	const newData = [...this.state.probs]
	    	const index = newData.findIndex(item => row.key === item.key);
		    const item = newData[index];
		    newData.splice(index, 1, { ...item, ...row });
	    	this.setState({
		      probs: newData
		    });
	    } else if(this.props.valueType === editValueTypes.DURATIONS && this.state.showMoveDurations) {
	    	const newData = [...this.state.moveDurations]
	    	// we used the index as a key so we can get the index quickly like this
	    	const index = parseInt(row.key, 10)
		    const item = newData[index];
		    newData.splice(index, 1, { ...item, ...row });
	    	this.setState({
		      moveDurations: newData
		    });
	    } else if(this.props.valueType === editValueTypes.DURATIONS) {
	    	const newData = [...this.state.typeDurations]
	    	const index = newData.findIndex(item => row.key === item.key);
		    const item = newData[index];
		    newData.splice(index, 1, { ...item, ...row });
	    	this.setState({
		      typeDurations: newData
		    });
	    }
  	};
  	getIcon() {
  		if(this.props.valueType === editValueTypes.PROBS) {
  			return (
  				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-dice-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M13 1H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"/>
					<circle cx="4" cy="4" r="1.5"/>
					<circle cx="12" cy="12" r="1.5"/>
					<circle cx="8" cy="8" r="1.5"/>
				</svg>
			)

  		} else if(this.props.valueType === editValueTypes.DURATIONS) {
  			return(
  				<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-stopwatch" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" d="M8 15A6 6 0 1 0 8 3a6 6 0 0 0 0 12zm0 1A7 7 0 1 0 8 2a7 7 0 0 0 0 14z"/>
					<path fill-rule="evenodd" d="M8 4.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1 0-1h3V5a.5.5 0 0 1 .5-.5zM5.5.5A.5.5 0 0 1 6 0h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
					<path d="M7 1h2v2H7V1z"/>
				</svg>
			)

  		}

  	}
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
  		} else if(this.props.valueType === editValueTypes.DURATIONS && this.state.showMoveDurations) {
  			return("Edit the duration of each move. -1 sets to default type value")
  		} else if(this.props.valueType === editValueTypes.DURATIONS) {
  			return("Edit the duration of each move type.")	
  		}
  	}

  	tabsChange = (key) => {
		this.setState({
			currentTab: key
		})
	}

	// this.state.moveDurations is the list of all moves regardless of type
	// we use this filter to display moves flitered by type for the tabs
	// this way, when we edit a move in a type tab, the all tab will be modified as well
	filterMoves(moves, moveType) {
		return moves.filter(move => move.type === moveType || moveType === tabNames[0])
	}

  	displayTable(components, columns) {
  		if(this.props.valueType === editValueTypes.DURATIONS && this.state.showMoveDurations) {
  			return(
	  			<Tabs defaultActiveKey={tabNames[0]} onChange={(key) => this.tabsChange(key)}>
					<TabPane className="MoveTable" tab={tabNames[0]} key={tabNames[0]}>
						<Table
				          components={components}
				          rowClassName={() => 'editable-row'}
				          bordered
				          dataSource={this.filterMoves(this.state.moveDurations, tabNames[0])}
				          columns={columns}
				          pagination={false} 
				        />
					</TabPane>
					<TabPane className="MoveTable" tab={tabNames[1]} key={tabNames[1]}>
						<Table
				          components={components}
				          rowClassName={() => 'editable-row'}
				          bordered
				          dataSource={this.filterMoves(this.state.moveDurations, tabNames[1])}
				          columns={columns}
				          pagination={false} 
				        />
					</TabPane>
					<TabPane className="MoveTable" tab={tabNames[2]} key={tabNames[2]}>
						<Table
				          components={components}
				          rowClassName={() => 'editable-row'}
				          bordered
				          dataSource={this.filterMoves(this.state.moveDurations, tabNames[2])}
				          columns={columns}
				          pagination={false} 
				        />
					</TabPane>
					<TabPane className="MoveTable" tab={tabNames[3]} key={tabNames[3]}>
						<Table
				          components={components}
				          rowClassName={() => 'editable-row'}
				          bordered
				          dataSource={this.filterMoves(this.state.moveDurations, tabNames[3])}
				          columns={columns}
				          pagination={false} 
				        />
					</TabPane>
					<TabPane className="MoveTable" tab={tabNames[4]} key={tabNames[4]}>
						<Table
				          components={components}
				          rowClassName={() => 'editable-row'}
				          bordered
				          dataSource={this.filterMoves(this.state.moveDurations, tabNames[4])}
				          columns={columns}
				          pagination={false} 
				        />
					</TabPane>
				</Tabs>
			)
  		} else if(this.props.valueType === editValueTypes.DURATIONS){
  			return (
	  			<Table
		          components={components}
		          rowClassName={() => 'editable-row'}
		          bordered
		          dataSource={this.state.typeDurations}
		          columns={columns}
		          pagination={false} 
		        />
	        )
  		} else if(this.props.valueType === editValueTypes.PROBS) {
   			return (
   				<div>
		  			<Table
			          components={components}
			          rowClassName={() => 'editable-row'}
			          bordered
			          dataSource={this.state.probs}
			          columns={columns}
			          pagination={false} 
			        />
			       {/* <Form> 
			        	<Form.Item
			        		name="reverse"
			        		rules={[
			        			{ required: true, message: 'Please enter a value between 0 and 1', type: 'number' },
			        			{ pattern: /^(?:0*(?:\.\d+)?|1(\.0*)?)$/, message: 'Please enter a value between 0 and 1' },
			        		]}
			        	> */ }
				        Reverse (probability that a move will be the reverse): 
				        <InputNumber 
				        	id="forReverse"
				        	type="number"
				        	className="ReverseProbs" 
				        	min={0} max={1} 
				        	defaultValue={this.state.reverseProb} 
				        	step={0.1}
				        	onChange={(value)=> this.updateReverseProbs(value)}
				        	value={this.props.reverseProb}
				    		/* onPressEnter={(value)=> this.updateReverseProbs()}*/  />
				    	(non-reverse move will have probability of {(1-this.state.reverseProb).toFixed(2)})
				    	{/* </Form.Item> 
				    </Form> */}
		        </div>
	        )
  		}
  	}


  	updateReverseProbs(value) {
  		if (value > 1 || value < 0) {
  			value = 0.5
  		}
  		console.log('UPDATING REVERSE')
  		this.setState({
  			reverseProb: value,
  		})
  		this.saveNewProbs()

  	}

  	render() {
	    // validate each row, only do this for probs modal
	    var valid = true
	    if(this.props.valueType === editValueTypes.PROBS) {
	    	this.state.probs.forEach(row => {
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
	    	<div className={this.props.buttonClass}>
			  <Button className={"EditValuesButton"} type="primary" onClick={() => this.showModal()}>
			    {this.props.mobileView ? this.getIcon() : this.getTitle()}
			  </Button>

			  <Modal show={this.state.show} onHide={() => this.closeModal()}>
			    <Modal.Header closeButton>
			      <Modal.Title>{this.getTitle()}</Modal.Title>
			    </Modal.Header>
			    <Modal.Body>
			    	<div className="HelpMessage">{this.getDescription()}</div>
			    	{
			    		this.displayTable(components, columns)
			    	}
			        { this.props.valueType === editValueTypes.PROBS && !valid ? 
			        	<div className={"Warning"}>Warning: Each row should add up to 1</div> 
			        	: 
			        	null
			        }
			        { this.props.valueType === editValueTypes.DURATIONS ? 
			        	<Button type="primary" className={"SaveButton"} onClick={() => this.toggleMoveDurations()}>
			        		{this.state.showMoveDurations ? "Back" : "Advanced"}
			        	</Button> 
			        	:
			        	null
			        }
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