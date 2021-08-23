import React,{useState,useEffect} from 'react'
import validation from './validation';
import "../SignUp/signUp.scss";

export default function SignUp({submitForm}) {

  const [values,setValues]=useState({
    fullname:"",
    email:"",
    password:""
  })
  const [errors,setErrors]=useState({})
  const [dataIsCorrect,setDataIsCorrect]=useState(false)
  const handleChange=(event)=>{
    setValues({
      ...values,[event.target.name]:event.target.value
    })
  }
  // const {handleChange,handleFormSubmit,values,errors}=use
  const handleFormSubmit=(event)=>{
    event.preventDefault()
    setErrors(validation(values))
    setDataIsCorrect(true)

  }
  useEffect(()=>{
    if(Object.keys(errors).length===0 && dataIsCorrect){
      submitForm(true)
    }

  })
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="title"> Create Account</h2>
        </div>
        <form action="" className="form-wrapper">
          <div className="name">
            <label htmlFor="" className="label">Full Name</label>
            <input type="text" className="input" name="fullname" value={values.fullname} onChange={handleChange} />
            {errors.fullname && <p className="error">{errors.fullname}</p>}
          </div>
          <div className="email">
            <label htmlFor="" className="label">Email</label>
            <input type="email" className="input" name="email" value={values.email} onChange={handleChange}  />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="password">
            <label htmlFor="" className="label">Password</label>
            <input type="password" className="input" name="password" value={values.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div>
            <button className="submit" onClick={handleFormSubmit}>Sing Up</button>
          </div>
        </form>
      </div>


      
      
    </div>
  )
}
