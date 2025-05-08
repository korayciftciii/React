import { useState } from "react";
import InputComponent from "./Input"
import useInput from "../hooks/useInput";
import { hasMinLength, isNotEmpty, validateEmail } from "../utils/validations";
export default function Login() {
  const { value: emailValue, handleInputChange: handleMailChange, handleInputBlur: handleMailBlur, isEdited: isMailEdited, hasError: IsMailValid } = useInput('', (value) => validateEmail(value) && isNotEmpty(value));
  const { value: passValue, handleInputChange: handlePassChange, handleInputBlur: handlePassBlur, isEdited: isPassEdited, hasError: IsPassValid } = useInput('', (value) => hasMinLength(value, 6));
  // const isMailValid = isMailEdited && !validateEmail(emailValue);
  // const isPasswordValid = isPassEdited && !hasMinLength(passValue, 6);



  function handleSubmit(e) {
    e.preventDefault();
    if (!IsMailValid && !IsPassValid) {
      console.log('email:', emailValue)
    }
    else {
      return;
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="header">
        <h1>Login</h1>
        <p>Please enter your login and password!</p>
      </div>

      <InputComponent
        type={'email'}
        name={'email'}
        id={'email'}
        validationInfo={IsMailValid}
        labelTitle={'Email'}
        feedBackMessage={'Please enter a valid email address'}
        handleInputChange={handleMailChange}
        handleInputBlur={handleMailBlur} />
      <InputComponent
        type={'password'}
        name={'password'}
        id={'password'}
        validationInfo={IsPassValid}
        labelTitle={'Password'}
        feedBackMessage={'Password should include min 6 characters'}
        handleInputChange={handlePassChange}
        handleInputBlur={handlePassBlur} />
      <div className="mb-3">
        <button className="btn btn-outline-warning me-2" >Submit</button>
        <button className="btn btn-outline-light">Reset</button>
      </div>
    </form>
  );
}
