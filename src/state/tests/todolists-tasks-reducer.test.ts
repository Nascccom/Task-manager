import {addTodolistAC, removeTodolistAC, TodolistDomainType, todolistsReducer} from "../reducers/todolists-reducer";
import {tasksReducer, TasksStateType} from "../reducers/task-reducer";
import {TodolistType} from "../../api/todolist-api/todolists-api";

test('id should be equals', () => {
    let startTodolistState: TodolistDomainType[] = []
    let startTasksState: TasksStateType = {}
    const newTodolist: TodolistType = {id: 'todolistId3', title: 'What to buy', order: 0, addedDate: ''}
    const action = addTodolistAC(newTodolist)

    const endTodolistsState = todolistsReducer(startTodolistState, action);
    const endTasksState = tasksReducer(startTasksState, action);

    const keys = Object.keys(endTasksState)
    const idFromTodolist = endTodolistsState[0].id
    const idFromTask = keys[0]

    expect(idFromTask).toBe(idFromTodolist)
    expect(idFromTask).toBe(action.newTodolist.id)
    expect(idFromTodolist).toBe(action.newTodolist.id)
});

test('tasks should be removed when todolist removed', () => {
    const startTodololistsState: TodolistDomainType[] = [
        {id: "todolist1", title: 'My hobbies', filter: 'All', order: 0, addedDate: ''},
    ]
    const startTasksState: TasksStateType = {
        ["todolist1"]: [
            {
                id: '1',
                title: 'HTML',
                completed: true,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
            {
                id: '2',
                title: 'Css',
                completed: true,
                description: '',
                status: 0,
                priority: 0,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: ''
            },
        ],
    }

    const action = removeTodolistAC("todolist1")

    const endTodolistState: TodolistDomainType[] = todolistsReducer(startTodololistsState, action)
    const endTasksState: TasksStateType = tasksReducer(startTasksState, action)

    const key = Object.keys(endTasksState)

    expect(endTodolistState.length).toBe(0)
    expect(key.length).toBe(0)

})