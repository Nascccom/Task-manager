export const testNetworkError = async <T>(requestFn: () => Promise<T>) => {
    await expect(requestFn()).rejects.toThrow("Network Error")
}
