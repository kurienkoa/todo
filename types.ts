import React from "react";

export interface ITodo {
    check: boolean,
    text: string
}
export interface ITodoList {
    "todos": ITodo[]
}

export interface ITodoItem {
    children: ITodo,
    handleChecked: (id: number) => {},
    handleChange: (id: number, text: string) => {},
    handleDelete: (id: number) => {},
    id: number,
}

export interface IUseAuth {
    currentUser: {
        uid: string
    },
    login: (email: string, password: string) => {},
    userInfo: string
}

export interface IReactNode {
    children: React.ReactNode
}