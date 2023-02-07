"use client";
import React, {FC, useEffect, useState} from "react";
import {doc, setDoc} from "@firebase/firestore";
import {db} from "../firebase/clientApp";
import TodoItem from "./todoItem";
import {useAuth} from "../context/auth";
import {collection, getDocs} from "firebase/firestore";
import {ITodo, ITodoList} from "../types";

const Todo:FC = () => {
    const {currentUser} = useAuth()
    const [load, setLoad] = useState<boolean>(false)
    const [todo, setTodo] = useState<string>('');
    const [todoList, setTodoList] = useState<ITodoList[]>([]);

    useEffect(() => {
        getTodoList()
    }, [])

    const setTodos = async (newTodos: ITodo[]) => {
        setLoad(true)
        await setDoc(doc(db, "todos", currentUser.uid), {'todos': Object.assign({}, newTodos)});
    }
    const getTodoList = () => {
        async function getTodos(): Promise<any> {
            const todosCollection = collection(db, 'todos');
            const todosSnapshot = await getDocs(todosCollection);
            const todosList = todosSnapshot.docs.map(doc => doc.data());
            return todosList;
        }

        getTodos().then((value) => {
            setTodoList(value)
        });
        setLoad(false)
    }

    const handleAddTodo = async () => {
        if (!todo) {
            return
        }
        if (!todoList[0].hasOwnProperty('todos')) {
            todoList.push({'todos': {}})
        }
        const newKey = Object.keys(todoList[0]['todos']).length === 0 ? 1 : Math.max(...Object.keys(todoList[0]['todos'])) + 1;
        setTodo('');
        setLoad(true)
        const userRef = doc(db, 'todos', currentUser.uid);
        await setDoc(userRef, {
            'todos': {
                [newKey]: {
                    check: false,
                    text: todo
                }
            }
        }, {merge: true})
        getTodoList();
    }

    const handleChecked = async (id:number) => {
        const newTodos = Object.values(todoList[0]['todos']).map((item, i) => {
            if(i === id) {
                return {
                    ...item,
                    check: !item.check
                };
            }
            return item
        })
        await setTodos(newTodos);
        getTodoList();
    }

    const handleChange = async (id:number, txt: string) => {
        const newTodos = Object.values(todoList[0]['todos']).map((item, i) => {
            if(i === id) {
                return {
                    check: item.check,
                    text: txt
                };
            }
            return item
        });
        await setTodos(newTodos);
        getTodoList();
    }

    const handleDelete = async (id:number) => {
        setLoad(true)
        const newTodos = Object.values(todoList[0]['todos']).filter((item, i) => {
            if(i !== id) return item;
        })
        await setTodos(newTodos);
        getTodoList();
    }

    return (
        <>
            <div className="py-10 w-full max-w-[65ch] mx-auto flex flex-col gap-3 sm:gap-5 text-xs sm:text-sm">
                {<div className="flex items-stretch">TODO {load && 'loading...'}</div>}
                <div className="flex items-stretch">
                    <input type='text' placeholder={'text'} value={todo} onChange={e => setTodo(e.target.value)}
                           className="flex-1 outline-none p-3 text-white text-base sm:test-lg"/>
                    <button onClick={handleAddTodo}
                            className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white font-medium text-base'>add
                    </button>
                </div>
                {
                    todoList[0] && todoList[0]['todos'] && Object.values(todoList[0]['todos']).map((todo, id) => {
                        return (
                            <TodoItem
                                key={id}
                                handleChecked={handleChecked}
                                handleChange={handleChange}
                                handleDelete={handleDelete}
                                id={id}
                            >{todo}</TodoItem>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Todo