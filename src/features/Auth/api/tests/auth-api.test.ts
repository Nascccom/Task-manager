import { mockAdapter } from "tests/mockStore"
import { BaseResponse } from "common/types"
import { ResultCode } from "common/enums"
import { authAPI, AuthMe, LoginParams } from "features/Auth"
import { testNetworkError, testRequestError } from "tests/testsUtills"

describe("authAPI", () => {
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

    const onGetAuthMock = mockAdapter.onGet("auth/me")
    const onLoginMock = mockAdapter.onPost("auth/login")
    const onLogoutMock = mockAdapter.onDelete("auth/login")

    describe("getAuthMeData", () => {
        const successMockResponse: BaseResponse<AuthMe> = {
            ...mockResponse,
            data: { id: 1, email: "test@bk.ru", login: "Test" },
        }

        it("should get authentication data correctly", async () => {
            onGetAuthMock.reply(200, successMockResponse)
            const result = await authAPI.getAuthMeData()

            expect(result).toStrictEqual(successMockResponse)
        })

        it("should handle errors when receiving authentication data", async () => {
            onGetAuthMock.reply(500, errorMockResponse)

            await testRequestError(() => authAPI.getAuthMeData(), errorMockResponse)
            await authAPI.getAuthMeData().catch((err) => {
                expect(err.response.data.messages[0]).toBe(errorMockResponse.messages[0])
            })
        })

        it("should handle network error during get authentication data without internet", async () => {
            onGetAuthMock.networkError()

            await testNetworkError(() => authAPI.getAuthMeData())
        })
    })

    describe("login", () => {
        const successMockResponse: BaseResponse<{ userId: number }> = {
            ...mockResponse,
            data: { userId: 1 },
        }
        const args: LoginParams = { email: "test@bk.ru", rememberMe: false, password: "1111" }

        it("should be logged in correctly", async () => {
            onLoginMock.reply(200, successMockResponse)
            const result = await authAPI.login(args)

            expect(result).toEqual(successMockResponse)
        })

        it("should handle errors during login attempt", async () => {
            onLoginMock.reply(500, errorMockResponse)

            await testRequestError(() => authAPI.login(args), errorMockResponse)
            await authAPI.login(args).catch((err) => {
                expect(err.response.data.messages[0]).toBe(errorMockResponse.messages[0])
            })
        })

        it("should handle network error during login without internet", async () => {
            onLoginMock.networkError()

            await testNetworkError(() => authAPI.login(args))
        })
    })

    describe("logout", () => {
        it("should be logout correctly", async () => {
            onLogoutMock.reply(200, mockResponse)
            const result = await authAPI.logout()

            expect(result).toEqual(mockResponse)
        })

        it("should handle errors during logout attempt", async () => {
            onLogoutMock.reply(500, errorMockResponse)

            await testRequestError(() => authAPI.logout(), errorMockResponse)
        })

        it("should handle network error during logout without internet", async () => {
            onLogoutMock.networkError()

            await testNetworkError(() => authAPI.logout())
        })
    })
})
