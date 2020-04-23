import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'
import reduxImmutableStateInvarient from 'redux-immutable-state-invariant'


export default function configureStore(initialState){
    const composeEnhnacer = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    return composeEnhnacer(createStore(rootReducer, initialState,applyMiddleware(reduxImmutableStateInvarient())))
}