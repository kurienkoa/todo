import React, {FC, useState} from "react";
import {ITodoItem} from "../types";
const TodoItem: FC<ITodoItem> = (props) => {
    const {children, handleChecked, handleChange, handleDelete, id} = props;
    const [editTodo, setEditTodo] = useState<boolean>(false);
    const [text, setText] = useState<string>(children.text);

    const handleSave = () => {
        setEditTodo(false)
        handleChange(id, text)
    }

    return (
        <div className='p-2 border flex items-stretch border-gray-600 border-solid'>
            <div className="flex-1">
                <input className='mx-2' type="checkbox" defaultChecked={children.check} onChange={()=>handleChecked(id)}/>
                {
                    editTodo
                        ? <input className='mx-2 border border-solid dark:border-white border-gray-600 dark:bg-slate-800' type="text" defaultValue={children.text} onChange={(e)=>setText(e.target.value)}/>
                        : children.text
                }
            </div>
            <div className='flex items-center'>
                {
                    editTodo
                        ? <button onClick={handleSave} className='px-2 cursor-pointer'>save</button>
                        : <button onClick={()=>setEditTodo(!editTodo)} className='px-2 cursor-pointer'>edit</button>
                }
                <button onClick={()=>handleDelete(id)} className='px-2 cursor-pointer'>delete</button>
            </div>

        </div>
    )
}
export default TodoItem;