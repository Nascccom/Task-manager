import { CreateTask, DeleteTask, GetTasksResponse, tasksAPI, TaskType, UpdateTask } from "features/TodolistList"
import { ResultCode, TaskPriorities, TaskStatuses } from "common/enums"
import { mockAdapter } from "tests/mockStore"
import { BaseResponse } from "common/types"
import { generateUrl, testNetworkError, testRequestError } from "tests/testsUtills"

describe("tasksAPI", () => {
    const todolistId = "someTodolistId"
    const taskId = "someTaskId"

    const task: TaskType = {
        description: null,
        title: "Task",
        completed: false,
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: null,
        deadline: null,
        id: taskId,
        todoListId: todolistId,
        order: 0,
        addedDate: "",
    }

    const mockResponse: BaseResponse<{ item: TaskType }> = {
        fieldsErrors: [],
        data: { item: { ...task } },
        messages: [],
        resultCode: ResultCode.SUCCESS,
    }
    const errorMockResponse: BaseResponse = {
        ...mockResponse,
        data: {},
        messages: ["Something wrong"],
        resultCode: ResultCode.ERROR,
    }

    beforeEach(() => {
        mockAdapter.reset()
    })

    const onGetMock = mockAdapter.onGet(generateUrl("task", todolistId))
    const onPostMock = mockAdapter.onPost(generateUrl("task", todolistId))
    const onPutMock = mockAdapter.onPut(generateUrl("task", todolistId, taskId))
    const onDeleteMock = mockAdapter.onDelete(generateUrl("task", todolistId, taskId))

    describe("getTasks", () => {
        const getMockResponse: GetTasksResponse = {
            items: [
                { ...task, id: "1", title: "Test1" },
                { ...task, id: "2", title: "Test2" },
                { ...task, id: "3", title: "Test3" },
            ],
            totalCount: 2,
            error: null,
        }

        it("should get tasks correctly", async () => {
            onGetMock.reply(200, getMockResponse)
            const result = await tasksAPI.getTasks(todolistId)

            expect(result).toEqual(getMockResponse)
            expect(result.items.length).toBe(3)
        })

        it("should handle errors during get tasks", async () => {
            const errorMockResponse = { ...getMockResponse, items: [], error: "Something wrong" }
            onGetMock.reply(500, errorMockResponse)

            await testRequestError(() => tasksAPI.getTasks(todolistId), errorMockResponse)
        })

        it("should handle network error during get tasks without internet", async () => {
            onGetMock.networkError()

            await testNetworkError(() => tasksAPI.getTasks(todolistId))
        })
    })

    describe("createTask", () => {
        const createTaskArgs: CreateTask = { todolistId, title: "New Task" }
        const successMockResponse = {
            ...mockResponse,
            data: {
                item: {
                    ...task,
                    id: "new TaskId",
                    todoListId: createTaskArgs.todolistId,
                    title: createTaskArgs.title,
                },
            },
        }

        it("should create a new task correctly", async () => {
            onPostMock.reply(200, successMockResponse)
            const result = await tasksAPI.createTask(createTaskArgs)

            expect(result).toEqual(successMockResponse)
            expect(result.data.item).toStrictEqual(successMockResponse.data.item)
        })

        it("should handle errors during task creation", async () => {
            onPostMock.reply(500, errorMockResponse)

            await testRequestError(() => tasksAPI.createTask(createTaskArgs), errorMockResponse)
        })

        it("should handle network error during create tasks without internet", async () => {
            onPostMock.networkError()

            await testNetworkError(() => tasksAPI.createTask(createTaskArgs))
        })
    })

    describe("updateTask", () => {
        const updateTaskArgs: UpdateTask = {
            todolistId,
            taskId,
            model: {
                title: "Update This Title",
                status: TaskStatuses.InProgress,
                completed: true,
                deadline: "Tomorrow",
                description: "Update task",
                priority: TaskPriorities.Later,
                startDate: "Today",
            },
        }

        const successMockResponse = {
            ...mockResponse,
            data: {
                item: {
                    ...task,
                    id: updateTaskArgs.taskId,
                    todoListId: updateTaskArgs.todolistId,
                    ...updateTaskArgs.model,
                },
            },
        }

        it("should update a task correctly", async () => {
            onPutMock.reply(200, successMockResponse)
            const result = await tasksAPI.updateTask(updateTaskArgs)

            expect(result).toEqual(successMockResponse)
            expect(result.data.item).toStrictEqual(successMockResponse.data.item)
        })

        it("should handle errors during task update", async () => {
            onPutMock.reply(500, errorMockResponse)

            await testRequestError(() => tasksAPI.updateTask(updateTaskArgs), errorMockResponse)
        })

        it("should handle network error during update tasks without internet", async () => {
            onPutMock.networkError()

            await testNetworkError(() => tasksAPI.updateTask(updateTaskArgs))
        })
    })

    describe("deleteTask", () => {
        const deleteTaskArgs: DeleteTask = { todolistId, taskId }
        const successMockResponse = {
            ...mockResponse,
            data: {},
        }

        it("should delete a task correctly", async () => {
            onDeleteMock.reply(200, successMockResponse)
            const result = await tasksAPI.deleteTask(deleteTaskArgs)

            expect(result).toEqual(successMockResponse)
        })

        it("should handle errors during task delete", async () => {
            onDeleteMock.reply(500, errorMockResponse)

            await testRequestError(() => tasksAPI.deleteTask(deleteTaskArgs), errorMockResponse)
            await tasksAPI.deleteTask(deleteTaskArgs).catch((res) => {
                expect(res.response.data.messages[0]).toEqual(errorMockResponse.messages[0])
            })
        })

        it("should handle network error during delete tasks without internet", async () => {
            onDeleteMock.networkError()

            await testNetworkError(() => tasksAPI.deleteTask(deleteTaskArgs))
        })
    })
})
