import { CreateTask, todolistAPI, TodolistType } from "features/TodolistList"
import { mockAdapter } from "tests/mockStore"
import { generateUrl, testNetworkError, testRequestError } from "tests/testsUtills"
import { BaseResponse } from "common/types"
import { ResultCode } from "common/enums"

describe("todolistsAPI", () => {
    const todolistId = "someTodolistId"
    const mockTodolists: TodolistType[] = [
        { id: "1", title: "Todolist 1", addedDate: "2022-01-01", order: 1 },
        { id: "2", title: "Todolist 2", addedDate: "2022-02-01", order: 2 },
    ]

    const mockResponse: BaseResponse = {
        fieldsErrors: [],
        data: {},
        messages: [],
        resultCode: ResultCode.SUCCESS,
    }
    const errorMockResponse: BaseResponse = {
        ...mockResponse,
        messages: ["Something wrong"],
        resultCode: ResultCode.ERROR,
    }

    beforeEach(() => {
        mockAdapter.reset()
    })

    const onGetMock = mockAdapter.onGet(generateUrl("todolist"))
    const onPostMock = mockAdapter.onPost(generateUrl("todolist"))
    const onPutMock = mockAdapter.onPut(generateUrl("todolist", todolistId))
    const onDeleteMock = mockAdapter.onDelete(generateUrl("todolist", todolistId))

    describe("getTodolists", () => {
        it("should get todolists correctly", async () => {
            onGetMock.reply(200, mockTodolists)
            const result = await todolistAPI.getTodolists()

            expect(result).toStrictEqual(mockTodolists)
            expect(result.length).toBe(2)
        })

        it("should handle errors during get todolists", async () => {
            onGetMock.reply(500, errorMockResponse)

            await testRequestError(
                () => todolistAPI.getTodolists(),
                "Request failed with status code 500",
                500,
                errorMockResponse,
            )
            await todolistAPI.getTodolists().catch((err) => {
                expect(err.response.data.messages[0]).toBe(errorMockResponse.messages[0])
            })
        })

        it("should handle network error during get tasks without internet", async () => {
            onGetMock.networkError()

            await testNetworkError(() => todolistAPI.getTodolists())
        })
    })

    describe("createTodolist", () => {
        const title = "New Title"
        const successMockResponse: BaseResponse<{ item: TodolistType }> = {
            ...mockResponse,
            data: {
                item: { ...mockTodolists[0], title },
            },
        }

        it("should create a new todolist correctly", async () => {
            onPostMock.reply(200, successMockResponse)
            const result = await todolistAPI.createTodolist(title)

            expect(result).toEqual(successMockResponse)
            expect(result.data.item).toStrictEqual(successMockResponse.data.item)
        })

        it("should handle errors during todolist creation", async () => {
            onPostMock.reply(500, errorMockResponse)

            await testRequestError(
                () => todolistAPI.createTodolist(title),
                "Request failed with status code 500",
                500,
                errorMockResponse,
            )
            await todolistAPI.createTodolist(title).catch((err) => {
                expect(err.response.data.messages[0]).toBe(errorMockResponse.messages[0])
            })
        })

        it("should handle network error during create tasks without internet", async () => {
            onPostMock.networkError()

            await testNetworkError(() => todolistAPI.createTodolist(title))
        })
    })

    describe("updateTodolistTitle", () => {
        const args: CreateTask = { todolistId, title: "updateTodolistTitle" }

        it("should update todolist's title  correctly", async () => {
            onPutMock.reply(200, mockResponse)
            const result = await todolistAPI.updateTodolistTitle(args)

            expect(result).toEqual(mockResponse)
        })

        it("should handle errors during task update", async () => {
            onPutMock.reply(500, errorMockResponse)

            await testRequestError(
                () => todolistAPI.updateTodolistTitle(args),
                "Request failed with status code 500",
                500,
                errorMockResponse,
            )
        })

        it("should handle network error during update tasks without internet", async () => {
            onPutMock.networkError()

            await testNetworkError(() => todolistAPI.updateTodolistTitle(args))
        })
    })

    describe("deleteTodolist", () => {
        it("should delete a todolist correctly", async () => {
            onDeleteMock.reply(200, mockResponse)
            const result = await todolistAPI.deleteTodolist(todolistId)

            expect(result).toEqual(mockResponse)
        })

        it("should handle errors during task delete", async () => {
            onDeleteMock.reply(500, errorMockResponse)

            await testRequestError(
                () => todolistAPI.deleteTodolist(todolistId),
                "Request failed with status code 500",
                500,
                errorMockResponse,
            )
            await todolistAPI.deleteTodolist(todolistId).catch((res) => {
                expect(res.response.data.messages[0]).toEqual(errorMockResponse.messages[0])
            })
        })

        it("should handle network error during delete tasks without internet", async () => {
            onDeleteMock.networkError()

            await testNetworkError(() => todolistAPI.deleteTodolist(todolistId))
        })
    })
})
