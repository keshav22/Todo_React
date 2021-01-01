import React from 'react';
import { faHome } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodoInput from './input';
class Item extends React.Component {

    constructor() {
        super();
        this.state = { showInput: false, itemValue: '', showAddTodo: false, todos:[] };
        this.textInput = React.createRef();
    }

    componentDidMount() {
        if (this.props.Item.Type == 'TODO') {
            this.setState({
                itemValue: this.props.Item.Value,
                done: this.props.Item.Done
            });
        }
        else {
            this.setState({
                itemValue: this.props.Item.Value,
                done: this.props.Item.Done,
                todos: this.props.Item.Todos
            });
        }


    }

    deleteItem = (index) =>{
        let todos = this.props.Item.Todos;
        todos.splice(index,1);
        this.setState({
            todos: todos
        });
    }

    cancelAddValue = () =>{
        this.setState({
            showAddTodo: false
        });
    }
    addValue = (obj) => {
        this.props.Item.Todos.push(obj);
        this.setState({
            todos: this.props.Item.Todos,
            showAddTodo: false
        });
    }

    switchInput = (val) => {
        this.setState({
            showInput: val
        });
    }

    getCardClass() {
        let Item = this.props.Item;
        
        if (Item.Type == "TODO") {
            if (Item.Done) {
                return 'card text-white bg-success mb-3';
            }
            else {
                if(this.props.fromBucket)
                {
                    return 'card text-white bg-secondary mb-3';
                }
                else
                    return 'card border-dark mb-3';
            }
        }
        else {
            
            return 'card text-white bg-info mb-3';
        }
    }

    render() {
        return (
            <div className={this.getCardClass()} style={{ width: '24.5rem' }}>
                <div className="card-header">
                    {this.props.Item.Type}
                    <span style={{ float: 'right' }}>
                        {this.props.Item.Type == 'TODO' ? 
                            this.props.Item.Done ? <i class="fas fa-times" onClick={() => { this.props.Item.Done = false; this.setState({ done: this.props.Item.Done }); }}></i> : <i class="fas fa-check" onClick={() => { this.props.Item.Done = true; this.setState({ done: this.props.Item.Done }); }}></i> : ''}
                        <i class="fas fa-trash-alt" onClick={() => this.props.onDelete(this.props.index)} style={{ paddingLeft: 10 }}></i>
                    </span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{this.props.Item.Title}</h5>
                    {
                        this.props.Item.Type == 'TODO' ?
                            <div>

                                {
                                    this.state.showInput ?
                                        <input type="text" onMouseOver={() => { this.textInput.current.focus(); }} value={this.state.itemValue} onBlur={() => this.switchInput(false)} onChange={(event) => {
                                            this.setState({
                                                itemValue: event.target.value
                                            }); this.props.Item.Value = event.target.value;
                                        }} ref={this.textInput} placeholder="Enter details" style={{ border: 0, width: '100%' }}></input>
                                        :
                                        <p className="card-text" onMouseEnter={() => { this.switchInput(true); }} >{
                                            this.props.Item.Value ? this.props.Item.Value : "Enter details"
                                        }</p>
                                }
                            </div>
                            :
                            <div>
                                {this.state.todos.map((val, index) =>
                                    <div key={index}>
                                        <Item index={index} Item={val} onDelete={this.deleteItem} fromBucket={true} />
                                    </div>
                                )}
                                {
                                    this.state.showAddTodo ?
                                        <TodoInput onAdd={this.addValue} onCancel={this.cancelAddValue} placeHolderValue="Enter Todo Title" onlyTodo={true} />
                                        :
                                        <div style={{ float: 'right' }} onClick={() => this.setState({ showAddTodo: true })}>
                                            <i class="fas fa-plus"></i><span> Add Todo</span>
                                        </div>
                                }
                            </div>
                    }

                </div>
            </div>
        );
    }
}

export default Item;