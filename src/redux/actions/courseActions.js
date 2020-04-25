import * as types from './actionTypes'
import * as coursesApi from '../../api/courseApi'
export function createCourse(course){
    return {
        type:types.CREATE_COURSE, course
    }
}
export function laodCoursesSucess(courses){
 return { type: types.LOAD_COURSES_SUCCESS, courses}
}
export function loadCourses(){
    return function (dispatch){
        return coursesApi.getCourses().then(courses =>{
            dispatch(laodCoursesSucess(courses))
        }).catch(err=> {
            throw err
        })
    }
}