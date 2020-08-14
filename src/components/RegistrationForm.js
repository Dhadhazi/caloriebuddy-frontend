import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "../styles/LoginForm.css";

import { showMessageWithTimeout } from "../store/appState/actions";

export default function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [values, setValues] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:4000/api/user", values).then((res) => {
      if (res.data.message) {
        dispatch(showMessageWithTimeout("danger", res.data.message));
        setValues({ email: "", password: "" });
      } else {
        dispatch(showMessageWithTimeout("success", "Registration successful!"));
        history.push("/");
      }
    });
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form className="form-signin" onSubmit={handleSubmit}>
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      onChange={handleChange}
                      value={values.email}
                      required
                      autoFocus
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>
                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      name="password"
                      className="form-control"
                      onChange={handleChange}
                      value={values.password}
                      placeholder="Password"
                      required
                    />

                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Register
                  </button>

                  {/* <hr className="my-4" />
                  <button
                    className="btn btn-lg btn-google btn-block text-uppercase"
                    type="submit"
                  >
                    <i className="fab fa-google mr-2"></i> Register with Google
                  </button>
                  <button
                    className="btn btn-lg btn-facebook btn-block text-uppercase"
                    type="submit"
                  >
                    <i className="fab fa-facebook-f mr-2"></i> Register with
                    Facebook
                  </button> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
