import { BaseResponse } from "common/types"
import { GetTasksResponse } from "features/TodolistList"

export const testRequestError = async <T>(
    requestFn: () => Promise<T>,
    expectedError: string,
    expectedStatus: number,
    errorMockResponse: BaseResponse | GetTasksResponse,
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
