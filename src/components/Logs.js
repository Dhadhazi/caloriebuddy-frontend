import React from "react";
import { useSelector } from "react-redux";
import format from "date-format";
import AddConsumptionActivitiy from "./AddConsumptionActivitiy";
import { selectActivity, selectConsumption } from "../store/user/selectors";

export default function Logs() {
  const activities = useSelector(selectActivity);
  const consumptions = useSelector(selectConsumption);

  const logtable = [...activities, ...consumptions];

  logtable.sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? -1 : 1;
  });

  return (
    <div className="column">
      <div className="row justify-content-center">
        <div className="col-10">
          {" "}
          <div className="row">
            <div className="col-md-6">
              {" "}
              <AddConsumptionActivitiy type="consumption" />
            </div>
            <div className="col-md-6">
              {" "}
              <AddConsumptionActivitiy type="activity" />
            </div>
          </div>
          <div className="row">
            <div className="col text-center margin-top">
              <ul className="list-group">
                {logtable.map((data, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={index}
                  >
                    <span>{data.calories}</span> <span>{data.name}</span>{" "}
                    {format.asString("MM/dd", new Date(data.date))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
