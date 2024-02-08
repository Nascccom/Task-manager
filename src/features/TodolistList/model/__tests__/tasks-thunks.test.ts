import { mockStore, MockStoreType } from "common/testsUtils/mockStore"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums"
import { tasksAPI, tasksAsyncActions } from "features/TodolistList"

describe("taskThunks", () => {
    let store: MockStoreType
    let todolistId: string
    let taskId: string
    beforeEach(() => {
        store = mockStore({
            app: {
                isInitialized: false,
                status: "idle",
                error: null,
            },
            auth: {
                userId: null,
                email: "",
                login: "",
                rememberMe: false,
                isLoggedIn: false,
            },
            todolists: [],
            tasks: {},
        })
        todolistId = "someTodolistId"
        taskId = "someTaskId"
    })

    test("when getTasks request was made, should receive the required action and payload", async () => {
        const mockResponse = {
            items: [
                {
                    id: "1",
                    title: "HTML&CSS",
                    completed: true,
                    description: "",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Hi,
                    startDate: "",
                    deadline: "",
                    todoListId: todolistId,
                    order: 0,
                    addedDate: "",
                },
            ],
            totalCount: 12,
            error: null,
        }
        tasksAPI.getTasks = jest.fn(() => Promise.resolve(mockResponse))

        await store.dispatch(tasksAsyncActions.getTasks(todolistId))

        const actions = store.getActions()

        expect(actions[0].type).toEqual(`${tasksAsyncActions.getTasks.pending.type}`)
        expect(actions[1].type).toEqual(`${tasksAsyncActions.getTasks.fulfilled.type}`)
        expect(actions[1].payload.todolistId).toEqual(todolistId)
        expect(actions[1].payload.tasks).toEqual(mockResponse.items)
    })

    test("removeTask: when the task is deleted, should receive the required action and payload", async () => {
        const mockDeleteTaskResponse = { resultCode: ResultCode.SUCCESS, messages: [], data: {}, fieldsErrors: [] }
        tasksAPI.deleteTask = jest.fn(() => Promise.resolve(mockDeleteTaskResponse))

        await store.dispatch(tasksAsyncActions.removeTask({ todolistId, taskId }))
        const actions = store.getActions()

        expect(actions[0].type).toEqual(`${tasksAsyncActions.removeTask.pending.type}`)
        //пропускаем actions[1], так как это tasks/changeTaskStatus для дизейбла кнопки
        expect(actions[2].type).toEqual(`${tasksAsyncActions.removeTask.fulfilled.type}`)
        expect(actions[2].payload).toEqual({ todolistId, taskId })
    })

    test("removeTask: the task was not deleted", async () => {
        const mockDeleteTaskResponse = {
            resultCode: 0,
            messages: ["The task was not deleted"],
            data: {},
            fieldsErrors: [],
        }
        tasksAPI.deleteTask = jest.fn(() => Promise.reject(mockDeleteTaskResponse))

        await store.dispatch(tasksAsyncActions.removeTask({ todolistId, taskId }))
        const actions = store.getActions()

        expect(actions[0].type).toEqual(`${tasksAsyncActions.removeTask.pending.type}`)
        expect(actions[2].type).toEqual(`${tasksAsyncActions.removeTask.rejected.type}`)
    })
})
