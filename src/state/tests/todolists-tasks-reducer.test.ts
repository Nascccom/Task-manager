import {addTodolistAC, removeTodolistAC, todolistsReducer, TodolistType} from "../reducers/todolists-reducer";
import {tasksReducer, TasksStateType} from "../reducers/task-reducer";

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

test('tasks should be removed when todolist removed', () => {
    const startTodololistsState: TodolistType[] = [
        {id: "todolist1", title: 'My hobbies', filter: 'All'},
    ]
    const startTasksState: TasksStateType = {
        ["todolist1"]: [
            {id: '1', title: 'HTML', isDone: true},
            {id: '2', title: 'Css', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
    }

    const action = removeTodolistAC("todolist1")

    const endTodolistState: TodolistType[] = todolistsReducer(startTodololistsState, action)
    const endTasksState: TasksStateType = tasksReducer(startTasksState, action)

    const key = Object.keys(endTasksState)

    expect(endTodolistState.length).toBe(0)
    expect(key.length).toBe(0)

})