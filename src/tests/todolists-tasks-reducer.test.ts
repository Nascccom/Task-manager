import { TodolistDomainType, todolistsActions, todolistsSlice } from "features/TodolistList/model/todolistsSlice"
import { tasksReducer, TasksStateType } from "features/TodolistList/model/taskSlice"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { TodolistType } from "features/TodolistList/api/todolistsApi.types"

test("id should be equals", () => {
    let startTodolistState: TodolistDomainType[] = []
    let startTasksState: TasksStateType = {}
    const newTodolist: TodolistType = { id: "todolistId3", title: "What to buy", order: 0, addedDate: "" }
    const action = todolistsActions.addTodolist({ todolist: newTodolist })

    const endTodolistsState = todolistsSlice(startTodolistState, action)
    const endTasksState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idFromTodolist = endTodolistsState[0].id
    const idFromTask = keys[0]

    expect(idFromTask).toBe(idFromTodolist)
    expect(idFromTask).toBe(action.payload.todolist.id)
    expect(idFromTodolist).toBe(action.payload.todolist.id)
})

test("tasks should be removed when todolist removed", () => {
    const startTodololistsState: TodolistDomainType[] = [
        { id: "todolist1", title: "My hobbies", filter: "All", order: 0, addedDate: "", entityStatus: "idle" },
    ]
    const startTasksState: TasksStateType = {
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

    const action = todolistsActions.removeTodolist({ todolistId: "todolist1" })

    const endTodolistState: TodolistDomainType[] = todolistsSlice(startTodololistsState, action)
    const endTasksState: TasksStateType = tasksReducer(startTasksState, action)

    const key = Object.keys(endTasksState)

    expect(endTodolistState.length).toBe(0)
    expect(key.length).toBe(0)
})
