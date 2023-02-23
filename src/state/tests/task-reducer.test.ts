import {v1} from 'uuid';
import {TasksStateType} from "../../App";
import {addTaskAC, changeToggleTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../task-reducer";
import {addTodolistAC, removeTodolistAC} from "../todolists-reducer";

let todolistID1: string
let todolistID2: string
let startState: TasksStateType

beforeEach(()=> {
    todolistID1 = v1();
    todolistID2 = v1();
    startState = {
        [todolistID1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Rest API', isDone: false},
            {id: '5', title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: '6', title: 'HTML&CSS', isDone: true},
            {id: '7', title: 'JS', isDone: true},
            {id: '8', title: 'ReactJS', isDone: false},
            {id: '9', title: 'Rest API', isDone: false},
            {id: '10', title: 'GraphQL', isDone: false},
        ]
    }
})

test('correct task should be removed', () => {
    const action = removeTaskAC(todolistID1, '3')
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState[todolistID1].length).toBe(4)
    expect(endState[todolistID1][2].title).toBe('Rest API')

})

test('correct task should be added to correct array', () => {
    let newTitle = 'SQL'

    const action = addTaskAC(todolistID2, newTitle)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState[todolistID1].length).toBe(5)
    expect(endState[todolistID2].length).toBe(6)
    expect(endState[todolistID2][5].title).toBe('SQL')
    expect(endState[todolistID2][5].isDone).toBe(false)
})

test('correct task should be changed tittle', () => {
    let newTitle = 'SSSSSQL'

    const action = updateTaskAC(todolistID1, '1', newTitle)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState[todolistID1].length).toBe(5)
    expect(endState[todolistID2].length).toBe(5)
    expect(endState[todolistID1][0].id).toBe('1')
    expect(endState[todolistID1][0].title).toBe('SSSSSQL')
    expect(endState[todolistID1][0].isDone).toBe(true)

})

test('correct should be changed status of the task ', () => {

    const action = changeToggleTaskAC(todolistID1, '3', false)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState[todolistID1].length).toBe(5)
    expect(endState[todolistID2].length).toBe(5)
    expect(endState[todolistID1][2].id).toBe('3')
    expect(endState[todolistID1][2].title).toBe('ReactJS')
    expect(endState[todolistID1][2].isDone).toBe(true)

})

test('new array should be added when new todolist is added ', () => {

    const action = addTodolistAC('todolistId3')
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k!= todolistID1 && k!= todolistID2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted ', () => {
    const action = removeTodolistAC(todolistID2)
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistID2]).toBeUndefined()
});

