import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerReducer } from 'react-router-redux';
import { Lists, Cards, User } from './reducers';

export default createStore(
    combineReducers({
        routing: routerReducer,
        User,
        Lists,
        Cards,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);