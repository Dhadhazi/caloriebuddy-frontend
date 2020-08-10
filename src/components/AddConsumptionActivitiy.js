import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserData } from "../store/user/actions";

//Type can be either "consumption" or "activity"

export default function AddConsumptionActivitiy({ type }) {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [values, setValues] = useState({
    name: "",
    calories: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToggle(false);
    const date = Date.now();
    const payload = {
      [type]: {
        date,
        ...values,
      },
    };
    dispatch(addUserData(payload));
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

          <button type="submit" className="btn btn-primary col-lg-4">
            Add
          </button>
        </form>
      )}
    </div>
  );
}
