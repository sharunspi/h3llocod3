import * as types from './actionTypes'
import * as coursesApi from '../../api/courseApi'
import {beginApiCall, apiCallError} from './apiStatusActions'

export function laodCoursesSucess(courses){
 return { type: types.LOAD_COURSES_SUCCESS, courses}
}
export function createCourseSuccess(course){
    return {type: types.CREATE_COURSE_SUCCESS,course}
} 
export function updateCourseSuccess(course){
    return {type: types.UPDATE_COURSE_SUCCESS,course}
} 
export function deleteCourseOptimistic(course){
    return {type:types.DELETE_COURSE_OPTIMISTIC,course}
}

export function loadCourses(){
    return function (dispatch){
        dispatch(beginApiCall())
        return coursesApi.getCourses().then(courses =>{
            dispatch(laodCoursesSucess(courses))
        }).catch(error=>{
            dispatch(apiCallError(error))
            throw error
        })
    }
}
export function saveCourse(course){
    return function(dispatch){
        dispatch(beginApiCall())
        return coursesApi
        .saveCourse(course)
        .then(savedCourse =>{
            course.id
            ? dispatch(updateCourseSuccess(savedCourse))
            : dispatch(createCourseSuccess(savedCourse))
        })
        .catch(error=>{
            dispatch(apiCallError(error))
            throw error
        })
}
}
export function deleteCourse(course){
    return function (dispatch){
        dispatch(deleteCourseOptimistic(course))
        return coursesApi.deleteCourse(course.id)
    }
}