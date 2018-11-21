import axios from 'axios';

export const getLists = () => {
    return dispatch => {
        axios.get('/lists').then(response => {
            dispatch({
                type: 'GET_LISTS',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'GET_LISTS_FAIL',
                data: fail.data
            })
        });
    };
};

export const addList = (data) => {
    return dispatch => {
        axios.post('/lists', data).then(response => {
            dispatch({
                type: 'ADD_LIST',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'ADD_LIST_FAIL',
                data: fail.data
            })
        });
    };
};

export const renameList = (data) => {
    return dispatch => {
        axios.put('/lists/'+ data.list_id, data).then(response => {
            dispatch({
                type: 'RENAME_LIST',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'RENAME_LIST_FAIL',
                data: fail.data
            })
        });
    };
};

export const delList = (data) => {
    return dispatch => {
        axios.delete('/lists/'+ data.list_id).then(() => {
            dispatch({
                type: 'DELETE_LIST',
                data: data.list_id
            });
        }).catch(fail => {
            dispatch({
                type: 'DELETE_LIST_FAIL',
                data: fail.data
            })
        });
    };
};

export const getCards = () => {
    return dispatch => {
        axios.get('/cards').then(response => {
            dispatch({
                type: 'GET_CARDS',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'GET_CARDS_FAIL',
                data: fail.data
            })
        });
    };
};

export const addCard = (data) => {
    return dispatch => {
        axios.post('/cards', data).then(response => {
            dispatch({
                type: 'ADD_CARD',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'ADD_CARD_FAIL',
                data: fail.data
            })
        });
    };
};

export const editCard = (data) => {
    return dispatch => {
        axios.put('/cards/'+ data.card_id, data).then(response => {
            dispatch({
                type: 'EDIT_CARD',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'EDIT_CARD_FAIL',
                data: fail.data
            })
        });
    };
};

export const delCard = (data) => {
    return dispatch => {
        axios.delete('/cards/'+ data.card_id).then(() => {
            dispatch({
                type: 'DELETE_CARD',
                data: data.card_id
            });
        }).catch(fail => {
            dispatch({
                type: 'DELETE_CARD_FAIL',
                data: fail.data
            })
        });
    };
};

export const createUser = (data) => {
    return dispatch => {
        axios.post('/users', data).then(response => {
            dispatch({
                type: 'CREATE_USER',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'CREATE_USER_FAIL',
                data: fail.data
            })
        });
    };
};

export const loginUser = (data) => {
    return dispatch => {
        axios.post('/users/login', data).then(response => {
            dispatch({
                type: 'LOGIN_USER',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'LOGIN_USER_FAIL',
                data: fail.data
            })
        });
    };
};

export const logoutUser = (data) => {
    return dispatch => {
        axios.get('/logout', data).then(response => {
            dispatch({
                type: 'LOGOUT_USER',
                data: response.data
            });
        }).catch(fail => {
            dispatch({
                type: 'LOGOUT_USER_FAIL',
                data: fail.data
            })
        });
    };
};
