import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType, updateTaskAC} from "../../features/TodolistList/Todolist/Task/task-reducer";
import {addTodolistAC, removeTodolistAC} from "../../features/TodolistList/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";
import {TodolistType} from "../../api/todolists-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        ['todolistID1']: [
            {
                id: '1',
                title: 'HTML&CSS',
                completed: true,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistID1',
                order: 0,
                addedDate: ''
            },
            {
                id: '2',
                title: 'JS',
                completed: true,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistID1',
                order: 0,
                addedDate: ''
            },
        ],
        ['todolistID2']: [
            {
                id: '3',
                title: 'HTML&CSS',
                completed: true,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistID2',
                order: 0,
                addedDate: ''
            },
            {
                id: '4',
                title: 'JS',
                completed: true,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                todoListId: 'todolistID2',
                order: 0,
                addedDate: ''
            },
        ]
    }
})

const createTask = (todoListId: string, taskId: string, newTitle: string, status: TaskStatuses): TaskType => {
    return {
        id: taskId,
        title: newTitle,
        completed: true,
        description: null,
        todoListId: todoListId,
        order: 0,
        status: status,
        priority: 1,
        startDate: null,
        deadline: null,
        addedDate: ""
    }
}
const findTask = (todolistId: string, taskId: string) => {
    return startState[todolistId].find(t => t.id === taskId)
}

const todolistId = 'todolistID1'
const taskId = '1'


test('correct task should be removed', () => {
    const action = removeTaskAC(todolistId, taskId)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState['todolistID1'].length).toBe(1)
    expect(endState['todolistID2'].length).toBe(2)

})

test('correct task should be added to correct array', () => {
    let newTask: TaskType = createTask('todolistID2', '5', 'SQL', TaskStatuses.New)

    const action = addTaskAC('todolistID2', newTask)
    const endState: TasksStateType = tasksReducer(startState, action);

    expect(endState['todolistID1'].length).toBe(2)
    expect(endState['todolistID2'].length).toBe(3)

    expect(endState['todolistID2'][2].todoListId).toBe('todolistID2')
    expect(endState['todolistID2'][2].id).toBe('5')
    expect(endState['todolistID2'][2].title).toBe('SQL')
    expect(endState['todolistID2'][2].status).toBe(TaskStatuses.New)
})

test('correct task should be changed tittle', () => {
    let newTitle = 'SSSSSQL'
    let necessaryTask = findTask(todolistId, taskId)

    if (!necessaryTask) {
        console.warn('task not found')
    } else {
        necessaryTask.title = newTitle
        const action = updateTaskAC(todolistId, taskId, necessaryTask)
        const endState: TasksStateType = tasksReducer(startState, action);

        expect(endState['todolistID1'].length).toBe(2)
        expect(endState['todolistID2'].length).toBe(2)
        expect(endState['todolistID1'][0].id).toBe(taskId)
        expect(endState['todolistID1'][0].title).toBe('SSSSSQL')
        expect(endState['todolistID1'][0].completed).toBe(true)
        expect(endState['todolistID1'][0].status).toBe(TaskStatuses.New)
    }
})

test('correct should be changed status of the task ', () => {
    let necessaryTask = findTask(todolistId, taskId)

    if (!necessaryTask) {
        console.warn('task not found')
    } else {
        necessaryTask.status = TaskStatuses.Completed
        const action = updateTaskAC(todolistId, taskId, necessaryTask)
        const endState: TasksStateType = tasksReducer(startState, action);

        expect(endState['todolistID1'].length).toBe(2)
        expect(endState['todolistID2'].length).toBe(2)
        expect(endState['todolistID1'][0].id).toBe('1')
        expect(endState['todolistID1'][0].title).toBe('HTML&CSS')
        expect(endState['todolistID1'][0].status).toBe(TaskStatuses.Completed)
        expect(endState['todolistID1'][0].todoListId).toBe(todolistId)
    }
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

