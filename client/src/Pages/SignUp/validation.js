const validation =(userData)=>{
  let errors={};
  if(!userData.firstName){
    errors.firstName="First Name is required"
  }
  if(!userData.lastName){
    errors.lastName="Last Name is required"
  }
  if(!userData.accountName){
    errors.accountName="Account Name is required"
  }
  // Email Validation
  if(!userData.email){
    errors.email="Email is required."
  
  }else if(!/\S+@\S+\.\S+/.test(userData.email)){
    errors.email="Email is invalid"
  }
  // Confirm password
  if (userData.password !== "undefined" && userData.confirm_password !== "undefined") {
          
    if (userData.password !== userData.confirm_password){
      errors.password = "Passwords don't match.";
    }
}

// Password Validation if it is less then 6 characters
  if(!userData.password){
    errors.password="Password is required."
  }else if(userData.password.length <6){
    errors.password="Password must be more than six characters"
  }
  return errors;
}

export default validation;