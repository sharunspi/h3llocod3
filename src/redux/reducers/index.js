import {combineReducers} from 'redux'
import courses from './courseReducer'
import authors from './authorReducer'
import apiCallinProgress from './apiStatusReducers'
const rootReducer = combineReducers({
    courses,
    authors,
    apiCallinProgress
})
export default rootReducer