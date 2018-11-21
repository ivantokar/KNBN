
export const Lists = (state = [], action) => {
    switch (action.type) {
        case 'ADD_LIST':
            return [
                ...state,
                action.data
            ];
        case 'GET_LISTS':
            return action.data.sort((a,b) => {
                return a.list_position - b.list_position;
            });

        case 'RENAME_LIST':
            return [
                ...state.filter(item => item._id !== action.data._id),
                Object.assign({}, action.data)
            ].sort((a,b) => {
                return a.list_position - b.list_position;
            });

        case 'DELETE_LIST':
            let removeListState = Object.assign([], state);
            let removeListIndex = state.findIndex(item => {
                return item._id === action.data;
            });

            removeListState.splice(removeListIndex, 1);
            return removeListState;

        default:
            return state
    }
};

export const Cards = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return [
                ...state,
                action.data
            ];
        case 'GET_CARDS':
            return action.data.sort((a,b) => {
                return a.card_position - b.card_position;
            });

        case 'EDIT_CARD':
            return [
                ...state.filter(item => item._id !== action.data._id),
                Object.assign({}, action.data)
            ].sort((a,b) => {
                return a.card_position - b.card_position;
            });

        case 'DELETE_CARD':
            let updatedState = Object.assign([], state);
            let index = state.findIndex(item => {
                return item._id === action.data;
            });

            updatedState.splice(index, 1);

            return updatedState;

        default:
            return state
    }
};

export const User = (state = [{ authenticated: false }], action) => {
    switch (action.type) {
        case 'CREATE_USER':
            return {
                success: true
            };
        case 'CREATE_USER_FAIL':
            return {
                success: false,
                message: 'This email already exists'
            };
        case 'LOGIN_USER':
            return {
                authenticated: true,
                success: true,
                message: 'Success!'
            };
        case 'LOGIN_USER_FAIL':
            return {
                success: false,
                message: 'Error!'
            };
        case 'LOGOUT_USER':
            return {
                authenticated: false,
            };
        case 'LOGOUT_USER_FAIL':
            return {
                authenticated: true,
            };
        default:
            return state
    }
};