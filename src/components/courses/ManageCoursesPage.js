import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {loadCourses, saveCourse} from '../../redux/actions/courseActions'
import {loadAuthors, laodAuthorsSucess} from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import {newCourse} from '../../../tools/mockData'
import Spinner from '../common/Spinner'
import { toast } from 'react-toastify'

function ManageManageCoursesPage({ courses, authors, loadAuthors, loadCourses,saveCourse,history, ...props}){
    const [course, setCourse] = useState({...props.course})
    const [errors,setErrors] = useState({})
    const [saving,setSaving] =useState(false)
    useEffect(()=>{

    
    if(courses.length ===0){
      loadCourses().catch(err => {console.log(err)}) 
      }else{
          setCourse( ...props.course)
      }

      if(authors.length ===0){
      loadAuthors().catch(err => {console.log(err)}) 

      }
    },[props.course])
function handleChange(event){
    const {name , value } = event.target
    setCourse(preCourse => ({
        ...preCourse,
        [name]: name ==="authorId" ? parseInt(value, 10) :value 
    }))
}
function formIsValid(){
    const {title, authorId, category } =course
    const errors =0 
    if(!title) errors.title = "Title is required"
    if(!authorId) errors.author = "Author is required"
    if(!category) errors.category = "Select a category"

    setErrors(errors)
    return Object.keys(errors) ===0
}
function handleSave(event){

    event.preventDefault()
    if(!formIsValid()) return
    setSaving(true)
    saveCourse(course)
    .then(()=>{
        toast.success('Course saved')
        history.push('/courses')
    })
    .catch(error => {
        setSaving(false)
        setErrors( {onSave: error.message})
    })
}
    //     state={
    //         course:{
    //             title:""
    //         }
    //     }
    // handleChnage = event =>{
    //     const course = {...this.state.course,title:event.target.value }
    //     this.setState({course})
    //     }
    // handleSubmit= (event) =>{
    //     event.preventDefault()
    //     this.props.actions.createCourse(this.state.course)
    //     alert(this.state.course.title)
    // }
    
        return ( (authors.length ===0 || courses.length ===0) ? (
            <Spinner/>
        ):(
            <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange} onSave={handleSave} saving={saving}/>                

        )            
        )
    
}
ManageManageCoursesPage.PropTypes ={
    course:PropTypes.object.isRequired,
    authors:PropTypes.array.isRequired,
    courses:PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired,
    saveCourse: PropTypes.func.isRequired,
    history:PropTypes.object.isRequired
}
export function getCourseBySlug(courses, slug){
return courses.find(course => course.slug ===slug) || null
} 
function mapStateToProps(state, ownProps){
    const slug = ownProps.match.params.slug
    const course = 
    slug && state.courses.length > 0
     ? getCourseBySlug(state.courses, slug) 
     : newCourse
    return {
        course,
        courses: state.courses,
        authors: state.authors    
    }
}

const mapDispatchToProps ={
            
            loadCourses,
            loadAuthors,
            saveCourse
    }
export default connect(mapStateToProps, mapDispatchToProps)(ManageManageCoursesPage)