import { tasksReducer, TasksStateType, tasksThunks } from "features/TodolistList/model/taskSlice"
import { todolistsActions } from "features/TodolistList/model/todolistsSlice"
import { TaskPriorities, TaskStatuses } from "common/enums"

let startState: TasksStateType

beforeEach(() => {
    startState = {
        ["todolistID1"]: [
            {
                id: "1",
                title: "HTML&CSS",
                completed: true,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistID1",
                order: 0,
                addedDate: "",
            },
            {
                id: "2",
                title: "JS",
                completed: true,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistID1",
                order: 0,
                addedDate: "",
            },
        ],
        ["todolistID2"]: [
            {
                id: "3",
                title: "React",
                completed: false,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistID2",
                order: 0,
                addedDate: "",
            },
            {
                id: "4",
                title: "RTK",
                completed: true,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistID2",
                order: 0,
                addedDate: "",
            },
        ],
    }
})

const findTask = (todolistId: string, taskId: string) => {
    return startState[todolistId].find((t) => t.id === taskId)
}

test("correct task should be removed", () => {
    const todolistData = { todolistId: "todolistID1", taskId: "1" }
    const action = tasksThunks.removeTask.fulfilled(todolistData, "requestId", todolistData)
    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"].length).toBe(1)
    expect(endState["todolistID2"].length).toBe(2)
})

test("correct task should be added to correct array", () => {
    const action = tasksThunks.addTask.fulfilled(
        { todolistId: "todolistID2", task: { ...startState["todolistID2"][0], id: "new id", title: "SQL" } },
        "requestId",
        { todolistId: "todolistID2", title: "SQL" },
    )

    const endState = tasksReducer(startState, action)

    expect(endState["todolistID1"].length).toBe(2)
    expect(endState["todolistID2"].length).toBe(3)
    expect(endState["todolistID2"][0].todoListId).toBe("todolistID2")
    expect(endState["todolistID2"][0].id).toBe("new id")
    expect(endState["todolistID2"][0].title).toBe("SQL")
})

test("correct task should be changed tittle", () => {
    let newTitle = "SSSSSQL"
    let necessaryTask = findTask("todolistID1", "1")

    if (necessaryTask) {
        const action = tasksThunks.updateTask.fulfilled(
            { todolistId: "todolistID1", taskId: "1", task: { ...startState["todolistID1"][0], title: newTitle } },
            "requestId",
            { todolistId: "todolistID1", taskId: "1", changingPart: { title: newTitle } },
        )
        const endState = tasksReducer(startState, action)

        expect(endState["todolistID1"][0].title).toBe("SSSSSQL")
        expect(endState["todolistID1"][1].title).toBe("JS")
        expect(endState["todolistID2"][0].title).toBe("React")
        expect(endState["todolistID2"][1].title).toBe("RTK")
    }
})

test("status should be changed of the task ", () => {
    let necessaryTask = findTask("todolistID1", "1")

    if (necessaryTask) {
        const action = tasksThunks.updateTask.fulfilled(
            {
                todolistId: "todolistID1",
                taskId: "1",
                task: { ...startState["todolistID1"][0], status: TaskStatuses.Completed },
            },
            "requestId",
            { todolistId: "todolistID1", taskId: "1", changingPart: { status: TaskStatuses.Completed } },
        )
        const endState = tasksReducer(startState, action)

        expect(endState["todolistID1"][0].status).toBe(TaskStatuses.Completed)
        expect(endState["todolistID1"][1].status).toBe(TaskStatuses.New)
        expect(endState["todolistID2"][0].status).toBe(TaskStatuses.New)
        expect(endState["todolistID2"][1].status).toBe(TaskStatuses.New)
    }
})

test("new array should be added when new todolist is added ", () => {
    const action = todolistsActions.addTodolist({
        todolist: {
            id: "todolistId3",
            title: "What to buy",
            order: 0,
            addedDate: "",
        },
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find((k) => k != "todolistID1" && k != "todolistID2")
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test("property with todolistId should be deleted ", () => {
    const action = todolistsActions.removeTodolist({ todolistId: "todolistID2" })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["todolistID2"]).toBeUndefined()
})
test("empty arrays should be added when we set todolists", () => {
    const action = todolistsActions.setTodolist({
        todolists: [
            { id: "1", title: "title 1", order: 0, addedDate: "" },
            { id: "2", title: "title 2", order: 0, addedDate: "" },
        ],
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(4)
    expect(endState["1"]).toBeDefined()
    expect(endState["2"]).toBeDefined()
})

test("tasks should be added for todolist", () => {
    const action = tasksThunks.getTasks.fulfilled(
        { todolistId: "todolistID1", tasks: startState["todolistID1"] },
        "requestId",
        "todolistID1",
    )
    const endState = tasksReducer({ todolistID1: [], todolistID2: [] }, action)

    expect(endState["todolistID1"].length).toBe(2)
    expect(endState["todolistID2"].length).toBe(0)
})
