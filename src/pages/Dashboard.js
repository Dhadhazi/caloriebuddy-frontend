import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import format from "date-format";
import AddConsumptionActivitiy from "../components/AddConsumptionActivitiy";
import {
  selectActivity,
  selectConsumption,
  selectBudget,
} from "../store/user/selectors";
import WeightChart from "../components/WeightChart";

export default function Dashboard() {
  let activities = useSelector(selectActivity);
  let consumptions = useSelector(selectConsumption);

  activities = activities.filter(
    (a) =>
      format.asString("yyyy/MM/dd", new Date(a.date)) ===
      format.asString("yyyy/MM/dd")
  );

  const activitiesSum = activities.reduce(
    (acc, cur) => acc + Number(cur.calories),
    0
  );

  const consumptionSum = consumptions.reduce(
    (acc, cur) => acc + Number(cur.calories),
    0
  );

  consumptions = consumptions.filter(
    (a) =>
      format.asString("yyyy/MM/dd", new Date(a.date)) ===
      format.asString("yyyy/MM/dd")
  );

  const budget = useSelector(selectBudget);

  const caloriesLeft =
    Math.floor(
      budget.total_calories +
        activitiesSum * (budget.rule_activity_add / 100) -
        consumptionSum
    ) + budget.rollover_calories;

  return (
    <div className="row justify-content-center">
      <div className="col-10">
        <div className="row justify-content-center">
          <h2>{caloriesLeft} Calories Left</h2>
        </div>
        <div className="row">
          <div className="col-lg-6 text-center margin-top">
            <button
              type="button"
              className="btn btn-secondary btn-lg btn-block disabled"
            >
              Today's Calories
            </button>
            <ul className="list-group">
              {consumptions.map((c, i) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={i}
                >
                  <span>{c.calories}</span> <span>{c.name}</span>
                </li>
              ))}
            </ul>
            <AddConsumptionActivitiy type="consumption" />
          </div>
          <div className="col-lg-6 text-center margin-top">
            <button
              type="button"
              className="btn btn-secondary btn-lg btn-block disabled"
            >
              Today's Activities
            </button>
            <ul className="list-group">
              {activities.map((a, i) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={i}
                >
                  <span>{a.calories}</span> <span>{a.name}</span>
                </li>
              ))}
            </ul>
            <AddConsumptionActivitiy type="activity" />
          </div>
        </div>
        <div className="row">
          {" "}
          <div className="col-md-6 text-center margin-top">
            <Link to="/weight">
              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
              >
                Add Weight
              </button>
            </Link>
            <WeightChart />
          </div>
        </div>
      </div>
    </div>
  );
}
