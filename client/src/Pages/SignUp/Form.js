import React,{useState} from 'react'
import SingUp from "./SignUp"
import SingupFormSuccess from './SingupFormSuccess'
// import "./signUp.scss";

export default function Form() {
  const [formIsSubmitted,setFormIsSubmited]=useState(false)
  const submitForm=()=>{
    setFormIsSubmited(true)
  }
  return (
    <div>
    { !formIsSubmitted ? <SingUp submitForm={submitForm}/>:<SingupFormSuccess/>}
    </div>
  )
}
