import * as types from './actionTypes'
import * as authorApi from '../../api/authorApi'
import {beginApiCall,apiCallError} from './apiStatusActions'
export function laodAuthorsSucess(authors){
 return { type: types.LOAD_AUTHORS_SUCCESS, authors}
}
export function loadAuthors(){
    return function (dispatch){
        dispatch(beginApiCall())
        return authorApi.getAuthors().then(courses =>{
            dispatch(laodAuthorsSucess(courses))
        }).catch(err=> {
            dispatch(apiCallError(err))
            throw err
        })
    }
}