import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import * as courseActions from '../../redux/actions/courseActions'
import * as authorActions from '../../redux/actions/authorActions'
import PropTypes from 'prop-types'
import CourseForm from './CourseForm'
import {newCourse} from '../../../tools/mockData'

function ManageManageCoursesPage({ courses, authors, loadAuthors, loadCourses, ...props}){
    const [course, setCourse] = useState({...props.course})
    const [errors,setErrors] = useState({})
    useEffect(()=>{

    
    if(courses.length ===0){
      loadCourses().catch(err => {console.log(err)}) 
      }

      if(authors.length ===0){
      loadAuthors().catch(err => {console.log(err)}) 

      }
    },[])
function handleChange(event){
    const {name , value} = event.target
    setCourse(preCourse => ({
        ...preCourse,
        [name]: name ==="authorId" ? parseInt(value, 10) :value 
    }))
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
    
        return (
            <CourseForm course={course} errors={errors} authors={authors} onChange={handleChange}/>
        )
    
}
ManageManageCoursesPage.PropTypes ={
    course:PropTypes.object.isRequired,
    authors:PropTypes.array.isRequired,
    courses:PropTypes.array.isRequired,
    loadCourses: PropTypes.func.isRequired,
    loadAuthors: PropTypes.func.isRequired
}
function mapStateToProps(state){
    return {
        course: newCourse,
        courses: state.courses,
        authors: state.authors    
    }
}

const mapDispatchToProps ={
   
            loadCourses:courseActions.loadCourses,
            loadAuthors:authorActions.loadAuthors
    }
export default connect(mapStateToProps, mapDispatchToProps)(ManageManageCoursesPage)