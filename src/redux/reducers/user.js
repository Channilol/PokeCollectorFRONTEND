import { LOGIN } from "../actions"

const initialState = {
    user: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            }
            default:
                return state
    }
}

export default userReducer