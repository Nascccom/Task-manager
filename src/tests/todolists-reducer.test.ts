import { TodolistDomainType, todolistsActions, todolistsReducer } from "features/TodolistList"

let startState: TodolistDomainType[]

beforeEach(() => {
    startState = [
        { id: "todolistID1", title: "What to learn", filter: "All", addedDate: "", order: 0, entityStatus: "idle" },
        { id: "todolistID2", title: "What to buy", filter: "All", addedDate: "string", order: 0, entityStatus: "idle" },
    ]
})

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(
        startState,
        todolistsActions.removeTodolist.fulfilled({ todolistId: "todolistID1" }, "requestId", "todolistID1"),
    )

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe("todolistID2")
})
test("correct todolist should be added", () => {
    const endState = todolistsReducer(
        startState,
        todolistsActions.addTodolist.fulfilled(
            { todolist: { ...startState[0], id: "todolistID3", title: "React.FC" } },
            "requiestId",
            "React.FC",
        ),
    )

    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe("todolistID3")
    expect(endState[1].id).toBe("todolistID1")
    expect(endState[2].id).toBe("todolistID2")
    expect(endState[0].title).toBe("React.FC")
})
test("correct todolist should be changed tittle todolist", () => {
    const dataForCreateTodo = { todolistId: "todolistID1", title: "New Todolist" }
    const endState = todolistsReducer(
        startState,
        todolistsActions.updateTodolistTitle.fulfilled(dataForCreateTodo, "requestId", dataForCreateTodo),
    )

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe("todolistID1")
    expect(endState[0].title).toBe("New Todolist")
    expect(endState[1].title).toBe("What to buy")
})
test("correct filter of the todolist should be changed ", () => {
    const endState = todolistsReducer(
        startState,
        todolistsActions.changeFilter({
            todolistId: "todolistID2",
            filter: "Completed",
        }),
    )

    expect(endState[0].filter).toBe("All")
    expect(endState[1].filter).toBe("Completed")
})
test("todolists should be added", () => {
    const endState = todolistsReducer([], todolistsActions.getTodolists.fulfilled(startState, "requestId", undefined))

    expect(endState.length).toBe(2)
})
test("correct entity status of todolist should be changed", () => {
    const endState = todolistsReducer(
        startState,
        todolistsActions.changeEntityStatus({
            todolistId: "todolistID1",
            entityStatus: "loading",
        }),
    )

    expect(endState[0].entityStatus).toBe("loading")
    expect(endState[1].entityStatus).toBe("idle")
})
