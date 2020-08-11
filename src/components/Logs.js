import React from "react";
import { useDispatch, useSelector } from "react-redux";
import format from "date-format";
import AddConsumptionActivitiy from "./AddConsumptionActivitiy";
import { selectActivity, selectConsumption } from "../store/user/selectors";
import { deleteLogItemThunk } from "../store/user/actions";

export default function Logs() {
  const dispatch = useDispatch();
  const activities = useSelector(selectActivity);
  const consumptions = useSelector(selectConsumption);

  let activityLog = activities.map((data) => {
    let item;
    item = { ...data };
    item.category = "activity";
    return item;
  });

  let consumptionLog = consumptions.map((data) => {
    let item;
    item = { ...data };
    item.category = "consumption";
    return item;
  });

  const logtable = [...activityLog, ...consumptionLog];

  const delLogitem = (data) => {
    dispatch(deleteLogItemThunk(data));
  };

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
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() =>
                        delLogitem({ id: data._id, category: data.category })
                      }
                    >
                      Delete
                    </button>
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
