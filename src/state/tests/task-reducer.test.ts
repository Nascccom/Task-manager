import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "../reducers/task-reducer";
import {addTodolistAC, removeTodolistAC} from "../reducers/todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/tasksAPI/tasks-api";
import {TodolistType} from "../../api/todolist-api/todolists-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        ['todolistID1']: [
            {
                id: '1', title: 'HTML&CSS', completed: true, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
            {
                id: '2', title: 'JS', completed: true, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
        ],
        ['todolistID2']: [
            {
                id: '3', title: 'HTML&CSS', completed: true, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
            {
                id: '4', title: 'JS', completed: true, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''
            },
        ]
    }
})

test('correct task should be removed', () => {
    const action = removeTaskAC('todolistID1', '2')
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState['todolistID1'].length).toBe(1)
    expect(endState['todolistID2'].length).toBe(2)

})

test('correct task should be added to correct array', () => {
    let newTask: TaskType = {
        id: '1', title: 'SQL', completed: false, description: '',
        status: 0, priority: 0, startDate: '', deadline: '',
        todoListId: 'todolistID2', order: 0, addedDate: ''
    }


    const action = addTaskAC('todolistID2', newTask)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState['todolistID1'].length).toBe(2)
    expect(endState['todolistID2'].length).toBe(3)
    expect(endState['todolistID2'][2].title).toBe('SQL')
    expect(endState['todolistID2'][2].completed).toBe(false)
})

test('correct task should be changed tittle', () => {
    let newTitle = 'SSSSSQL'

    const task: TaskType = {
        id: '1',
        title: newTitle,
        completed: true,
        description: null,
        todoListId: 'todolistID1',
        order: 0,
        status: 0,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2023-06-13T18:01:13.75"
    }

    const action = updateTaskAC('todolistID1', '1', task)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState['todolistID1'].length).toBe(2)
    expect(endState['todolistID2'].length).toBe(2)
    expect(endState['todolistID1'][0].id).toBe('1')
    expect(endState['todolistID1'][0].title).toBe('SSSSSQL')
    expect(endState['todolistID1'][0].completed).toBe(true)

})

test('correct should be changed status of the task ', () => {
    const task: TaskType = {
        id: '1',
        title: 'Abracadabra',
        completed: true,
        description: null,
        todoListId: 'todolistID1',
        order: 0,
        status: TaskStatuses.New,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: "2023-06-13T18:01:13.75"
    }

    const action = updateTaskAC('todolistID1', '1', task)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState['todolistID1'].length).toBe(2)
    expect(endState['todolistID2'].length).toBe(2)
    expect(endState['todolistID1'][0].id).toBe('1')
    expect(endState['todolistID1'][0].title).toBe('Abracadabra')
    expect(endState['todolistID1'][0].status).toBe(TaskStatuses.New)

})

test('new array should be added when new todolist is added ', () => {
    const newTodolist: TodolistType = {id: 'todolistId3', title: 'What to buy', order: 0, addedDate: ''}

    const action = addTodolistAC(newTodolist)
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistID1' && k != 'todolistID2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted ', () => {
    const action = removeTodolistAC('todolistID2')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistID2']).toBeUndefined()
});

