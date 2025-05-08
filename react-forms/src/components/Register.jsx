import { useRef, useState } from "react";

export default function Register() {

  const [isNotPasswordsEqual, setIsNotPasswordsEqual] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.password !== data.repassword) {
      setIsNotPasswordsEqual(true);
      return;
    }

    console.log("Form submitted", data);
    setIsNotPasswordsEqual(false); // Reset the error state if passwords match 
    e.target.reset(); // Reset the form after submission 
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="header">
        <h1>Register</h1>
        <p>Please enter your login and password!</p>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input type="email" className="form-control" id="email" name="email" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="password" name="password" />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Re-Password
        </label>
        <input type="password" className="form-control" id="repassword" name="repassword" />
        {
          isNotPasswordsEqual && (<p className="invalid-feedback d-block">Passwords should match</p>)
        }
      </div>
      <div className="mb-3">
        <button className="btn btn-outline-warning me-2" >Submit</button>
        <button className="btn btn-outline-light">Reset</button>
      </div>
    </form>
  );
}
