export const requestAction = (type, newRequest) => {
    return{
        type: type,
        request: newRequest
    }
}