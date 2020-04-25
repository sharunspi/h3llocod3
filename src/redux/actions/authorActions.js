import * as types from './actionTypes'
import * as authorApi from '../../api/authorApi'

export function laodAuthorsSucess(authors){
 return { type: types.LOAD_AUTHORS_SUCCESS, authors}
}
export function loadAuthors(){
    return function (dispatch){
        return authorApi.getAuthors().then(courses =>{
            dispatch(laodAuthorsSucess(courses))
        }).catch(err=> {
            throw err
        })
    }
}