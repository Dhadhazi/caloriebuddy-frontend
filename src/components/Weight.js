import React, { useState } from "react";
import format from "date-format";
import { useDispatch, useSelector } from "react-redux";
import { addWeight } from "../store/user/actions";
import { selectWeight } from "../store/user/selectors";
import WeightChart from "./WeightChart";

export default function Weight() {
  const dispatch = useDispatch();
  const weights = useSelector(selectWeight);
  const today = format.asString("yyyy-MM-dd", new Date().now);

  weights.sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? -1 : 1;
  });

  const [values, setValues] = useState({
    weight: "",
    date: today,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addWeight({ weight: values }));
  };

  return (
    <div className="column">
      <div className="row justify-content-center">
        <form className="form-inline" onSubmit={handleSubmit}>
          <div className="form-group mb-2">
            <input
              className="form-control form-control-lg"
              type="text"
              name="weight"
              placeholder="..kg"
              onChange={handleChange}
              value={values.weight}
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <input
              type="date"
              className="form-control"
              name="date"
              onChange={handleChange}
              value={values.date}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">
            Add Weight
          </button>
        </form>
      </div>
      <div className="row justify-content-center">
        <div className="row justify-content-center" id="outerweightgraph">
          <WeightChart></WeightChart>
        </div>
        <div className="col-4">
          <ul className="list-group">
            {weights.map((w, i) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={i}
              >
                <span>{format.asString("yyyy/MM/dd", new Date(w.date))}</span>{" "}
                <span>{w.weight} KG</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
