import React from 'react';
import TodoInput from './input';
import Item from './item';
class Todo extends React.Component {

    constructor() {
        super();
        this.state = { AllValues: [] };
    }

    addValue = (obj) => {
        let newAllValues = this.state.AllValues;
        newAllValues.push(obj);
        this.setState({
            AllValues: newAllValues
        });
    }

    deleteItem = (index) => {
        console.log(index);
        let newAllValues = this.state.AllValues;
        newAllValues.splice(index,1);
        this.setState({
            AllValues: newAllValues
        });
    }

    render() {
        return (
            <div>
                <div style={{marginTop:25}}>
                    <TodoInput onAdd={this.addValue} placeHolderValue="Enter title" allValues={this.state.AllValues}/>
                </div>
                <div className="col-md-12" style={{marginTop: 40, padding:10,textAlign: 'left'}}>
                    {this.state.AllValues.map((val, index) =>
                        <div className="col-md-4" style={{display:'inline-block'}}>
                        <Item key={index} index={index} Item={val} onDelete={this.deleteItem}/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Todo;