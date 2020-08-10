import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setBudgetThunk } from "../store/user/actions";
import { selectBudget } from "../store/user/selectors";

export default function Budget() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentBudget = useSelector(selectBudget);

  const [values, setValues] = useState({
    total_calories: currentBudget.total_calories,
    rule_calorie_rollover: currentBudget.rule_calorie_rollover,
    rule_activity_add: currentBudget.rule_activity_add,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    values.total_calories = Number(values.total_calories);
    dispatch(setBudgetThunk({ budget: values }));
    history.push("/");
  };

  return (
    <div className="column">
      <div className="row justify-content-center">
        <form onSubmit={handleSubmit}>
          <div className="form-group budget-form">
            <label htmlFor="formControlRange">
              <h3>Total Calories</h3>
              <h2>{values.total_calories}</h2>
            </label>
            <input
              min="0"
              max="3000"
              type="range"
              name="total_calories"
              className="form-control-range"
              onChange={handleChange}
              value={values.total_calories}
            />
          </div>
          <div className="form-group budget-form">
            <h3>Rules</h3>
            <div className="form-group">
              <label htmlFor="formControlRange">
                Calories going to the next cycle: {values.rule_calorie_rollover}
                %
              </label>
              <input
                type="range"
                className="form-control-range"
                min="0"
                max="100"
                name="rule_calorie_rollover"
                onChange={handleChange}
                value={values.rule_calorie_rollover}
              />
            </div>
            <div className="form-group">
              <label htmlFor="formControlRange">
                Burned calories added to the budget: {values.rule_activity_add}%
              </label>
              <input
                type="range"
                className="form-control-range"
                min="0"
                max="100"
                name="rule_activity_add"
                onChange={handleChange}
                value={values.rule_activity_add}
              />
            </div>
          </div>

          <div className="budget-form">
            <button type="submit" className="btn btn-primary mb-2">
              Set budget!
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
