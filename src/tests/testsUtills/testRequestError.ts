import { BaseResponse } from "common/types"
import { GetTasksResponse } from "features/TodolistList"

export const testRequestError = async <T>(
    requestFn: () => Promise<T>,
    errorMockResponse: BaseResponse | GetTasksResponse,
    expectedError: string = "Request failed with status code 500",
    expectedStatus: number = 500,
) => {
    await expect(requestFn()).rejects.toThrow(expectedError)
    await expect(requestFn()).rejects.toEqual(
        expect.objectContaining({
            response: expect.objectContaining({
                status: expectedStatus,
                data: errorMockResponse,
            }),
        }),
    )
}
