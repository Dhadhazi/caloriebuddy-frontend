import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import "../styles/LoginForm.css";
import { BACKEND_ADDRESS } from "../constants";

import autoLogin from "./AutoLogin";
import { showMessageWithTimeout } from "../store/appState/actions";
import { loginUser } from "../store/user/actions";

export default function LoginForm() {
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  //If user has token, login with that
  const localToken = localStorage.getItem("token");
  if (localToken !== null) {
    autoLogin(localToken).then((res) => {
      if (res.message) {
        dispatch(showMessageWithTimeout("danger", res.data.message));
      } else {
        dispatch(showMessageWithTimeout("success", "Login Successful"));
        dispatch(loginUser(res));
      }
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "rememberme"
      ? setValues((prevValues) => {
          return { ...values, rememberme: !prevValues.rememberme };
        })
      : setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${BACKEND_ADDRESS}/api/login`, values).then((res) => {
      if (res.data.message) {
        dispatch(showMessageWithTimeout("danger", res.data.message));
      } else {
        dispatch(showMessageWithTimeout("success", "Login Successful"));
        if (values.rememberme) localStorage.setItem("token", res.data.token);
        dispatch(loginUser(res.data));
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
                <h5 className="card-title text-center">Sign In</h5>
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
                      name="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      onChange={handleChange}
                      value={values.password}
                      required
                    />

                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <div className="custom-control custom-checkbox mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      name="rememberme"
                      onChange={handleChange}
                      checked={values.rememberme}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember Me
                    </label>
                  </div>
                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <div className="register">
                    Not a member yer?{" "}
                    <Link to="registration">Register here!</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
