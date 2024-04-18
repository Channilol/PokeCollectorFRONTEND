export const LOGIN = 'LOGIN'

export const setUserAction = (user) => {
    return {
        type: LOGIN,
        payload: user
    }
}