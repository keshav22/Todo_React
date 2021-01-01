import React, { useState } from 'react';
import Combobox from 'react-widgets/lib/Combobox';
const TodoInput = ({ onlyTodo, onAdd, placeHolderValue, onCancel,allValues }) => {
    const [value, setValue] = useState('');
    const [type, setType] = useState('TODO');
    const [bucketList, setBucketList] = useState([]);
    function addValue() {
        if (value) {

            if (type == 'TODO') {
                let todoObj = { Type: type, Value: '', Title: value, Done: false, Todos: [] };
                onAdd(todoObj);
            }
            else {
                let bucketObj = { Type: type, Value: '', Title: value, Todos: [] };
                onAdd(bucketObj);
                let newList = bucketList;
                newList.push(value);
                const unique = [...new Set(newList)];
                setBucketList(unique);
                console.log(bucketList);
            }
            setValue('');
        }
        else {
            alert("Please give some title");
        }
    }

    function changeDropdown(e) {
        setType(e.target.value);
        if(e.target.value=='BUCKET')
        {
            let bucketList = allValues.filter(x=>x.Type=='BUCKET');
            const unique = [...new Set(bucketList.map(x=>x.Title))];
            setBucketList(unique);
        }
    }
    return (
        <div style={{ display: 'inline-flex' }}>
            {
                type == 'TODO' ?
                    <div class="form-outline" style={{ width: 200 }}>
                        <input type="text" id="form1" className="form-control" onChange={(event) => {
                            setValue(event.target.value);
                        }} value={value} placeholder={placeHolderValue} />
                    </div>
                    :
                    <Combobox
                        data={bucketList}
                        onChange={(val) => {
                            setValue(val);
                        }}
                        value={value}
                    />
            }


            {
                onlyTodo ?
                    <button className="btn btn-outline-secondary btn-sm" style={{ marginLeft: 10, marginRight: 10 }} onClick={() => addValue()}>Add Todo</button>

                    :
                    <select onChange={(e) => { changeDropdown(e); }}
                        style={{ width: 100, marginLeft: 10, borderRadius: 4 }}>
                        <option>TODO</option>
                        <option>BUCKET</option>
                    </select>
            }
            {
                onlyTodo ?
                    <button onClick={() => onCancel()} className="btn btn-outline-primary btn-sm">Cancel</button>
                    :
                    <button className="btn btn-outline-secondary btn-sm" style={{ marginLeft: 10, marginRight: 10 }} onClick={() => addValue()}>Add</button>

            }

            {/* <button className="btn btn-outline-secondary btn-sm" style={{ marginLeft: 10, marginRight: 10 }} onClick={() => addValue('TODO')}>Add Todo</button>
            {
                onlyTodo ? <button onClick={() => onCancel()} className="btn btn-outline-primary btn-sm">Cancel</button> : <button onClick={() => addValue('BUCKET')} className="btn btn-outline-primary btn-sm">Add Bucket</button>
            } */}

        </div>
    );
};

export default TodoInput;