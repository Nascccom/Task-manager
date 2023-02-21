import {TasksStateType, TodolistType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./task-reducer";

test('id should be equals', () => {
    let startTodolistState: TodolistType[] = []
    let startTasksState: TasksStateType = {}

    const action = addTodolistAC('todolistId3')

    const endTodolistsState = todolistsReducer(startTodolistState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const keys = Object.keys(endTasksState)
    const idFromTodolist = endTodolistsState[0].id
    const idFromTask = keys[0]

    expect(idFromTask).toBe(idFromTodolist)
    expect(idFromTask).toBe(action.payload.todolistId)
    expect(idFromTodolist).toBe(action.payload.todolistId)
});