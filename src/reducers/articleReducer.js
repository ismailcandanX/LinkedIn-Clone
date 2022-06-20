import { SET_LOADING_STATUS } from '../actions/actionType'

export const INITIAL_STATE = {
    loading: false,
}

const articleReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.status,
            }
        default:
            return state
    }
}

export default articleReducer;