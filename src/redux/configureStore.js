import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import reduxImmutableStateInvarient from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'

export default function configureStore(initialState){
    const composeEnhnacer = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return composeEnhnacer(createStore(rootReducer, initialState,applyMiddleware(thunk,reduxImmutableStateInvarient())))
}