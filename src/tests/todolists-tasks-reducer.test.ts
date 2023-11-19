import {
    tasksReducer,
    TasksStateType,
    TodolistDomainType,
    todolistsSlice,
    todolistsThunks,
} from "features/TodolistList"
import { TaskPriorities, TaskStatuses } from "common/enums"

let startTodolistsState: TodolistDomainType[]
let startTasksState: TasksStateType

beforeEach(() => {
    startTodolistsState = [
        { id: "todolist1", title: "My hobbies", filter: "All", order: 0, addedDate: "", entityStatus: "idle" },
    ]
    startTasksState = {
        ["todolist1"]: [
            {
                id: "1",
                title: "HTML",
                completed: true,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolist1",
                order: 0,
                addedDate: "",
            },
            {
                id: "2",
                title: "Css",
                completed: true,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolist1",
                order: 0,
                addedDate: "",
            },
        ],
    }
})

test("id should be equals", () => {
    const action = todolistsThunks.addTodolist.fulfilled(
        { todolist: { ...startTodolistsState[0], id: "todolistId3", title: "What to buy" } },
        "requestId",
        "What to buy",
    )

    const endTodolistsState = todolistsSlice([], action)
    const endTasksState = tasksReducer({}, action)

    const keys = Object.keys(endTasksState)
    const idFromTodolist = endTodolistsState[0].id
    const idFromTask = keys[0]

    expect(idFromTask).toBe(idFromTodolist)
    expect(idFromTask).toBe(action.payload.todolist.id)
    expect(idFromTodolist).toBe(action.payload.todolist.id)
})

test("tasks should be removed when todolist removed", () => {
    const action = todolistsThunks.removeTodolist.fulfilled({ todolistId: "todolist1" }, "requestId", "todolist1")

    const endTodolistState: TodolistDomainType[] = todolistsSlice(startTodolistsState, action)
    const endTasksState: TasksStateType = tasksReducer(startTasksState, action)

    const key = Object.keys(endTasksState)

    expect(endTodolistState.length).toBe(0)
    expect(key.length).toBe(0)
})
