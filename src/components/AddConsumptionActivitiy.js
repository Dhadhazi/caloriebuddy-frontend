import format from "date-format";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addUserData } from "../store/user/actions";

//Type can be either "consumption" or "activity"

export default function AddConsumptionActivitiy({ type, date = false }) {
  const dispatch = useDispatch();
  const today = format.asString("yyyy-MM-dd", new Date().now);

  const [toggle, setToggle] = useState(false);
  const [values, setValues] = useState({
    name: "",
    calories: "",
    date: today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(false);
    const payload = {
      [type]: {
        ...values,
      },
    };
    dispatch(addUserData(payload));
    setValues({
      name: "",
      calories: "",
      date: today,
    });
  };

  return (
    <div className="row margin-top margin-sides">
      {!toggle ? (
        <button
          type="button"
          className="btn btn-primary btn-lg btn-block"
          onClick={() => setToggle(true)}
        >
          Add {type}
        </button>
      ) : (
        <form className="form-inline" onSubmit={handleSubmit}>
          {!date ? (
            <>
              {" "}
              <input
                type="number"
                className="form-control col-lg-3 col-md-4 col-sm-12"
                placeholder="Calories"
                name="calories"
                onChange={handleChange}
                value={values.calories}
              />
              <div className="input-group col-lg-5 col-md-8  col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>
              {Number(values.calories) > 0 ? (
                <button type="submit" className="btn btn-primary col-lg-4">
                  Add
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-secondary col-lg-4"
                  disabled
                >
                  Add
                </button>
              )}
            </>
          ) : (
            <>
              <div className="input-group col-lg-6 col-md-12">
                <input
                  type="number"
                  className="form-control "
                  placeholder="Calories"
                  name="calories"
                  onChange={handleChange}
                  value={values.calories}
                />
              </div>
              <div className="input-group col-lg-6 col-md-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>
              <div className="input-group col-lg-6 col-md-12  margin-top">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Description"
                  name="date"
                  onChange={handleChange}
                  value={values.date}
                />
              </div>{" "}
              {Number(values.calories) > 0 ? (
                <button
                  type="submit"
                  className="btn btn-primary col-lg-6 col-md-12 margin-top"
                >
                  Add
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-secondary col-lg-6 col-md-12 margin-top"
                  disabled
                >
                  Add
                </button>
              )}
            </>
          )}
        </form>
      )}
    </div>
  );
}
