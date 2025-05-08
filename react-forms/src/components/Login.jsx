import { useRef } from "react";
import { useState } from "react";
export default function Login() {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const mail = email.current.value;
    const passwordVal = password.current.value;

    const emailIsinValid = !mail.includes('@');
    const passwordIsinValid = passwordVal.length < 6;
    if (emailIsinValid) {
      setEmailError(true);
      return;
    }
    if (passwordIsinValid) {
      setPasswordError(true);
      return;
    }
    setEmailError(false);
    setPasswordError(false);
    console.log("Form submitted", { email: mail, password: passwordVal });
    password.current.value = '';
    email.current.value = '';
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="header">
        <h1>Login</h1>
        <p>Please enter your login and password!</p>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" id="email" name="email" ref={email} />
        {
          emailError && (<p className="invalid-feedback d-block">Please enter a valid email address</p>)
        }
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="password" name="password" ref={password} />
        {
          passwordError && (<p className="invalid-feedback d-block">Password shoudl include min 6 characters</p>)
        }
      </div>
      <div className="mb-3">
        <button className="btn btn-outline-warning me-2" >Submit</button>

      </div>
    </form>
  );
}
